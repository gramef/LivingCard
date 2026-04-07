import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const columns = [
    {
      title: 'Product',
      links: [
        { label: 'How It Works', href: '#how-it-works' },
        { label: 'Features', href: '#features' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'FAQ', href: '#faq' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '#' },
        { label: 'Careers', href: '#' },
        { label: 'Blog', href: '#' },
        { label: 'Press', href: '#' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' },
        { label: 'Compliance', href: '#' },
        { label: 'Accessibility', href: '#' },
      ],
    },
  ];

  return (
    <footer className={styles.footer} id="footer">
      <div className={`container ${styles.inner}`}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <a href="#" className={styles.logo}>
              <div className={styles.logoIcon}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <rect x="2" y="4" width="24" height="18" rx="4" stroke="currentColor" strokeWidth="2" />
                  <path d="M2 10h24" stroke="currentColor" strokeWidth="2" />
                  <circle cx="8" cy="16" r="2" fill="var(--color-accent)" />
                </svg>
              </div>
              <span>Living<span style={{ color: 'var(--color-accent)' }}>Card</span></span>
            </a>
            <p className={styles.tagline}>
              Credit that cares. Building financial stability for every Canadian.
            </p>
          </div>

          <div className={styles.columns}>
            {columns.map((col) => (
              <div key={col.title} className={styles.column}>
                <h4 className={styles.columnTitle}>{col.title}</h4>
                <ul>
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className={styles.link}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <hr className="divider" />

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {currentYear} Living Card by Arkad. All rights reserved.
          </p>
          <div className={styles.badges}>
            <span className={styles.complianceBadge}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              PCI DSS
            </span>
            <span className={styles.complianceBadge}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              PIPEDA
            </span>
            <span className={styles.complianceBadge}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              FINTRAC
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
