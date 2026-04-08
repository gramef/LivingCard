'use client';

import { useState, useMemo } from 'react';
import styles from '../dashboard.module.css';
import inner from '../inner.module.css';

const CATEGORY_ICONS = {
  Groceries: '🛒', Pharmacy: '💊', Transit: '🚇', Utilities: '⚡',
  Payment: '✅', Fee: '📋', Refund: '↩️',
};

const ALL_TRANSACTIONS = [
  { id: 1, merchant: 'Loblaws Groceries', category: 'Groceries', amount: -67.42, date: '2025-04-07', status: 'completed' },
  { id: 2, merchant: 'Shoppers Drug Mart', category: 'Pharmacy', amount: -23.15, date: '2025-04-06', status: 'completed' },
  { id: 3, merchant: 'TTC Monthly Pass', category: 'Transit', amount: -156.00, date: '2025-04-05', status: 'completed' },
  { id: 4, merchant: 'Toronto Hydro', category: 'Utilities', amount: -89.30, date: '2025-04-04', status: 'completed' },
  { id: 5, merchant: 'Payment Received', category: 'Payment', amount: 200.00, date: '2025-04-03', status: 'completed' },
  { id: 6, merchant: 'No Frills', category: 'Groceries', amount: -42.88, date: '2025-04-01', status: 'completed' },
  { id: 7, merchant: 'Monthly Fee', category: 'Fee', amount: -5.00, date: '2025-04-01', status: 'completed' },
  { id: 8, merchant: 'Rexall Pharmacy', category: 'Pharmacy', amount: -18.75, date: '2025-03-30', status: 'completed' },
  { id: 9, merchant: 'Presto Card Reload', category: 'Transit', amount: -50.00, date: '2025-03-28', status: 'completed' },
  { id: 10, merchant: 'Metro Grocery', category: 'Groceries', amount: -95.22, date: '2025-03-25', status: 'completed' },
  { id: 11, merchant: 'Enbridge Gas', category: 'Utilities', amount: -78.40, date: '2025-03-22', status: 'completed' },
  { id: 12, merchant: 'Payment Received', category: 'Payment', amount: 200.00, date: '2025-03-20', status: 'completed' },
  { id: 13, merchant: 'Walmart Grocery', category: 'Groceries', amount: -112.33, date: '2025-03-18', status: 'completed' },
  { id: 14, merchant: 'Shoppers Drug Mart', category: 'Pharmacy', amount: -31.20, date: '2025-03-15', status: 'completed' },
  { id: 15, merchant: 'TTC Monthly Pass', category: 'Transit', amount: -156.00, date: '2025-03-05', status: 'completed' },
];

const CATEGORIES = ['All', 'Groceries', 'Pharmacy', 'Transit', 'Utilities', 'Payment', 'Fee'];

export default function TransactionsPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = useMemo(() => {
    return ALL_TRANSACTIONS.filter((tx) => {
      const matchesSearch = !search || tx.merchant.toLowerCase().includes(search.toLowerCase());
      const matchesCat = category === 'All' || tx.category === category;
      return matchesSearch && matchesCat;
    });
  }, [search, category]);

  const totalSpend = filtered.filter((t) => t.amount < 0).reduce((sum, t) => sum + t.amount, 0);
  const totalPayments = filtered.filter((t) => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className={inner.innerPage}>
      <div className={inner.pageHeader}>
        <div>
          <h1>Transactions</h1>
          <p>Your complete spending history</p>
        </div>
      </div>

      {/* Summary */}
      <div className={inner.gridThree}>
        <div className={inner.metricCard}>
          <span className={inner.metricLabel}>Total Spent</span>
          <span className={inner.metricValue} style={{ color: 'var(--color-text-primary)' }}>
            ${Math.abs(totalSpend).toFixed(2)}
          </span>
          <span className={inner.metricLabel}>{filtered.filter((t) => t.amount < 0).length} transactions</span>
        </div>
        <div className={inner.metricCard}>
          <span className={inner.metricLabel}>Total Payments</span>
          <span className={inner.metricValue} style={{ color: 'var(--color-success)' }}>
            ${totalPayments.toFixed(2)}
          </span>
          <span className={inner.metricLabel}>{filtered.filter((t) => t.amount > 0).length} payments</span>
        </div>
        <div className={inner.metricCard}>
          <span className={inner.metricLabel}>Avg Transaction</span>
          <span className={inner.metricValue}>
            ${filtered.length > 0 ? Math.abs(totalSpend / filtered.filter((t) => t.amount < 0).length).toFixed(2) : '0.00'}
          </span>
          <span className={inner.metricLabel}>per purchase</span>
        </div>
      </div>

      {/* Toolbar */}
      <div className={inner.toolbar}>
        <div className={inner.searchWrap}>
          <svg className={inner.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            className={inner.searchInput}
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`${inner.filterPill} ${category === cat ? inner.filterPillActive : ''}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Transaction list */}
      <div className={`${styles.transactionsSection}`}>
        <div className={styles.transactionList}>
          {filtered.length === 0 && (
            <div style={{ padding: 'var(--space-8)', textAlign: 'center', color: 'var(--color-text-tertiary)' }}>
              No transactions found
            </div>
          )}
          {filtered.map((tx) => (
            <div key={tx.id} className={styles.transactionItem}>
              <div className={styles.txIcon}>{CATEGORY_ICONS[tx.category] || '💳'}</div>
              <div className={styles.txDetails}>
                <span className={styles.txMerchant}>{tx.merchant}</span>
                <span className={styles.txCategory}>{tx.category} · {tx.date}</span>
              </div>
              <span className={`${styles.txAmount} ${tx.amount > 0 ? styles.txPositive : ''}`}>
                {tx.amount > 0 ? '+' : '-'}${Math.abs(tx.amount).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
