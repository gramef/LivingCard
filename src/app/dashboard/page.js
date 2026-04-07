'use client';

import VirtualCard from '@/components/VirtualCard';
import styles from './dashboard.module.css';

const MOCK_TRANSACTIONS = [
  { id: 1, merchant: 'Loblaws Groceries', category: 'Groceries', amount: -67.42, date: '2025-04-07', status: 'completed', icon: '🛒' },
  { id: 2, merchant: 'Shoppers Drug Mart', category: 'Pharmacy', amount: -23.15, date: '2025-04-06', status: 'completed', icon: '💊' },
  { id: 3, merchant: 'TTC Monthly Pass', category: 'Transit', amount: -156.00, date: '2025-04-05', status: 'completed', icon: '🚇' },
  { id: 4, merchant: 'Toronto Hydro', category: 'Utilities', amount: -89.30, date: '2025-04-04', status: 'completed', icon: '⚡' },
  { id: 5, merchant: 'Payment Received', category: 'Payment', amount: 200.00, date: '2025-04-03', status: 'completed', icon: '✅' },
];

export default function DashboardHome() {
  const balance = 335.87;
  const creditLimit = 500;
  const available = creditLimit - balance;
  const utilization = (balance / creditLimit) * 100;

  return (
    <div className={styles.dashboard}>
      <div className={styles.greeting}>
        <h1>Good afternoon, Sarah</h1>
        <p>Here&apos;s your financial overview</p>
      </div>

      {/* Top Cards */}
      <div className={styles.statsGrid}>
        <div className={`${styles.statCard} ${styles.statCardPrimary}`}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>Current Balance</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round">
              <rect x="1" y="4" width="22" height="16" rx="2" /><path d="M1 10h22" />
            </svg>
          </div>
          <span className={styles.statAmount}>${balance.toFixed(2)}</span>
          <div className={styles.utilizationBar}>
            <div className={styles.utilizationFill} style={{ width: `${utilization}%` }} />
          </div>
          <div className={styles.utilizationLabel}>
            <span>{utilization.toFixed(0)}% utilized</span>
            <span>${available.toFixed(2)} available</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>Credit Score</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round">
              <path d="M23 6l-9.5 9.5-5-5L1 18" /><path d="M17 6h6v6" />
            </svg>
          </div>
          <span className={styles.statAmount}>672</span>
          <div className={styles.statDelta}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="2.5" strokeLinecap="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
            <span style={{ color: 'var(--color-success)' }}>+18 pts this month</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>Next Payment</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" strokeWidth="2" strokeLinecap="round">
              <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
          </div>
          <span className={styles.statAmount}>$25.00</span>
          <span className={styles.statSubtext}>Due April 15, 2025</span>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <span className={styles.statTitle}>Monthly Spend</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-info)" strokeWidth="2" strokeLinecap="round">
              <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
            </svg>
          </div>
          <span className={styles.statAmount}>$335.87</span>
          <span className={styles.statSubtext}>5 transactions</span>
        </div>
      </div>

      {/* Two-column: Card + Spending */}
      <div className={styles.middleRow}>
        <div className={styles.cardSection}>
          <h2>Your Card</h2>
          <div className={styles.cardWrapper}>
            <VirtualCard />
          </div>
          <div className={styles.cardActions}>
            <button className="btn btn-secondary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
              Lock Card
            </button>
            <button className="btn btn-secondary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></svg>
              Details
            </button>
          </div>
        </div>

        <div className={styles.spendingSection}>
          <h2>Spending by Category</h2>
          <div className={styles.categoryList}>
            {[
              { name: 'Groceries', amount: 67.42, pct: 20, color: 'var(--color-accent)' },
              { name: 'Transit', amount: 156.00, pct: 46, color: 'var(--color-info)' },
              { name: 'Utilities', amount: 89.30, pct: 27, color: 'var(--color-gold)' },
              { name: 'Pharmacy', amount: 23.15, pct: 7, color: '#a78bfa' },
            ].map((cat) => (
              <div key={cat.name} className={styles.categoryItem}>
                <div className={styles.categoryTop}>
                  <span className={styles.categoryName}>{cat.name}</span>
                  <span className={styles.categoryAmount}>${cat.amount.toFixed(2)}</span>
                </div>
                <div className={styles.categoryBar}>
                  <div className={styles.categoryFill} style={{ width: `${cat.pct}%`, background: cat.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className={styles.transactionsSection}>
        <div className={styles.sectionHeader}>
          <h2>Recent Transactions</h2>
          <a href="/dashboard/transactions" className={styles.viewAll}>View all</a>
        </div>
        <div className={styles.transactionList}>
          {MOCK_TRANSACTIONS.map((tx) => (
            <div key={tx.id} className={styles.transactionItem}>
              <div className={styles.txIcon}>{tx.icon}</div>
              <div className={styles.txDetails}>
                <span className={styles.txMerchant}>{tx.merchant}</span>
                <span className={styles.txCategory}>{tx.category} · {tx.date}</span>
              </div>
              <span className={`${styles.txAmount} ${tx.amount > 0 ? styles.txPositive : ''}`}>
                {tx.amount > 0 ? '+' : ''}{tx.amount < 0 ? '-' : ''}${Math.abs(tx.amount).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
