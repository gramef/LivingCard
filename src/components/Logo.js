'use client';

import Image from 'next/image';
import styles from './Logo.module.css';

/**
 * LivingCard Logo Component
 * Uses the brand logo assets from /public.
 * 
 * @param {string} variant - 'full' (icon + wordmark), 'icon' (icon only)
 * @param {string} size - 'sm' (24px), 'md' (32px), 'lg' (40px)
 * @param {string} className - additional CSS class
 */
export default function Logo({ variant = 'full', size = 'md', className = '' }) {
  const sizes = {
    sm: { icon: 24, wordmark: 20 },
    md: { icon: 32, wordmark: 24 },
    lg: { icon: 40, wordmark: 28 },
  };

  const s = sizes[size] || sizes.md;

  return (
    <div className={`${styles.logo} ${styles[size]} ${className}`}>
      <Image
        src="/app-icon.png"
        alt="LivingCard"
        width={s.icon}
        height={s.icon}
        className={styles.logoIcon}
        priority
      />
      {variant === 'full' && (
        <span className={styles.logoText}>
          Living<span className={styles.logoAccent}>Card</span>
        </span>
      )}
    </div>
  );
}
