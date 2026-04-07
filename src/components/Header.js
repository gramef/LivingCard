'use client';

import { useState, useEffect } from 'react';
import styles from './Header.module.css';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [menuOpen]);

  const navLinks = [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`} id="header">
      <div className={`container ${styles.inner}`}>
        <a href="#" className={styles.logo} aria-label="Living Card Home">
          <div className={styles.logoIcon}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect x="2" y="4" width="24" height="18" rx="4" stroke="currentColor" strokeWidth="2" />
              <path d="M2 10h24" stroke="currentColor" strokeWidth="2" />
              <circle cx="8" cy="16" r="2" fill="var(--color-accent)" />
            </svg>
          </div>
          <span className={styles.logoText}>Living<span className={styles.logoAccent}>Card</span></span>
        </a>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={styles.navLink}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className={styles.navCta}>
            <a href="#waitlist" className="btn btn-primary btn-sm" onClick={() => setMenuOpen(false)}>
              Join Waitlist
            </a>
          </div>
        </nav>

        <div className={styles.actions}>
          <a href="#waitlist" className="btn btn-primary btn-sm">
            Join Waitlist
          </a>
          <button
            className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            id="menu-toggle"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {menuOpen && <div className={styles.overlay} onClick={() => setMenuOpen(false)} />}
    </header>
  );
}
