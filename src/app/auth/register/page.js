'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import Link from 'next/link';
import Logo from '@/components/Logo';
import styles from '../auth.module.css';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const router = useRouter();

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    if (!formData.agreeTerms) {
      setError('You must agree to the terms and conditions');
      return;
    }

    setLoading(true);
    const { error: authError } = await signUp(formData.email, formData.password, {
      first_name: formData.firstName,
      last_name: formData.lastName,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
    } else {
      router.push('/onboarding');
    }
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.authContainer}>
        <div className={styles.authCard}>
          <div className={styles.authHeader}>
            <Link href="/" className={styles.authLogo}>
              <Logo size="lg" />
            </Link>
            <h1>Create your account</h1>
            <p>Start your credit-building journey</p>
          </div>

          {error && (
            <div className={styles.authError}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" /><path d="M15 9l-6 6M9 9l6 6" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.authForm}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="reg-first">First Name</label>
                <input id="reg-first" type="text" className="input" placeholder="Sarah"
                  value={formData.firstName} onChange={(e) => updateField('firstName', e.target.value)} required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="reg-last">Last Name</label>
                <input id="reg-last" type="text" className="input" placeholder="Johnson"
                  value={formData.lastName} onChange={(e) => updateField('lastName', e.target.value)} required />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="reg-email">Email</label>
              <input id="reg-email" type="email" className="input" placeholder="you@example.com"
                value={formData.email} onChange={(e) => updateField('email', e.target.value)} required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="reg-pass">Password</label>
              <input id="reg-pass" type="password" className="input" placeholder="Minimum 8 characters"
                value={formData.password} onChange={(e) => updateField('password', e.target.value)} required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="reg-confirm">Confirm Password</label>
              <input id="reg-confirm" type="password" className="input" placeholder="Re-enter your password"
                value={formData.confirmPassword} onChange={(e) => updateField('confirmPassword', e.target.value)} required />
            </div>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" checked={formData.agreeTerms}
                onChange={(e) => updateField('agreeTerms', e.target.checked)} />
              <span>I agree to the <a href="/terms" target="_blank">Terms of Service</a> and <a href="/privacy" target="_blank">Privacy Policy</a></span>
            </label>
            <button type="submit" className="btn btn-primary btn-lg" disabled={loading} style={{ width: '100%' }}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className={styles.authFooter}>
            <p>Already have an account? <Link href="/auth/login">Sign in</Link></p>
          </div>
        </div>

        <div className={styles.authVisual}>
          <div className={styles.visualContent}>
            <div className={styles.visualIcon}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round">
                <path d="M23 6l-9.5 9.5-5-5L1 18" /><path d="M17 6h6v6" />
              </svg>
            </div>
            <h2>Build credit responsibly</h2>
            <p>Join thousands of Canadians escaping the payday loan cycle with an ethical credit card designed for essentials.</p>
            <div className={styles.visualFeatures}>
              {['No traditional credit check', '$5/month flat fee', 'Reports to Equifax & TransUnion'].map((f) => (
                <div key={f} className={styles.visualFeature}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
