'use client';

import { useState } from 'react';
import inner from '../../dashboard/inner.module.css';
import styles from '../admin.module.css';

const MOCK_USERS = [
  {
    id: 1, name: 'Sarah Johnson', email: 'sarah.j@mail.com', phone: '+1 (416) 555-0123',
    status: 'active', joined: '2025-04-07', province: 'Ontario', balance: 335.87, score: 672,
    creditLimit: 500, utilization: 67, cardLast4: '4821', cardStatus: 'active',
    monthlyIncome: 3500, employer: 'TD Bank — Teller',
    transactions: [
      { date: '2025-04-07', merchant: 'Loblaws Groceries', category: 'Groceries', amount: -67.42 },
      { date: '2025-04-06', merchant: 'Shoppers Drug Mart', category: 'Pharmacy', amount: -23.15 },
      { date: '2025-04-05', merchant: 'TTC Monthly Pass', category: 'Transit', amount: -156.00 },
      { date: '2025-04-04', merchant: 'Toronto Hydro', category: 'Utilities', amount: -89.30 },
      { date: '2025-04-03', merchant: 'Payment Received', category: 'Payment', amount: 200.00 },
    ],
  },
  {
    id: 2, name: 'Michael Chen', email: 'm.chen@mail.com', phone: '+1 (604) 555-0456',
    status: 'active', joined: '2025-04-07', province: 'British Columbia', balance: 122.50, score: 618,
    creditLimit: 500, utilization: 25, cardLast4: '7392', cardStatus: 'active',
    monthlyIncome: 4200, employer: 'Deloitte — Analyst',
    transactions: [
      { date: '2025-04-07', merchant: 'Save-On-Foods', category: 'Groceries', amount: -54.80 },
      { date: '2025-04-05', merchant: 'London Drugs', category: 'Pharmacy', amount: -18.45 },
      { date: '2025-04-04', merchant: 'TransLink Pass', category: 'Transit', amount: -110.00 },
    ],
  },
  {
    id: 3, name: 'Priya Sharma', email: 'p.sharma@mail.com', phone: '+1 (416) 555-0789',
    status: 'active', joined: '2025-04-06', province: 'Ontario', balance: 445.00, score: 645,
    creditLimit: 500, utilization: 89, cardLast4: '5618', cardStatus: 'active',
    monthlyIncome: 2800, employer: 'Self-Employed — Tutor',
    transactions: [
      { date: '2025-04-06', merchant: 'No Frills', category: 'Groceries', amount: -112.30 },
      { date: '2025-04-05', merchant: 'Rexall Pharmacy', category: 'Pharmacy', amount: -34.50 },
      { date: '2025-04-04', merchant: 'Enbridge Gas', category: 'Utilities', amount: -145.20 },
      { date: '2025-04-03', merchant: 'TTC Monthly Pass', category: 'Transit', amount: -156.00 },
    ],
  },
  {
    id: 4, name: 'James Wilson', email: 'j.wilson@mail.com', phone: '+1 (780) 555-0321',
    status: 'active', joined: '2025-04-06', province: 'Alberta', balance: 88.20, score: 710,
    creditLimit: 500, utilization: 18, cardLast4: '9014', cardStatus: 'active',
    monthlyIncome: 5100, employer: 'Suncor Energy — Technician',
    transactions: [
      { date: '2025-04-06', merchant: 'Safeway', category: 'Groceries', amount: -45.90 },
      { date: '2025-04-05', merchant: 'Petro-Canada', category: 'Gas', amount: -42.30 },
    ],
  },
  {
    id: 5, name: 'Fatima Al-Hassan', email: 'f.alhassan@mail.com', phone: '+1 (416) 555-0654',
    status: 'declined', joined: '2025-04-05', province: 'Ontario', balance: 0, score: 0,
    creditLimit: 0, utilization: 0, cardLast4: '—', cardStatus: 'none',
    monthlyIncome: 1200, employer: 'Part-Time — Retail',
    transactions: [],
  },
  {
    id: 6, name: 'David Park', email: 'd.park@mail.com', phone: '+1 (204) 555-0987',
    status: 'pending', joined: '2025-04-05', province: 'Manitoba', balance: 0, score: 0,
    creditLimit: 0, utilization: 0, cardLast4: '—', cardStatus: 'none',
    monthlyIncome: 3000, employer: 'Manitoba Hydro — Clerk',
    transactions: [],
  },
];

const STATUS_COLORS = {
  active: 'var(--color-success)',
  pending: 'var(--color-gold)',
  declined: 'var(--color-error)',
  suspended: 'var(--color-info)',
  none: 'var(--color-text-tertiary)',
};

