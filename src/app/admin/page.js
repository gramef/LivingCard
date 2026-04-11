'use client';

import { useState } from 'react';
import styles from './admin.module.css';

const MOCK_APPLICATIONS = [
  { id: 'LC-2025-001', name: 'Sarah Johnson', email: 'sarah.j@mail.com', date: '2025-04-07', status: 'pending', province: 'Ontario', income: 3500, score: 78 },
  { id: 'LC-2025-002', name: 'Michael Chen', email: 'm.chen@mail.com', date: '2025-04-07', status: 'under_review', province: 'British Columbia', income: 4200, score: 85 },
  { id: 'LC-2025-003', name: 'Priya Sharma', email: 'p.sharma@mail.com', date: '2025-04-06', status: 'approved', province: 'Ontario', income: 2800, score: 72 },
  { id: 'LC-2025-004', name: 'James Wilson', email: 'j.wilson@mail.com', date: '2025-04-06', status: 'approved', province: 'Alberta', income: 5100, score: 91 },
  { id: 'LC-2025-005', name: 'Fatima Al-Hassan', email: 'f.alhassan@mail.com', date: '2025-04-05', status: 'declined', province: 'Ontario', income: 1200, score: 32 },
  { id: 'LC-2025-006', name: 'David Park', email: 'd.park@mail.com', date: '2025-04-05', status: 'pending', province: 'Manitoba', income: 3000, score: 65 },
];

const STATUS_CONFIG = {
  pending: { label: 'Pending', color: 'var(--color-gold)' },
  under_review: { label: 'Under Review', color: 'var(--color-info)' },
  approved: { label: 'Approved', color: 'var(--color-success)' },
  declined: { label: 'Declined', color: 'var(--color-error)' },
};

