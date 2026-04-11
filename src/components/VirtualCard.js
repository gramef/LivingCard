'use client';

import Image from 'next/image';
import styles from './VirtualCard.module.css';

export default function VirtualCard({ className = '' }) {
  return (
    <div className={`${styles.cardWrapper} ${className}`}>
      <div className={styles.card}>
        <div className={styles.cardGlow} />
        <div className={styles.cardContent}>
          <div className={styles.cardTop}>
            <div className={styles.cardLogo}>
              <Image src="/app-icon.png" alt="LivingCard" width={22} height={22} style={{ borderRadius: 4 }} />
              <span className={styles.cardBrand}>LivingCard</span>
            </div>
            <div className={styles.contactless}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M8.5 16.5a5 5 0 0 1 0-9" />
                <path d="M12 19a8 8 0 0 0 0-14" />
                <path d="M15.5 16.5a5 5 0 0 0 0-9" opacity="0.5" />
              </svg>
            </div>
          </div>

          <div className={styles.chip}>
            <svg width="36" height="28" viewBox="0 0 36 28" fill="none">
              <rect x="1" y="1" width="34" height="26" rx="4" fill="#C5A84A" fillOpacity="0.3" stroke="#C5A84A" strokeOpacity="0.5" />
              <line x1="1" y1="10" x2="35" y2="10" stroke="#C5A84A" strokeOpacity="0.4" />
              <line x1="1" y1="18" x2="35" y2="18" stroke="#C5A84A" strokeOpacity="0.4" />
              <line x1="12" y1="1" x2="12" y2="27" stroke="#C5A84A" strokeOpacity="0.3" />
              <line x1="24" y1="1" x2="24" y2="27" stroke="#C5A84A" strokeOpacity="0.3" />
            </svg>
          </div>

          <div className={styles.cardNumber}>
            <span>••••</span>
            <span>••••</span>
            <span>••••</span>
            <span className={styles.lastFour}>4821</span>
          </div>

          <div className={styles.cardBottom}>
            <div className={styles.cardHolder}>
              <span className={styles.cardLabel}>Card Holder</span>
              <span className={styles.cardValue}>SARAH JOHNSON</span>
            </div>
            <div className={styles.cardExpiry}>
              <span className={styles.cardLabel}>Expires</span>
              <span className={styles.cardValue}>09/28</span>
            </div>
            <div className={styles.network}>
              <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
                <circle cx="15" cy="12" r="10" fill="#EB001B" fillOpacity="0.8" />
                <circle cx="25" cy="12" r="10" fill="#F79E1B" fillOpacity="0.8" />
                <path d="M20 5.3a10 10 0 0 1 0 13.4 10 10 0 0 1 0-13.4z" fill="#FF5F00" fillOpacity="0.9" />
              </svg>
            </div>
          </div>
        </div>
        <div className={styles.shimmer} />
      </div>
    </div>
  );
}
