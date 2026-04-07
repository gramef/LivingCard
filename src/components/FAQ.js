'use client';

import { useState } from 'react';
import styles from './FAQ.module.css';

const faqs = [
  {
    q: 'What is Living Card?',
    a: 'Living Card is a restricted-use digital credit card designed to help financially vulnerable Canadians access credit for essential purchases only — like groceries, pharmacy, transit, and utilities — while building legitimate credit history.',
  },
  {
    q: 'How is this different from a regular credit card?',
    a: 'Unlike traditional credit cards, Living Card restricts spending to essential life categories using Merchant Category Codes (MCC). You cannot use it for gambling, luxury retail, liquor stores, or cash advances. This protects you from harmful spending while helping you build credit responsibly.',
  },
  {
    q: 'How does Living Card help me build credit?',
    a: 'Living Card reports your payment history, credit limit, and balance ratio to both Equifax Canada and TransUnion Canada every month. On-time payments directly improve your credit score, and after 12 months of responsible use, you may qualify for traditional credit products.',
  },
  {
    q: 'What are the credit limits?',
    a: 'Initial credit limits range from $200 to $500, with a maximum of $1,000. Limits increase based on responsible usage — 3 months of on-time payments triggers a limit increase, and at 6 months you start seeing credit score reporting benefits.',
  },
  {
    q: 'How much does it cost?',
    a: 'Living Card has a simple $5/month subscription fee that includes access to the card, financial health insights, and credit monitoring. Interest rates range from 19–29% APR, well below Canadian criminal rate thresholds. No hidden fees.',
  },
  {
    q: 'What if I don\'t have a credit score?',
    a: 'That\'s exactly who Living Card is designed for. We use alternative credit signals like income verification, employment history, bank account activity, and rent payments to assess your application — not traditional credit scores.',
  },
  {
    q: 'How fast is the application process?',
    a: 'You can apply in under 5 minutes directly from the app. Our system runs KYC verification, risk scoring, and fraud detection automatically. Most applicants receive an instant decision, and approved users get a virtual card immediately.',
  },
  {
    q: 'Where can I use my Living Card?',
    a: 'Living Card works everywhere Mastercard is accepted — in-store via Apple Pay / Google Pay (NFC), and online — but only at essential merchants. This includes grocery stores, pharmacies, public transit, gas stations, utilities, childcare, and medical services.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className={`section bg-gradient-section`} id="faq">
      <div className="container">
        <div className="section-header">
          <span className="badge">Support</span>
          <h2>Frequently Asked Questions</h2>
          <p>Everything you need to know about Living Card.</p>
        </div>

        <div className={styles.list}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`${styles.item} ${openIndex === i ? styles.open : ''}`}
            >
              <button
                className={styles.question}
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
                id={`faq-item-${i}`}
              >
                <span>{faq.q}</span>
                <div className={styles.icon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="12" y1="5" x2="12" y2="19" className={styles.vLine} />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </div>
              </button>
              <div className={styles.answer}>
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
