'use client';

import inner from '../inner.module.css';

const SCORE = 672;
const PREV_SCORE = 654;
const TIER = { name: 'Good', color: '#F5C542' };

const SCORE_HISTORY = [
  { month: 'Oct', score: 600 },
  { month: 'Nov', score: 618 },
  { month: 'Dec', score: 625 },
  { month: 'Jan', score: 638 },
  { month: 'Feb', score: 649 },
  { month: 'Mar', score: 654 },
  { month: 'Apr', score: 672 },
];

const FACTORS = [
  { name: 'Payment History', value: 92, weight: '35%', color: 'var(--color-accent)', status: 'Excellent' },
  { name: 'Credit Utilization', value: 67, weight: '30%', color: 'var(--color-gold)', status: 'Good' },
  { name: 'Account Age', value: 25, weight: '15%', color: 'var(--color-info)', status: 'Building' },
  { name: 'Credit Mix', value: 50, weight: '10%', color: '#a78bfa', status: 'Fair' },
  { name: 'New Credit', value: 85, weight: '10%', color: 'var(--color-accent)', status: 'Good' },
];

const TIPS = [
  { icon: '✅', title: 'Keep paying on time', desc: 'You\'ve made 6 consecutive on-time payments. Keep going for a bigger boost!' },
  { icon: '📉', title: 'Lower your utilization', desc: 'Your utilization is 67%. Try to keep it under 30% for a higher score.' },
  { icon: '⏱️', title: 'Account age growing', desc: 'Your credit history is 7 months old. After 12 months, this factor improves significantly.' },
];

export default function CreditScorePage() {
  const maxScore = Math.max(...SCORE_HISTORY.map((h) => h.score));
  const minScore = Math.min(...SCORE_HISTORY.map((h) => h.score));
  const range = maxScore - minScore || 1;

  return (
    <div className={inner.innerPage}>
      <div className={inner.pageHeader}>
        <div>
          <h1>Credit Score</h1>
          <p>Track your credit-building progress</p>
        </div>
        <div className={inner.metricDelta + ' ' + inner.metricUp}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
          +{SCORE - PREV_SCORE} pts this month
        </div>
      </div>

      <div className={inner.gridTwo}>
        {/* Score Display */}
        <div className={inner.panel}>
          <div className={inner.panelBody} style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
            <div className={inner.scoreRing}>
              <svg viewBox="0 0 180 180" style={{ width: '100%', height: '100%' }}>
                {/* Background circle */}
                <circle cx="90" cy="90" r="75" fill="none" stroke="var(--color-border)" strokeWidth="8" />
                {/* Score arc */}
                <circle
                  cx="90" cy="90" r="75"
                  fill="none"
                  stroke={TIER.color}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${((SCORE - 300) / 600) * 471} 471`}
                  transform="rotate(-90 90 90)"
                  style={{ transition: 'stroke-dasharray 1s ease-out' }}
                />
              </svg>
              <div className={inner.scoreCenter}>
                <span className={inner.scoreNumber}>{SCORE}</span>
                <span className={inner.scoreTier} style={{ color: TIER.color }}>{TIER.name}</span>
              </div>
            </div>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-tertiary)', marginTop: 'var(--space-4)' }}>
              Canadian credit range: 300 – 900
            </p>
          </div>
        </div>

        {/* Score Factors */}
        <div className={inner.panel}>
          <div className={inner.panelHeader}>
            <h2>Score Factors</h2>
          </div>
          <div className={inner.panelBody}>
            <div className={inner.factorList}>
              {FACTORS.map((f) => (
                <div key={f.name} className={inner.factorItem}>
                  <div className={inner.factorTop}>
                    <span className={inner.factorName}>{f.name} ({f.weight})</span>
                    <span className={inner.factorValue} style={{ color: f.color }}>{f.status}</span>
                  </div>
                  <div className={inner.factorBar}>
                    <div className={inner.factorFill} style={{ width: `${f.value}%`, background: f.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Score History Chart */}
      <div className={inner.panel}>
        <div className={inner.panelHeader}>
          <h2>Score History</h2>
          <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-tertiary)' }}>Last 7 months</span>
        </div>
        <div className={inner.panelBody}>
          <div className={inner.chartArea}>
            {SCORE_HISTORY.map((h) => {
              const height = ((h.score - minScore) / range) * 160 + 40;
              return (
                <div
                  key={h.month}
                  className={inner.chartBar}
                  style={{
                    height: `${height}px`,
                    background: h.month === 'Apr'
                      ? 'linear-gradient(180deg, var(--color-accent), rgba(0,214,143,0.3))'
                      : 'linear-gradient(180deg, rgba(0,214,143,0.4), rgba(0,214,143,0.1))',
                    borderRadius: '6px 6px 0 0',
                  }}
                  title={`${h.month}: ${h.score}`}
                />
              );
            })}
          </div>
          <div className={inner.chartLabels}>
            {SCORE_HISTORY.map((h) => (
              <span key={h.month} className={inner.chartLabel}>{h.month}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className={inner.panel}>
        <div className={inner.panelHeader}>
          <h2>How to Improve</h2>
        </div>
        <div className={inner.settingsGroup}>
          {TIPS.map((tip) => (
            <div key={tip.title} className={inner.settingsRow}>
              <span style={{ fontSize: '24px', flexShrink: 0 }}>{tip.icon}</span>
              <div className={inner.settingsInfo}>
                <span className={inner.settingsLabel}>{tip.title}</span>
                <span className={inner.settingsDesc}>{tip.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
