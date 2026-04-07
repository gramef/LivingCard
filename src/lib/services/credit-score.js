/**
 * Credit Score Engine
 * Calculates and tracks credit scores for LivingCard users.
 * Uses a simplified model based on payment history, utilization, and account age.
 * 
 * Canadian credit score range: 300 – 900
 * Starting score for new users: 600 (thin-file baseline)
 */

const WEIGHTS = {
  paymentHistory: 0.35,  // 35% — On-time payments
  utilization: 0.30,     // 30% — Credit utilization ratio
  accountAge: 0.15,      // 15% — Length of credit history
  creditMix: 0.10,       // 10% — Types of credit
  newCredit: 0.10,       // 10% — Recent inquiries/new accounts
};

const SCORE_RANGE = { min: 300, max: 900 };
const BASE_SCORE = 600; // Starting score for new LivingCard users

/**
 * Calculate credit score based on user's financial behavior
 */
export function calculateCreditScore({
  onTimePayments = 0,
  missedPayments = 0,
  currentBalance = 0,
  creditLimit = 500,
  accountAgeMonths = 1,
  totalAccounts = 1,
}) {
  // 1. Payment History Score (0 – 100)
  const totalPayments = onTimePayments + missedPayments;
  const paymentScore = totalPayments > 0
    ? Math.min(100, (onTimePayments / totalPayments) * 100)
    : 70; // Neutral if no payments yet

  // 2. Utilization Score (0 – 100) — lower is better
  const utilizationRatio = creditLimit > 0 ? currentBalance / creditLimit : 0;
  let utilizationScore;
  if (utilizationRatio <= 0.10) utilizationScore = 100;
  else if (utilizationRatio <= 0.30) utilizationScore = 90;
  else if (utilizationRatio <= 0.50) utilizationScore = 70;
  else if (utilizationRatio <= 0.75) utilizationScore = 50;
  else utilizationScore = 30;

  // 3. Account Age Score (0 – 100) — older is better
  let ageScore;
  if (accountAgeMonths >= 24) ageScore = 100;
  else if (accountAgeMonths >= 12) ageScore = 80;
  else if (accountAgeMonths >= 6) ageScore = 60;
  else if (accountAgeMonths >= 3) ageScore = 40;
  else ageScore = 25;

  // 4. Credit Mix Score (fixed for now — single product)
  const mixScore = 50; // Will improve as more Myarkad products are added

  // 5. New Credit Score (fixed — soft inquiry only)
  const newCreditScore = 85; // Soft pull = minimal impact

  // Weighted composite (0 – 100)
  const composite =
    paymentScore * WEIGHTS.paymentHistory +
    utilizationScore * WEIGHTS.utilization +
    ageScore * WEIGHTS.accountAge +
    mixScore * WEIGHTS.creditMix +
    newCreditScore * WEIGHTS.newCredit;

  // Map composite to credit score range
  const scoreRange = SCORE_RANGE.max - SCORE_RANGE.min;
  const score = Math.round(SCORE_RANGE.min + (composite / 100) * scoreRange);

  return {
    score: Math.max(SCORE_RANGE.min, Math.min(SCORE_RANGE.max, score)),
    factors: {
      paymentHistory: Math.round(paymentScore),
      utilization: Math.round(utilizationScore),
      accountAge: Math.round(ageScore),
      creditMix: Math.round(mixScore),
      newCredit: Math.round(newCreditScore),
    },
    utilizationRatio: Math.round(utilizationRatio * 100),
    composite: Math.round(composite),
  };
}

/**
 * Calculate risk score for a credit application (0 – 100)
 * Higher = lower risk = more likely to approve
 */
export function calculateRiskScore({
  monthlyIncome = 0,
  employmentStatus = 'other',
  employmentDuration = '',
  province = '',
}) {
  let score = 50; // Baseline

  // Income factor (+0 to +25)
  if (monthlyIncome >= 5000) score += 25;
  else if (monthlyIncome >= 3000) score += 20;
  else if (monthlyIncome >= 2000) score += 15;
  else if (monthlyIncome >= 1500) score += 10;
  else if (monthlyIncome >= 1000) score += 5;

  // Employment stability (+0 to +20)
  const stableEmployment = ['full-time', 'self-employed'];
  if (stableEmployment.includes(employmentStatus)) score += 10;
  if (['2-5yr', '5+yr'].includes(employmentDuration)) score += 10;
  else if (['1-2yr'].includes(employmentDuration)) score += 7;
  else if (['6-12mo'].includes(employmentDuration)) score += 4;

  // Province factor (+0 to +5) — cosmopolitan centers
  const strongProvinces = ['Ontario', 'British Columbia', 'Alberta'];
  if (strongProvinces.includes(province)) score += 5;

  return Math.min(100, Math.max(0, score));
}

/**
 * Determine credit limit based on risk score and income
 */
export function determineCreditLimit(riskScore, monthlyIncome) {
  if (riskScore >= 80) return Math.min(1000, Math.round(monthlyIncome * 0.20));
  if (riskScore >= 60) return Math.min(500, Math.round(monthlyIncome * 0.15));
  if (riskScore >= 40) return Math.min(300, Math.round(monthlyIncome * 0.10));
  return 200; // Minimum limit
}

/**
 * Get score tier label
 */
export function getScoreTier(score) {
  if (score >= 800) return { tier: 'Excellent', color: '#00D68F' };
  if (score >= 720) return { tier: 'Very Good', color: '#4CAF50' };
  if (score >= 650) return { tier: 'Good', color: '#F5C542' };
  if (score >= 560) return { tier: 'Fair', color: '#FF9800' };
  return { tier: 'Building', color: '#EF4444' };
}
