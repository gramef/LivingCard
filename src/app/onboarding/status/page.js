'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import VirtualCard from '@/components/VirtualCard';
import Logo from '@/components/Logo';
import styles from './status.module.css';

const STATUS_STEPS = [
  { id: 'submitted', label: 'Application Submitted', icon: '📄', time: 'Just now' },
  { id: 'identity', label: 'Identity Verification', icon: '🔍', time: '~1 minute' },
  { id: 'risk', label: 'Risk Assessment', icon: '📊', time: '~2 minutes' },
  { id: 'decision', label: 'Decision', icon: '✅', time: '~30 seconds' },
];

export default function ApplicationStatusPage() {
  const router = useRouter();
  const [currentStatus, setCurrentStatus] = useState(0);
  const [approved, setApproved] = useState(false);

  // Simulate application processing
  useEffect(() => {
    const timers = [
      setTimeout(() => setCurrentStatus(1), 2000),
      setTimeout(() => setCurrentStatus(2), 5000),
      setTimeout(() => setCurrentStatus(3), 8000),
      setTimeout(() => setApproved(true), 9500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  if (approved) {
    return (
      <div className={styles.statusPage}>
        <div className={`${styles.approvedCard} animate-fade-in-up`}>
          <div className={styles.approvedGlow} />
          <div className={styles.confetti}>🎉</div>
          <h1>You&apos;re Approved!</h1>
          <p className={styles.approvedSubtext}>
            Welcome to LivingCard. Your virtual card is ready to use.
          </p>

          <div className={styles.approvedDetails}>
            <div className={styles.approvedDetail}>
              <span className={styles.detailLabel}>Credit Limit</span>
              <span className={styles.detailValue}>$500.00</span>
            </div>
            <div className={styles.approvedDetail}>
              <span className={styles.detailLabel}>APR</span>
              <span className={styles.detailValue}>22.9%</span>
            </div>
            <div className={styles.approvedDetail}>
              <span className={styles.detailLabel}>Monthly Fee</span>
              <span className={styles.detailValue}>$5.00</span>
            </div>
          </div>

          <div className={styles.approvedCardDisplay}>
            <VirtualCard />
          </div>

          <div className={styles.approvedActions}>
            <Link href="/dashboard" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
              Go to Dashboard
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <p className={styles.approvedNote}>
              Add your card to Apple Pay or Google Pay to start spending on essentials.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.statusPage}>
      <div className={styles.statusContainer}>
        <div className={styles.statusHeader}>
          <Link href="/" className={styles.statusLogo}>
            <Logo size="md" />
          </Link>
        </div>

        <div className={styles.statusContent}>
          <div className={styles.spinner}>
            <div className={styles.spinnerRing} />
          </div>
          <h1>Reviewing Your Application</h1>
          <p>This usually takes less than 5 minutes. Please don&apos;t close this page.</p>
        </div>

        <div className={styles.timeline}>
          {STATUS_STEPS.map((step, i) => (
            <div key={step.id} className={`${styles.timelineStep} ${i <= currentStatus ? styles.timelineActive : ''} ${i < currentStatus ? styles.timelineDone : ''}`}>
              <div className={styles.timelineIcon}>
                {i < currentStatus ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>
                ) : i === currentStatus ? (
                  <div className={styles.timelinePulse} />
                ) : (
                  <div className={styles.timelineDot} />
                )}
              </div>
              <div className={styles.timelineContent}>
                <span className={styles.timelineLabel}>{step.label}</span>
                <span className={styles.timelineTime}>{step.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
