import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * GET /api/dashboard — Get user's dashboard data
 * Returns balance, card details, recent transactions, and credit score
 */
export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch all dashboard data in parallel
    const [cardResult, transactionsResult, creditResult, profileResult] = await Promise.all([
      supabase
        .from('cards')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .single(),

      supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10),

      supabase
        .from('credit_scores')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(2),

      supabase
        .from('profiles')
        .select('first_name, last_name, onboarding_completed')
        .eq('id', user.id)
        .single(),
    ]);

    const card = cardResult.data;
    const transactions = transactionsResult.data || [];
    const creditScores = creditResult.data || [];
    const profile = profileResult.data;

    // Calculate spending by category
    const spendingByCategory = {};
    transactions
      .filter((t) => t.type === 'purchase' && t.status === 'completed')
      .forEach((t) => {
        const cat = t.merchant_category || 'Other';
        spendingByCategory[cat] = (spendingByCategory[cat] || 0) + Math.abs(t.amount);
      });

    // Calculate next payment (minimum payment = greater of $10 or 2% of balance)
    const balance = card?.current_balance || 0;
    const minimumPayment = Math.max(10, Math.round(balance * 0.02 * 100) / 100);

    // Next payment due date (25th of next month)
    const now = new Date();
    const nextPaymentDate = new Date(now.getFullYear(), now.getMonth() + 1, 25);

    return NextResponse.json({
      profile: {
        firstName: profile?.first_name || 'User',
        lastName: profile?.last_name || '',
        onboardingCompleted: profile?.onboarding_completed || false,
      },
      card: card ? {
        id: card.id,
        lastFour: card.last_four,
        expMonth: card.exp_month,
        expYear: card.exp_year,
        status: card.status,
        creditLimit: card.credit_limit,
        currentBalance: card.current_balance,
        availableCredit: card.available_credit,
        apr: card.apr,
        utilizationPct: card.credit_limit > 0 ? Math.round((card.current_balance / card.credit_limit) * 100) : 0,
      } : null,
      creditScore: creditScores.length > 0 ? {
        current: creditScores[0].score,
        previous: creditScores[0].previous_score || creditScores[1]?.score || null,
        change: creditScores[0].change || 0,
        factors: {
          paymentHistory: creditScores[0].payment_history_pct,
          utilization: creditScores[0].utilization_ratio,
          accountAge: creditScores[0].account_age_months,
          onTimePayments: creditScores[0].on_time_payments,
        },
      } : null,
      transactions: transactions.map((t) => ({
        id: t.id,
        type: t.type,
        status: t.status,
        amount: t.amount,
        merchant: t.merchant_name,
        category: t.merchant_category,
        date: t.created_at,
      })),
      spending: spendingByCategory,
      nextPayment: {
        amount: minimumPayment,
        dueDate: nextPaymentDate.toISOString(),
      },
    });
  } catch (err) {
    console.error('Dashboard error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
