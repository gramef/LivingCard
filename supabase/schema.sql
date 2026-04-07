-- LivingCard Database Schema
-- Run this in the Supabase SQL Editor

-- ============================================
-- 1. PROFILES (extends auth.users)
-- ============================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  date_of_birth DATE,
  address TEXT,
  city TEXT,
  province TEXT DEFAULT 'Ontario',
  postal_code TEXT,
  sin_last4 TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  onboarding_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 2. APPLICATIONS (KYC + credit applications)
-- ============================================
CREATE TYPE application_status AS ENUM ('pending', 'under_review', 'approved', 'declined');

CREATE TABLE IF NOT EXISTS public.applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  
  -- Personal
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  date_of_birth DATE,
  phone TEXT,
  address TEXT,
  city TEXT,
  province TEXT,
  postal_code TEXT,
  sin_last4 TEXT,

  -- Employment
  employment_status TEXT,
  employer TEXT,
  job_title TEXT,
  employment_duration TEXT,

  -- Income
  monthly_income NUMERIC(10,2),
  income_source TEXT,
  pay_frequency TEXT,
  bank_name TEXT,

  -- Assessment
  status application_status DEFAULT 'pending',
  risk_score INTEGER,
  approved_limit NUMERIC(10,2),
  approved_apr NUMERIC(5,2) DEFAULT 22.99,
  reviewed_by UUID REFERENCES public.profiles(id),
  reviewed_at TIMESTAMPTZ,
  decline_reason TEXT,
  notes TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 3. CARDS (Lithic virtual cards)
-- ============================================
CREATE TYPE card_status AS ENUM ('active', 'locked', 'cancelled', 'pending');

CREATE TABLE IF NOT EXISTS public.cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  application_id UUID REFERENCES public.applications(id),
  
  lithic_card_token TEXT UNIQUE,
  last_four TEXT NOT NULL,
  exp_month INTEGER NOT NULL,
  exp_year INTEGER NOT NULL,
  
  status card_status DEFAULT 'pending',
  credit_limit NUMERIC(10,2) NOT NULL DEFAULT 500.00,
  current_balance NUMERIC(10,2) NOT NULL DEFAULT 0.00,
  available_credit NUMERIC(10,2) GENERATED ALWAYS AS (credit_limit - current_balance) STORED,
  monthly_fee NUMERIC(10,2) DEFAULT 5.00,
  apr NUMERIC(5,2) DEFAULT 22.99,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 4. TRANSACTIONS
-- ============================================
CREATE TYPE transaction_status AS ENUM ('pending', 'completed', 'declined', 'refunded');
CREATE TYPE transaction_type AS ENUM ('purchase', 'payment', 'fee', 'refund', 'adjustment');

CREATE TABLE IF NOT EXISTS public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  card_id UUID NOT NULL REFERENCES public.cards(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id),
  
  lithic_transaction_token TEXT UNIQUE,
  type transaction_type NOT NULL DEFAULT 'purchase',
  status transaction_status NOT NULL DEFAULT 'completed',
  
  amount NUMERIC(10,2) NOT NULL,
  merchant_name TEXT,
  merchant_category TEXT,
  mcc_code TEXT,
  
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 5. CREDIT SCORES (historical tracking)
-- ============================================
CREATE TABLE IF NOT EXISTS public.credit_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  
  score INTEGER NOT NULL CHECK (score >= 300 AND score <= 900),
  previous_score INTEGER,
  change INTEGER GENERATED ALWAYS AS (score - COALESCE(previous_score, score)) STORED,
  
  -- Score factors
  payment_history_pct NUMERIC(5,2),
  utilization_ratio NUMERIC(5,2),
  account_age_months INTEGER,
  on_time_payments INTEGER DEFAULT 0,
  missed_payments INTEGER DEFAULT 0,
  
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 6. ALLOWED MERCHANT CATEGORIES (spending controls)
-- ============================================
CREATE TABLE IF NOT EXISTS public.allowed_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mcc_code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  enabled BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed essential spending categories
INSERT INTO public.allowed_categories (mcc_code, name, category) VALUES
  ('5411', 'Grocery Stores, Supermarkets', 'groceries'),
  ('5422', 'Freezer and Locker Meat Provisioners', 'groceries'),
  ('5441', 'Candy, Nut, and Confectionery Stores', 'groceries'),
  ('5451', 'Dairy Products Stores', 'groceries'),
  ('5462', 'Bakeries', 'groceries'),
  ('5499', 'Miscellaneous Food Stores', 'groceries'),
  ('5912', 'Drug Stores and Pharmacies', 'pharmacy'),
  ('5122', 'Drugs, Sundries', 'pharmacy'),
  ('4111', 'Local/Suburban Commuter Transportation', 'transit'),
  ('4112', 'Passenger Railways', 'transit'),
  ('4121', 'Taxicabs and Rideshares', 'transit'),
  ('4131', 'Bus Lines', 'transit'),
  ('4784', 'Tolls and Bridge Fees', 'transit'),
  ('4900', 'Utilities - Electric, Gas, Water, Sanitary', 'utilities'),
  ('4814', 'Telecommunication Services', 'utilities'),
  ('4812', 'Telecommunication Equipment', 'utilities')
ON CONFLICT (mcc_code) DO NOTHING;

-- ============================================
-- 7. ROW LEVEL SECURITY
-- ============================================

-- Profiles: users can only read/update their own profile
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Applications: users see own, admins see all
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own applications" ON public.applications
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can insert own applications" ON public.applications
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can view all applications" ON public.applications
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can update applications" ON public.applications
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Cards: users see own cards
ALTER TABLE public.cards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own cards" ON public.cards
  FOR SELECT USING (user_id = auth.uid());

-- Transactions: users see own transactions
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own transactions" ON public.transactions
  FOR SELECT USING (user_id = auth.uid());

-- Credit Scores: users see own scores
ALTER TABLE public.credit_scores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own credit scores" ON public.credit_scores
  FOR SELECT USING (user_id = auth.uid());

-- ============================================
-- 8. INDEXES
-- ============================================
CREATE INDEX idx_applications_user_id ON public.applications(user_id);
CREATE INDEX idx_applications_status ON public.applications(status);
CREATE INDEX idx_cards_user_id ON public.cards(user_id);
CREATE INDEX idx_transactions_card_id ON public.transactions(card_id);
CREATE INDEX idx_transactions_user_id ON public.transactions(user_id);
CREATE INDEX idx_transactions_created_at ON public.transactions(created_at DESC);
CREATE INDEX idx_credit_scores_user_id ON public.credit_scores(user_id);

-- ============================================
-- 9. TRIGGER: Auto-create profile on signup
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- 10. TRIGGER: Auto-update updated_at
-- ============================================
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_applications_updated_at
  BEFORE UPDATE ON public.applications
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_cards_updated_at
  BEFORE UPDATE ON public.cards
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
