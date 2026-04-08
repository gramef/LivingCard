'use client';

import inner from '../../dashboard/inner.module.css';
import styles from '../admin.module.css';

const MOCK_USERS = [
  { id: 1, name: 'Sarah Johnson', email: 'sarah.j@mail.com', status: 'active', joined: '2025-04-07', balance: 335.87, score: 672 },
  { id: 2, name: 'Michael Chen', email: 'm.chen@mail.com', status: 'active', joined: '2025-04-07', balance: 122.50, score: 618 },
  { id: 3, name: 'Priya Sharma', email: 'p.sharma@mail.com', status: 'active', joined: '2025-04-06', balance: 445.00, score: 645 },
  { id: 4, name: 'James Wilson', email: 'j.wilson@mail.com', status: 'active', joined: '2025-04-06', balance: 88.20, score: 710 },
  { id: 5, name: 'Fatima Al-Hassan', email: 'f.alhassan@mail.com', status: 'declined', joined: '2025-04-05', balance: 0, score: 0 },
  { id: 6, name: 'David Park', email: 'd.park@mail.com', status: 'pending', joined: '2025-04-05', balance: 0, score: 0 },
];

const STATUS_COLORS = {
  active: 'var(--color-success)',
  pending: 'var(--color-gold)',
  declined: 'var(--color-error)',
  suspended: 'var(--color-info)',
};

export default function AdminUsersPage() {
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
                  <button className={styles.reviewBtn}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
