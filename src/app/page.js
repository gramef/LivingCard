'use client';

import { useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VirtualCard from '@/components/VirtualCard';
import FAQ from '@/components/FAQ';
import styles from './page.module.css';

export default function Home() {
  const revealRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header />

      {/* ===== HERO ===== */}
      <section className={`${styles.hero} bg-gradient-hero noise-overlay`} id="hero">
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroContent}>
            <span className="badge animate-fade-in-up">
              <span className={styles.pulse} />
              Launching in Ontario, Canada
            </span>
            <h1 className="animate-fade-in-up delay-1">
              Credit that<br />
              <span className="text-accent">cares.</span>
            </h1>
            <p className={`${styles.heroDesc} animate-fade-in-up delay-2`}>
              A restricted-use digital credit card that helps financially vulnerable
              Canadians build credit by spending only on life&apos;s essentials —
              groceries, pharmacy, transit, and utilities.
            </p>
            <div className={`${styles.heroCta} animate-fade-in-up delay-3`}>
              <a href="#waitlist" className="btn btn-primary btn-lg">
                Join the Waitlist
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a href="#how-it-works" className="btn btn-secondary btn-lg">
                See How It Works
              </a>
            </div>
            <div className={`${styles.heroStats} animate-fade-in-up delay-4`}>
              <div className={styles.stat}>
                <span className={styles.statValue}>$5</span>
                <span className={styles.statLabel}>per month</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.stat}>
                <span className={styles.statValue}>&lt;5 min</span>
                <span className={styles.statLabel}>to apply</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.stat}>
                <span className={styles.statValue}>+50 pts</span>
                <span className={styles.statLabel}>avg credit boost</span>
              </div>
            </div>
          </div>
          <div className={`${styles.heroCard} animate-fade-in-up delay-3`}>
            <VirtualCard />
            <div className={styles.heroCardGlow} />
          </div>
        </div>
        <div className={styles.scrollIndicator}>
          <div className={styles.scrollDot} />
        </div>
      </section>

      {/* ===== PROBLEM ===== */}
      <section className={`section ${styles.problem}`} id="problem">
        <div className="container">
          <div className="section-header reveal">
            <span className="badge badge-gold">The Problem</span>
            <h2>The Credit Gap Is Real</h2>
            <p>
              Millions of Canadians are trapped in a cycle of payday loans and
              predatory lending because traditional banks won&apos;t serve them.
            </p>
          </div>

          <div className={`${styles.problemGrid} reveal`}>
            <div className={`glass-card ${styles.problemCard}`}>
              <div className={styles.problemIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-error)" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M15 9l-6 6M9 9l6 6" />
                </svg>
              </div>
              <h3>No Credit History</h3>
              <p>Newcomers, young adults, and thin-file individuals are denied by banks before they can even start.</p>
            </div>
            <div className={`glass-card ${styles.problemCard}`}>
              <div className={styles.problemIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-warning)" strokeWidth="2" strokeLinecap="round">
                  <path d="M12 9v4M12 17h.01" />
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                </svg>
              </div>
              <h3>Predatory Alternatives</h3>
              <p>Payday lenders charge up to 500% APR equivalent, trapping vulnerable borrowers in cycles of debt.</p>
            </div>
            <div className={`glass-card ${styles.problemCard}`}>
              <div className={styles.problemIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-info)" strokeWidth="2" strokeLinecap="round">
                  <rect x="1" y="4" width="22" height="16" rx="2" />
                  <path d="M1 10h22" />
                </svg>
              </div>
              <h3>No Path Forward</h3>
              <p>Without responsible credit products, there&apos;s no way to build the credit history needed for mainstream banking.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className={`section bg-gradient-section`} id="how-it-works">
        <div className="container">
          <div className="section-header reveal">
            <span className="badge">Simple Process</span>
            <h2>How Living Card Works</h2>
            <p>From application to credit building in four simple steps.</p>
          </div>

          <div className={`${styles.stepsGrid} reveal`}>
            {[
              {
                step: '01',
                title: 'Apply in Minutes',
                desc: 'Download the app and submit your identity, employment, and income details. No traditional credit score required.',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <rect x="5" y="2" width="14" height="20" rx="2" />
                    <path d="M12 18h.01" />
                  </svg>
                ),
              },
              {
                step: '02',
                title: 'Get Approved Instantly',
                desc: 'Our system runs KYC, risk scoring, and fraud detection. Receive your decision in under 5 minutes.',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                    <path d="M22 4L12 14.01l-3-3" />
                  </svg>
                ),
              },
              {
                step: '03',
                title: 'Spend on Essentials',
                desc: 'Use your virtual card for groceries, pharmacy, transit, utilities, and medical services. Blocked for harmful purchases.',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
                  </svg>
                ),
              },
              {
                step: '04',
                title: 'Build Your Credit',
                desc: 'On-time payments are reported to Equifax and TransUnion. Watch your credit score grow month by month.',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M23 6l-9.5 9.5-5-5L1 18" />
                    <path d="M17 6h6v6" />
                  </svg>
                ),
              },
            ].map((item) => (
              <div key={item.step} className={styles.step}>
                <div className={styles.stepNumber}>{item.step}</div>
                <div className={styles.stepIcon}>{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className={`section`} id="features">
        <div className="container">
          <div className="section-header reveal">
            <span className="badge">Features</span>
            <h2>Designed to Protect <span className="text-accent">&</span> Empower</h2>
            <p>Every feature of Living Card is built to keep you safe while helping you grow financially.</p>
          </div>

          <div className={`${styles.featuresGrid} reveal`}>
            {[
              {
                title: 'Essential Spending Only',
                desc: 'Smart MCC-based policy engine ensures your card only works at essential merchants — groceries, pharmacy, transit, utilities, childcare, and medical.',
                icon: '🛡️',
                highlight: true,
              },
              {
                title: 'Credit Bureau Reporting',
                desc: 'Every on-time payment is reported to both Equifax and TransUnion Canada, building your credit score with every purchase.',
                icon: '📊',
                highlight: false,
              },
              {
                title: 'Apple Pay & Google Pay',
                desc: 'Add your Living Card to your mobile wallet for instant, contactless payments at any supported merchant — in-store or online.',
                icon: '📱',
                highlight: false,
              },
              {
                title: 'Transparent Decline Reasons',
                desc: 'If a purchase is blocked, Living Card tells you exactly why and suggests where you can use your card instead. No confusing error codes.',
                icon: '💬',
                highlight: false,
              },
              {
                title: 'Gradual Credit Increases',
                desc: '3 months of on-time payments earns you a credit limit increase. 12 months unlocks eligibility for traditional credit products.',
                icon: '📈',
                highlight: false,
              },
              {
                title: 'Smart Autopay',
                desc: 'Set up automatic minimum, full, or custom payments via bank transfer, Interac, or debit card. Never miss a payment.',
                icon: '🔄',
                highlight: false,
              },
            ].map((f) => (
              <div
                key={f.title}
                className={`glass-card ${styles.featureCard} ${f.highlight ? styles.featureHighlight : ''}`}
              >
                <div className={styles.featureIcon}>{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section className={`section bg-gradient-section`} id="pricing">
        <div className="container">
          <div className="section-header reveal">
            <span className="badge badge-gold">Transparent Pricing</span>
            <h2>Simple, Honest Pricing</h2>
            <p>No hidden fees. No predatory rates. Just straightforward pricing that respects your finances.</p>
          </div>

          <div className={`${styles.pricingCard} reveal`}>
            <div className={styles.pricingHeader}>
              <span className="badge">Essential Plan</span>
              <div className={styles.priceRow}>
                <span className={styles.priceCurrency}>$</span>
                <span className={styles.priceAmount}>5</span>
                <span className={styles.pricePeriod}>/month</span>
              </div>
              <p className={styles.priceSubtext}>Cancel anytime. No contract.</p>
            </div>

            <hr className="divider" />

            <div className={styles.pricingFeatures}>
              {[
                'Virtual Mastercard with Apple Pay & Google Pay',
                'Essential spending categories enforced',
                'Credit reporting to Equifax & TransUnion',
                'Financial health insights dashboard',
                'Real-time credit score monitoring',
                'Instant transaction notifications',
                'Transparent decline explanations',
                '$200 – $1,000 credit limit range',
              ].map((feat) => (
                <div key={feat} className={styles.pricingFeature}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <div className={styles.pricingCta}>
              <a href="#waitlist" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                Join the Waitlist
              </a>
            </div>

            <div className={styles.pricingNote}>
              <p>Interest: 19–29% APR · Below Canadian criminal rate thresholds</p>
              <p>Interchange revenue: ~1.5% · Generated on merchant transactions</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRUST ===== */}
      <section className={`section`} id="trust">
        <div className="container">
          <div className="section-header reveal">
            <span className="badge">Security & Compliance</span>
            <h2>Built on Trust</h2>
            <p>Living Card meets the highest standards of financial security and privacy compliance.</p>
          </div>

          <div className={`${styles.trustGrid} reveal`}>
            {[
              {
                title: 'PCI DSS Compliant',
                desc: 'Payment Card Industry Data Security Standard — the gold standard for card data protection.',
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                ),
              },
              {
                title: 'PIPEDA Privacy',
                desc: 'Full compliance with Canada\'s Personal Information Protection and Electronic Documents Act.',
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                ),
              },
              {
                title: 'FINTRAC Registered',
                desc: 'Registered with Canada\'s Financial Transactions and Reports Analysis Centre for AML compliance.',
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                    <path d="M14 2v6h6" />
                    <path d="M9 15l2 2 4-4" />
                  </svg>
                ),
              },
              {
                title: 'End-to-End Encryption',
                desc: 'All data is encrypted in transit and at rest with tokenized card numbers stored in a secure vault.',
                icon: (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round">
                    <rect x="1" y="4" width="22" height="16" rx="2" />
                    <path d="M1 10h22" />
                    <circle cx="12" cy="16" r="1" />
                  </svg>
                ),
              },
            ].map((t) => (
              <div key={t.title} className={`solid-card ${styles.trustCard}`}>
                <div className={styles.trustIcon}>{t.icon}</div>
                <h4>{t.title}</h4>
                <p>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <FAQ />

      {/* ===== WAITLIST CTA ===== */}
      <section className={`section ${styles.waitlist}`} id="waitlist">
        <div className="container">
          <div className={`${styles.waitlistCard} reveal`}>
            <div className={styles.waitlistGlow} />
            <div className={styles.waitlistContent}>
              <span className="badge">Early Access</span>
              <h2>Be First in Line</h2>
              <p>
                Living Card is launching in Ontario, Canada. Join the waitlist to
                be among the first to experience ethical credit building.
              </p>
              <form className={styles.waitlistForm} onSubmit={(e) => e.preventDefault()}>
                <div className="input-inline">
                  <input
                    type="email"
                    className="input"
                    placeholder="Enter your email address"
                    id="waitlist-email"
                    aria-label="Email for waitlist"
                  />
                  <button type="submit" className="btn btn-primary">
                    Join Waitlist
                  </button>
                </div>
              </form>
              <p className={styles.waitlistNote}>
                No spam. We&apos;ll only email you when Living Card is ready to launch.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
