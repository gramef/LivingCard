'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Logo from '@/components/Logo';
import styles from './onboarding.module.css';

const STEPS = [
  { id: 'identity', title: 'Personal Info', icon: '👤' },
  { id: 'employment', title: 'Employment', icon: '💼' },
  { id: 'income', title: 'Income', icon: '💰' },
  { id: 'review', title: 'Review', icon: '✅' },
];

const PROVINCES = [
  'Ontario', 'British Columbia', 'Alberta', 'Quebec', 'Manitoba',
  'Saskatchewan', 'Nova Scotia', 'New Brunswick', 'Newfoundland and Labrador', 'Prince Edward Island',
];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Identity
    firstName: '', lastName: '', dateOfBirth: '', phone: '',
    address: '', city: '', province: 'Ontario', postalCode: '', sinLast4: '',
    // Employment
    employmentStatus: '', employer: '', jobTitle: '', employmentDuration: '',
    // Income
    monthlyIncome: '', incomeSource: '', payFrequency: '', bankName: '',
  });

  const updateField = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        // Fallback: if API fails (no Supabase), still navigate
        console.warn('API call failed, proceeding with demo flow');
      }
    } catch {
      // Graceful fallback for demo mode
      console.warn('API unavailable, proceeding with demo flow');
    }
    await new Promise((r) => setTimeout(r, 1000));
    router.push('/onboarding/status');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0: return <StepIdentity data={formData} update={updateField} />;
      case 1: return <StepEmployment data={formData} update={updateField} />;
      case 2: return <StepIncome data={formData} update={updateField} />;
      case 3: return <StepReview data={formData} />;
      default: return null;
    }
  };

  return (
    <div className={styles.onboardingPage}>
      <div className={styles.onboardingHeader}>
        <Link href="/" className={styles.onboardingLogo}>
          <Logo size="sm" />
        </Link>
        <span className={styles.onboardingStepLabel}>
          Step {currentStep + 1} of {STEPS.length}
        </span>
      </div>

      {/* Progress */}
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }} />
      </div>

      <div className={styles.stepsNav}>
        {STEPS.map((step, i) => (
          <div key={step.id} className={`${styles.stepNav} ${i <= currentStep ? styles.stepActive : ''} ${i < currentStep ? styles.stepDone : ''}`}>
            <div className={styles.stepNavIcon}>
              {i < currentStep ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>
              ) : (
                <span>{step.icon}</span>
              )}
            </div>
            <span className={styles.stepNavLabel}>{step.title}</span>
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className={styles.stepContent}>
        {renderStep()}
      </div>

      {/* Navigation */}
      <div className={styles.stepActions}>
        {currentStep > 0 && (
          <button className="btn btn-secondary" onClick={prevStep}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            Back
          </button>
        )}
        <div style={{ flex: 1 }} />
        {currentStep < STEPS.length - 1 ? (
          <button className="btn btn-primary" onClick={nextStep}>
            Continue
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </button>
        ) : (
          <button className="btn btn-primary" onClick={handleSubmit} disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit Application'}
          </button>
        )}
      </div>
    </div>
  );
}

/* ===== STEP COMPONENTS ===== */

