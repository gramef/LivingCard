'use client';

import inner from '../../dashboard/inner.module.css';

const MONTHLY_DATA = [
  { month: 'Oct', applications: 12, approvals: 8, revenue: 40 },
  { month: 'Nov', applications: 28, approvals: 22, revenue: 110 },
  { month: 'Dec', applications: 45, approvals: 36, revenue: 180 },
  { month: 'Jan', applications: 62, approvals: 48, revenue: 240 },
  { month: 'Feb', applications: 89, approvals: 71, revenue: 355 },
  { month: 'Mar', applications: 134, approvals: 108, revenue: 540 },
  { month: 'Apr', applications: 156, approvals: 128, revenue: 640 },
];

export default function AdminAnalyticsPage() {
  const maxApps = Math.max(...MONTHLY_DATA.map((d) => d.applications));
  const totalApps = MONTHLY_DATA.reduce((s, d) => s + d.applications, 0);
  const totalApprovals = MONTHLY_DATA.reduce((s, d) => s + d.approvals, 0);
  const totalRevenue = MONTHLY_DATA.reduce((s, d) => s + d.revenue, 0);
  const approvalRate = Math.round((totalApprovals / totalApps) * 100);

  return (
    <div className={inner.innerPage}>
      <div className={inner.pageHeader}>
        <div>
          <h1>Analytics</h1>
          <p>Platform performance metrics</p>
        </div>
      </div>

      {/* KPIs */}
      <div className={inner.gridThree} style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
        <div className={inner.metricCard}>
          <span className={inner.metricLabel}>Total Applications</span>
          <span className={inner.metricValue}>{totalApps}</span>
          <span className={`${inner.metricDelta} ${inner.metricUp}`}>↑ 16.4% vs last month</span>
        </div>
        <div className={inner.metricCard}>
          <span className={inner.metricLabel}>Approval Rate</span>
          <span className={inner.metricValue}>{approvalRate}%</span>
          <span className={`${inner.metricDelta} ${inner.metricUp}`}>↑ 2.1%</span>
        </div>
        <div className={inner.metricCard}>
          <span className={inner.metricLabel}>Monthly Revenue</span>
          <span className={inner.metricValue} style={{ color: 'var(--color-accent)' }}>${(totalRevenue).toLocaleString()}</span>
          <span className={`${inner.metricDelta} ${inner.metricUp}`}>↑ 18.5%</span>
        </div>
        <div className={inner.metricCard}>
          <span className={inner.metricLabel}>Active Cards</span>
          <span className={inner.metricValue}>128</span>
          <span className={`${inner.metricDelta} ${inner.metricUp}`}>↑ 20 this week</span>
        </div>
        <div className={inner.metricCard}>
          <span className={inner.metricLabel}>Avg Credit Score</span>
          <span className={inner.metricValue}>648</span>
          <span className={`${inner.metricDelta} ${inner.metricUp}`}>↑ 12 pts avg</span>
        </div>
        <div className={inner.metricCard}>
          <span className={inner.metricLabel}>Default Rate</span>
          <span className={inner.metricValue} style={{ color: 'var(--color-success)' }}>2.1%</span>
          <span className={`${inner.metricDelta} ${inner.metricDown}`}>↓ 0.3% (good)</span>
        </div>
      </div>

      {/* Applications Chart */}
      <div className={inner.panel}>
        <div className={inner.panelHeader}>
          <h2>Application Volume</h2>
          <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-tertiary)' }}>Last 7 months</span>
        </div>
        <div className={inner.panelBody}>
          <div className={inner.chartArea}>
            {MONTHLY_DATA.map((d) => {
              const height = (d.applications / maxApps) * 180 + 20;
              return (
                <div
                  key={d.month}
                  className={inner.chartBar}
                  style={{
                    height: `${height}px`,
                    background: d.month === 'Apr'
                      ? 'linear-gradient(180deg, var(--color-accent), rgba(0,214,143,0.3))'
                      : 'linear-gradient(180deg, rgba(0,214,143,0.4), rgba(0,214,143,0.1))',
                  }}
                  title={`${d.month}: ${d.applications} applications`}
                />
              );
            })}
          </div>
          <div className={inner.chartLabels}>
            {MONTHLY_DATA.map((d) => (
              <span key={d.month} className={inner.chartLabel}>{d.month}</span>
            ))}
          </div>
        </div>
      </div>

      <div className={inner.gridTwo}>
        {/* Spending Breakdown */}
        <div className={inner.panel}>
          <div className={inner.panelHeader}>
            <h2>Spending by Category</h2>
          </div>
          <div className={inner.panelBody}>
            <div className={inner.factorList}>
              {[
                { name: 'Groceries', pct: 38, amount: '$24,280', color: 'var(--color-accent)' },
                { name: 'Transit', pct: 28, amount: '$17,920', color: 'var(--color-info)' },
                { name: 'Utilities', pct: 20, amount: '$12,800', color: 'var(--color-gold)' },
                { name: 'Pharmacy', pct: 10, amount: '$6,400', color: '#a78bfa' },
                { name: 'Other Essential', pct: 4, amount: '$2,560', color: 'var(--color-text-tertiary)' },
              ].map((cat) => (
                <div key={cat.name} className={inner.factorItem}>
                  <div className={inner.factorTop}>
                    <span className={inner.factorName}>{cat.name} ({cat.pct}%)</span>
                    <span className={inner.factorValue}>{cat.amount}</span>
                  </div>
                  <div className={inner.factorBar}>
                    <div className={inner.factorFill} style={{ width: `${cat.pct}%`, background: cat.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Province Distribution */}
        <div className={inner.panel}>
          <div className={inner.panelHeader}>
            <h2>Users by Province</h2>
          </div>
          <div className={inner.panelBody}>
            <div className={inner.factorList}>
              {[
                { name: 'Ontario', pct: 52, count: '67 users', color: 'var(--color-accent)' },
                { name: 'British Columbia', pct: 22, count: '28 users', color: 'var(--color-info)' },
                { name: 'Alberta', pct: 14, count: '18 users', color: 'var(--color-gold)' },
                { name: 'Quebec', pct: 8, count: '10 users', color: '#a78bfa' },
                { name: 'Other', pct: 4, count: '5 users', color: 'var(--color-text-tertiary)' },
              ].map((prov) => (
                <div key={prov.name} className={inner.factorItem}>
                  <div className={inner.factorTop}>
                    <span className={inner.factorName}>{prov.name}</span>
                    <span className={inner.factorValue}>{prov.count}</span>
                  </div>
                  <div className={inner.factorBar}>
                    <div className={inner.factorFill} style={{ width: `${prov.pct}%`, background: prov.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