export default function AdminApplications() {
  const [filter, setFilter] = useState('all');
  const [selectedApp, setSelectedApp] = useState(null);

  const filtered = filter === 'all'
    ? MOCK_APPLICATIONS
    : MOCK_APPLICATIONS.filter((a) => a.status === filter);

  const counts = {
    all: MOCK_APPLICATIONS.length,
    pending: MOCK_APPLICATIONS.filter((a) => a.status === 'pending').length,
    under_review: MOCK_APPLICATIONS.filter((a) => a.status === 'under_review').length,
    approved: MOCK_APPLICATIONS.filter((a) => a.status === 'approved').length,
    declined: MOCK_APPLICATIONS.filter((a) => a.status === 'declined').length,
  };

  if (selectedApp) {
    return <ApplicationDetail app={selectedApp} onBack={() => setSelectedApp(null)} />;
  }

  return (
    <div className={styles.adminPage}>
      <div className={styles.pageHeader}>
        <h1>Applications</h1>
        <p>{counts.pending} pending review</p>
      </div>

      {/* Summary cards */}
      <div className={styles.summaryGrid}>
        {[
          { label: 'Total', count: counts.all, color: 'var(--color-text-primary)' },
          { label: 'Pending', count: counts.pending, color: 'var(--color-gold)' },
          { label: 'Approved', count: counts.approved, color: 'var(--color-success)' },
          { label: 'Declined', count: counts.declined, color: 'var(--color-error)' },
        ].map((s) => (
          <div key={s.label} className={styles.summaryCard}>
            <span className={styles.summaryCount} style={{ color: s.color }}>{s.count}</span>
            <span className={styles.summaryLabel}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        {Object.entries({ all: 'All', pending: 'Pending', under_review: 'Under Review', approved: 'Approved', declined: 'Declined' }).map(([key, label]) => (
          <button key={key} className={`${styles.filterBtn} ${filter === key ? styles.filterActive : ''}`} onClick={() => setFilter(key)}>
            {label} ({counts[key]})
          </button>
        ))}
      </div>

      {/* Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Applicant</th>
              <th>Province</th>
              <th>Income</th>
              <th>Risk Score</th>
              <th>Status</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((app) => {
              const st = STATUS_CONFIG[app.status];
              return (
                <tr key={app.id}>
                  <td className={styles.cellId}>{app.id}</td>
                  <td>
                    <div className={styles.cellUser}>
                      <span className={styles.cellName}>{app.name}</span>
                      <span className={styles.cellEmail}>{app.email}</span>
                    </div>
                  </td>
                  <td>{app.province}</td>
                  <td className={styles.cellMono}>${app.income.toLocaleString()}</td>
                  <td>
                    <div className={styles.scoreBar}>
                      <div className={styles.scoreFill} style={{ width: `${app.score}%`, background: app.score >= 70 ? 'var(--color-success)' : app.score >= 50 ? 'var(--color-gold)' : 'var(--color-error)' }} />
                    </div>
                    <span className={styles.scoreNum}>{app.score}</span>
                  </td>
                  <td>
                    <span className={styles.statusBadge} style={{ background: `${st.color}15`, color: st.color, borderColor: `${st.color}30` }}>
                      {st.label}
                    </span>
                  </td>
                  <td className={styles.cellDate}>{app.date}</td>
                  <td>
                    <button className={styles.reviewBtn} onClick={() => setSelectedApp(app)}>Review</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ApplicationDetail({ app, onBack }) {
  const st = STATUS_CONFIG[app.status];

  return (
    <div className={styles.adminPage}>
      <button className={styles.backBtn} onClick={onBack}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
        Back to Applications
      </button>

      <div className={styles.detailHeader}>
        <div>
          <h1>{app.name}</h1>
          <p>{app.id} · Applied {app.date}</p>
        </div>
        <span className={styles.statusBadge} style={{ background: `${st.color}15`, color: st.color, borderColor: `${st.color}30` }}>
          {st.label}
        </span>
      </div>

      <div className={styles.detailGrid}>
        <div className={styles.detailCard}>
          <h3>Personal Information</h3>
          <div className={styles.detailRows}>
            <div className={styles.detailRow}><span>Full Name</span><span>{app.name}</span></div>
            <div className={styles.detailRow}><span>Email</span><span>{app.email}</span></div>
            <div className={styles.detailRow}><span>Province</span><span>{app.province}</span></div>
            <div className={styles.detailRow}><span>Phone</span><span>+1 (416) 555-0123</span></div>
          </div>
        </div>

        <div className={styles.detailCard}>
          <h3>Financial Details</h3>
          <div className={styles.detailRows}>
            <div className={styles.detailRow}><span>Monthly Income</span><span>${app.income.toLocaleString()}</span></div>
            <div className={styles.detailRow}><span>Employment</span><span>Full-Time</span></div>
            <div className={styles.detailRow}><span>Risk Score</span><span style={{ color: app.score >= 70 ? 'var(--color-success)' : 'var(--color-gold)' }}>{app.score}/100</span></div>
            <div className={styles.detailRow}><span>Recommended Limit</span><span>${app.income >= 3000 ? '500' : '300'}</span></div>
          </div>
        </div>

        <div className={styles.detailCard}>
          <h3>KYC Verification</h3>
          <div className={styles.detailRows}>
            <div className={styles.detailRow}><span>Identity Check</span><span style={{ color: 'var(--color-success)' }}>✓ Passed</span></div>
            <div className={styles.detailRow}><span>Address Verification</span><span style={{ color: 'var(--color-success)' }}>✓ Passed</span></div>
            <div className={styles.detailRow}><span>FINTRAC / AML</span><span style={{ color: 'var(--color-success)' }}>✓ Clear</span></div>
            <div className={styles.detailRow}><span>Sanctions Check</span><span style={{ color: 'var(--color-success)' }}>✓ Clear</span></div>
          </div>
        </div>
      </div>

      {app.status === 'pending' || app.status === 'under_review' ? (
        <div className={styles.actionBar}>
          <button className="btn btn-primary" onClick={() => { alert(`Application ${app.id} for ${app.name} has been approved. A $${app.income >= 3000 ? '500' : '300'} credit limit card will be issued.`); onBack(); }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>
            Approve Application
          </button>
          <button className="btn btn-secondary" style={{ borderColor: 'var(--color-error)', color: 'var(--color-error)' }} onClick={() => { if(confirm(`Decline application ${app.id} for ${app.name}?`)) { alert('Application declined.'); onBack(); } }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
            Decline
          </button>
          <button className="btn btn-secondary" onClick={() => alert(`Request for additional information sent to ${app.email}.`)}>Request More Info</button>
        </div>
      ) : null}
    </div>
  );
}