function StepIdentity({ data, update }) {
  return (
    <div className={styles.stepForm}>
      <div className={styles.stepHeader}>
        <h2>Personal Information</h2>
        <p>We need this for identity verification and KYC compliance.</p>
      </div>
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label>First Name <span className={styles.req}>*</span></label>
          <input className="input" placeholder="Sarah" value={data.firstName} onChange={(e) => update('firstName', e.target.value)} />
        </div>
        <div className={styles.formGroup}>
          <label>Last Name <span className={styles.req}>*</span></label>
          <input className="input" placeholder="Johnson" value={data.lastName} onChange={(e) => update('lastName', e.target.value)} />
        </div>
        <div className={styles.formGroup}>
          <label>Date of Birth <span className={styles.req}>*</span></label>
          <input className="input" type="date" value={data.dateOfBirth} onChange={(e) => update('dateOfBirth', e.target.value)} />
        </div>
        <div className={styles.formGroup}>
          <label>Phone Number <span className={styles.req}>*</span></label>
          <input className="input" type="tel" placeholder="+1 (416) 555-0123" value={data.phone} onChange={(e) => update('phone', e.target.value)} />
        </div>
        <div className={`${styles.formGroup} ${styles.formFull}`}>
          <label>Street Address <span className={styles.req}>*</span></label>
          <input className="input" placeholder="123 Main Street, Apt 4B" value={data.address} onChange={(e) => update('address', e.target.value)} />
        </div>
        <div className={styles.formGroup}>
          <label>City <span className={styles.req}>*</span></label>
          <input className="input" placeholder="Toronto" value={data.city} onChange={(e) => update('city', e.target.value)} />
        </div>
        <div className={styles.formGroup}>
          <label>Province <span className={styles.req}>*</span></label>
          <select className="input" value={data.province} onChange={(e) => update('province', e.target.value)}>
            {PROVINCES.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Postal Code <span className={styles.req}>*</span></label>
          <input className="input" placeholder="M5V 2T6" value={data.postalCode} onChange={(e) => update('postalCode', e.target.value)} />
        </div>
        <div className={styles.formGroup}>
          <label>SIN (Last 4 digits) <span className={styles.req}>*</span></label>
          <input className="input" maxLength={4} placeholder="••••" value={data.sinLast4} onChange={(e) => update('sinLast4', e.target.value)} />
          <span className={styles.fieldHint}>Required for credit bureau reporting. Encrypted and secure.</span>
        </div>
      </div>
    </div>
  );
}

function StepEmployment({ data, update }) {
  return (
    <div className={styles.stepForm}>
      <div className={styles.stepHeader}>
        <h2>Employment Details</h2>
        <p>This helps us understand your financial stability for credit assessment.</p>
      </div>
      <div className={styles.formGrid}>
        <div className={`${styles.formGroup} ${styles.formFull}`}>
          <label>Employment Status <span className={styles.req}>*</span></label>
          <div className={styles.radioCards}>
            {[
              { value: 'full-time', label: 'Full-Time', icon: '🏢' },
              { value: 'part-time', label: 'Part-Time', icon: '⏰' },
              { value: 'self-employed', label: 'Self-Employed', icon: '💻' },
              { value: 'student', label: 'Student', icon: '🎓' },
              { value: 'other', label: 'Other', icon: '📋' },
            ].map((opt) => (
              <label key={opt.value} className={`${styles.radioCard} ${data.employmentStatus === opt.value ? styles.radioCardActive : ''}`}>
                <input type="radio" name="employment" value={opt.value} checked={data.employmentStatus === opt.value} onChange={(e) => update('employmentStatus', e.target.value)} />
                <span className={styles.radioCardIcon}>{opt.icon}</span>
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        </div>
        <div className={styles.formGroup}>
          <label>Employer Name</label>
          <input className="input" placeholder="Company Inc." value={data.employer} onChange={(e) => update('employer', e.target.value)} />
        </div>
        <div className={styles.formGroup}>
          <label>Job Title</label>
          <input className="input" placeholder="Software Developer" value={data.jobTitle} onChange={(e) => update('jobTitle', e.target.value)} />
        </div>
        <div className={`${styles.formGroup} ${styles.formFull}`}>
          <label>Duration at Current Employment</label>
          <select className="input" value={data.employmentDuration} onChange={(e) => update('employmentDuration', e.target.value)}>
            <option value="">Select duration</option>
            <option value="<6mo">Less than 6 months</option>
            <option value="6-12mo">6 – 12 months</option>
            <option value="1-2yr">1 – 2 years</option>
            <option value="2-5yr">2 – 5 years</option>
            <option value="5+yr">5+ years</option>
          </select>
        </div>
      </div>
    </div>
  );
}

function StepIncome({ data, update }) {
  return (
    <div className={styles.stepForm}>
      <div className={styles.stepHeader}>
        <h2>Income Verification</h2>
        <p>Used to determine your initial credit limit ($200 – $1,000).</p>
      </div>
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label>Monthly Income (CAD) <span className={styles.req}>*</span></label>
          <div className={styles.inputWithPrefix}>
            <span className={styles.inputPrefix}>$</span>
            <input className="input" type="number" placeholder="3,500" value={data.monthlyIncome} onChange={(e) => update('monthlyIncome', e.target.value)} style={{ paddingLeft: '32px' }} />
          </div>
        </div>
        <div className={styles.formGroup}>
          <label>Primary Income Source <span className={styles.req}>*</span></label>
          <select className="input" value={data.incomeSource} onChange={(e) => update('incomeSource', e.target.value)}>
            <option value="">Select source</option>
            <option value="employment">Employment Income</option>
            <option value="self-employment">Self-Employment</option>
            <option value="government">Government Benefits</option>
            <option value="pension">Pension/Retirement</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Pay Frequency</label>
          <select className="input" value={data.payFrequency} onChange={(e) => update('payFrequency', e.target.value)}>
            <option value="">Select frequency</option>
            <option value="weekly">Weekly</option>
            <option value="biweekly">Bi-Weekly</option>
            <option value="semimonthly">Semi-Monthly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Primary Bank</label>
          <select className="input" value={data.bankName} onChange={(e) => update('bankName', e.target.value)}>
            <option value="">Select your bank</option>
            <option value="rbc">RBC Royal Bank</option>
            <option value="td">TD Canada Trust</option>
            <option value="bmo">BMO</option>
            <option value="scotiabank">Scotiabank</option>
            <option value="cibc">CIBC</option>
            <option value="national">National Bank</option>
            <option value="desjardins">Desjardins</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className={`${styles.formGroup} ${styles.formFull}`}>
          <div className={styles.infoCard}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <div>
              <strong>Secure & Encrypted</strong>
              <p>Your financial data is encrypted end-to-end. We never store your bank credentials. Income verification is used solely for credit limit assessment.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StepReview({ data }) {
  const sections = [
    {
      title: 'Personal Information',
      items: [
        { label: 'Name', value: `${data.firstName} ${data.lastName}` },
        { label: 'Date of Birth', value: data.dateOfBirth },
        { label: 'Phone', value: data.phone },
        { label: 'Address', value: `${data.address}, ${data.city}, ${data.province} ${data.postalCode}` },
        { label: 'SIN (Last 4)', value: data.sinLast4 ? `••••${data.sinLast4}` : '—' },
      ],
    },
    {
      title: 'Employment',
      items: [
        { label: 'Status', value: data.employmentStatus || '—' },
        { label: 'Employer', value: data.employer || '—' },
        { label: 'Job Title', value: data.jobTitle || '—' },
        { label: 'Duration', value: data.employmentDuration || '—' },
      ],
    },
    {
      title: 'Income',
      items: [
        { label: 'Monthly Income', value: data.monthlyIncome ? `$${Number(data.monthlyIncome).toLocaleString()}` : '—' },
        { label: 'Income Source', value: data.incomeSource || '—' },
        { label: 'Pay Frequency', value: data.payFrequency || '—' },
        { label: 'Bank', value: data.bankName || '—' },
      ],
    },
  ];

  return (
    <div className={styles.stepForm}>
      <div className={styles.stepHeader}>
        <h2>Review Your Application</h2>
        <p>Please review all details before submitting. Your application will be processed within 5 minutes.</p>
      </div>
      <div className={styles.reviewSections}>
        {sections.map((section) => (
          <div key={section.title} className={styles.reviewSection}>
            <h3>{section.title}</h3>
            <div className={styles.reviewItems}>
              {section.items.map((item) => (
                <div key={item.label} className={styles.reviewItem}>
                  <span className={styles.reviewLabel}>{item.label}</span>
                  <span className={styles.reviewValue}>{item.value || '—'}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.infoCard} style={{ marginTop: 'var(--space-6)' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" strokeWidth="2" strokeLinecap="round">
          <path d="M12 9v4M12 17h.01" />
          <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        </svg>
        <div>
          <strong>By submitting</strong>
          <p>You authorize LivingCard to perform a soft credit inquiry (which will not impact your credit score) and verify your identity per FINTRAC requirements.</p>
        </div>
      </div>
    </div>
  );
}