export default function AdminUsersPage() {
  const [selectedUser, setSelectedUser] = useState(null);

  if (selectedUser) {
    return <UserDetail user={selectedUser} onBack={() => setSelectedUser(null)} />;
  }

  return (
    <div className={inner.innerPage}>
      <div className={inner.pageHeader}>
        <div>
          <h1>Users</h1>
          <p>{MOCK_USERS.filter((u) => u.status === 'active').length} active cardholders</p>
        </div>
      </div>

      <div className={inner.gridThree}>
        <div className={inner.metricCard}>
          <span className={inner.metricLabel}>Total Users</span>
          <span className={inner.metricValue}>{MOCK_USERS.length}</span>
        </div>
        <div className={inner.metricCard}>
          <span className={inner.metricLabel}>Active Cards</span>
          <span className={inner.metricValue} style={{ color: 'var(--color-success)' }}>
            {MOCK_USERS.filter((u) => u.status === 'active').length}
          </span>
        </div>
        <div className={inner.metricCard}>
          <span className={inner.metricLabel}>Avg Credit Score</span>
          <span className={inner.metricValue}>
            {Math.round(MOCK_USERS.filter((u) => u.score > 0).reduce((s, u) => s + u.score, 0) / MOCK_USERS.filter((u) => u.score > 0).length)}
          </span>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>User</th>
              <th>Status</th>
              <th>Joined</th>
              <th>Balance</th>
              <th>Credit Score</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {MOCK_USERS.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className={styles.cellUser}>
                    <span className={styles.cellName}>{user.name}</span>
                    <span className={styles.cellEmail}>{user.email}</span>
                  </div>
                </td>
                <td>
                  <span className={styles.statusBadge} style={{
                    background: `${STATUS_COLORS[user.status]}15`,
                    color: STATUS_COLORS[user.status],
                    borderColor: `${STATUS_COLORS[user.status]}30`,
                  }}>
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                </td>
                <td className={styles.cellDate}>{user.joined}</td>
                <td className={styles.cellMono}>${user.balance.toFixed(2)}</td>
                <td>
                  {user.score > 0 ? (
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                      {user.score}
                    </span>
                  ) : (
                    <span style={{ color: 'var(--color-text-tertiary)', fontSize: 'var(--text-sm)' }}>—</span>
                  )}
                </td>
                <td>
                  <button className={styles.reviewBtn} onClick={() => setSelectedUser(user)}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ── User Detail Screen ── */
function UserDetail({ user, onBack }) {
  const [cardLocked, setCardLocked] = useState(false);
  const scoreColor = user.score >= 700 ? 'var(--color-success)' : user.score >= 600 ? 'var(--color-gold)' : user.score > 0 ? 'var(--color-error)' : 'var(--color-text-tertiary)';
  const utilizationColor = user.utilization > 75 ? 'var(--color-error)' : user.utilization > 50 ? 'var(--color-gold)' : 'var(--color-success)';

  return (
    <div className={styles.adminPage}>
      <button className={styles.backBtn} onClick={onBack}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
        Back to Users
      </button>

      {/* Header */}
      <div className={styles.detailHeader}>
        <div>
          <h1>{user.name}</h1>
          <p>{user.email} · Member since {user.joined}</p>
        </div>
        <span className={styles.statusBadge} style={{
          background: `${STATUS_COLORS[user.status]}15`,
          color: STATUS_COLORS[user.status],
          borderColor: `${STATUS_COLORS[user.status]}30`,
        }}>
          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
        </span>
      </div>

      {/* ── Quick Stats ── */}
      {user.status === 'active' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 'var(--space-4)' }}>
          {[
            { label: 'Balance', value: `$${user.balance.toFixed(2)}`, color: 'var(--color-text-primary)' },
            { label: 'Credit Limit', value: `$${user.creditLimit}`, color: 'var(--color-text-primary)' },
            { label: 'Utilization', value: `${user.utilization}%`, color: utilizationColor },
            { label: 'Credit Score', value: user.score, color: scoreColor },
          ].map(s => (
            <div key={s.label} style={{
              padding: 'var(--space-4) var(--space-5)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--color-surface)',
            }}>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)', marginBottom: 'var(--space-1)' }}>{s.label}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 700, color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>
      )}

      {/* ── Detail Cards ── */}
      <div className={styles.detailGrid}>
        {/* Personal Info */}
        <div className={styles.detailCard}>
          <h3>Personal Information</h3>
          <div className={styles.detailRows}>
            <div className={styles.detailRow}><span>Full Name</span><span>{user.name}</span></div>
            <div className={styles.detailRow}><span>Email</span><span>{user.email}</span></div>
            <div className={styles.detailRow}><span>Phone</span><span>{user.phone}</span></div>
            <div className={styles.detailRow}><span>Province</span><span>{user.province}</span></div>
            <div className={styles.detailRow}><span>Joined</span><span>{user.joined}</span></div>
          </div>
        </div>

        {/* Financial */}
        <div className={styles.detailCard}>
          <h3>Financial Profile</h3>
          <div className={styles.detailRows}>
            <div className={styles.detailRow}><span>Monthly Income</span><span>${user.monthlyIncome.toLocaleString()}</span></div>
            <div className={styles.detailRow}><span>Employer</span><span>{user.employer}</span></div>
            <div className={styles.detailRow}>
              <span>Credit Score</span>
              <span style={{ color: scoreColor }}>{user.score > 0 ? user.score : '—'}</span>
            </div>
            <div className={styles.detailRow}>
              <span>Score Rating</span>
              <span style={{ color: scoreColor }}>
                {user.score >= 700 ? 'Good' : user.score >= 600 ? 'Fair' : user.score > 0 ? 'Building' : '—'}
              </span>
            </div>
          </div>
        </div>

        {/* Card Info */}
        <div className={styles.detailCard}>
          <h3>Card Details</h3>
          <div className={styles.detailRows}>
            <div className={styles.detailRow}>
              <span>Card Number</span>
              <span style={{ fontFamily: 'var(--font-mono)' }}>{user.cardLast4 !== '—' ? `•••• ${user.cardLast4}` : '—'}</span>
            </div>
            <div className={styles.detailRow}>
              <span>Card Status</span>
              <span style={{ color: cardLocked ? 'var(--color-error)' : STATUS_COLORS[user.cardStatus] || 'var(--color-text-tertiary)' }}>
                {user.cardStatus === 'none' ? 'No Card' : cardLocked ? '🔒 Locked' : '✓ Active'}
              </span>
            </div>
            <div className={styles.detailRow}>
              <span>Credit Limit</span>
              <span>{user.creditLimit > 0 ? `$${user.creditLimit}` : '—'}</span>
            </div>
            <div className={styles.detailRow}>
              <span>Utilization</span>
              <span style={{ color: utilizationColor }}>{user.utilization > 0 ? `${user.utilization}%` : '—'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Credit Score Visual (only for active users) ── */}
      {user.score > 0 && (
        <div style={{
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          background: 'var(--color-surface)',
          padding: 'var(--space-5)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
            <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>Credit Utilization</h3>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)' }}>
              ${user.balance.toFixed(2)} / ${user.creditLimit} used
            </span>
          </div>
          <div style={{
            height: '8px', background: 'var(--color-border)', borderRadius: 'var(--radius-full)', overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: `${user.utilization}%`,
              background: utilizationColor,
              borderRadius: 'var(--radius-full)',
              transition: 'width 0.5s var(--ease-out)',
            }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--space-2)', fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)' }}>
            <span>{user.utilization}% utilized</span>
            <span>${(user.creditLimit - user.balance).toFixed(2)} available</span>
          </div>
        </div>
      )}

      {/* ── Recent Transactions ── */}
      {user.transactions.length > 0 && (
        <div style={{
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          background: 'var(--color-surface)',
          overflow: 'hidden',
        }}>
          <div style={{
            padding: 'var(--space-4) var(--space-5)',
            borderBottom: '1px solid var(--color-border)',
            background: 'var(--color-surface-glass)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>Recent Transactions</h3>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)' }}>
              {user.transactions.length} transactions
            </span>
          </div>
          <div>
            {user.transactions.map((tx, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: 'var(--space-3) var(--space-5)',
                borderBottom: i < user.transactions.length - 1 ? '1px solid var(--color-border)' : 'none',
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--color-text-primary)' }}>{tx.merchant}</span>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)' }}>{tx.category} · {tx.date}</span>
                </div>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', fontWeight: 600,
                  color: tx.amount > 0 ? 'var(--color-success)' : 'var(--color-text-primary)',
                }}>
                  {tx.amount > 0 ? '+' : '-'}${Math.abs(tx.amount).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Actions ── */}
      {user.status === 'active' && (
        <div className={styles.actionBar}>
          <button
            className={`btn ${cardLocked ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setCardLocked(!cardLocked)}
            style={cardLocked ? { background: 'var(--color-error)', borderColor: 'var(--color-error)' } : {}}
          >
            {cardLocked ? '🔓 Unlock Card' : '🔒 Lock Card'}
          </button>
          <button className="btn btn-secondary" onClick={() => alert(`Password reset email sent to ${user.email}`)}>
            Send Password Reset
          </button>
          <button
            className="btn btn-secondary"
            style={{ borderColor: 'var(--color-error)', color: 'var(--color-error)' }}
            onClick={() => { if(confirm(`Suspend ${user.name}'s account?`)) alert('Account suspended.'); }}
          >
            Suspend Account
          </button>
        </div>
      )}

      {user.status === 'pending' && (
        <div className={styles.actionBar}>
          <button className="btn btn-primary" onClick={() => { alert(`${user.name} has been approved — card issued.`); onBack(); }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>
            Approve & Issue Card
          </button>
          <button className="btn btn-secondary" style={{ borderColor: 'var(--color-error)', color: 'var(--color-error)' }}
            onClick={() => { if(confirm(`Decline ${user.name}?`)) { alert('User declined.'); onBack(); } }}>
            Decline
          </button>
        </div>
      )}
    </div>
  );
}
