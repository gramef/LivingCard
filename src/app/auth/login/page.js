'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import Link from 'next/link';
import Logo from '@/components/Logo';
import styles from '../auth.module.css';

export default function LoginPage() {
  return (
    <Suspense fallback={<div className={styles.authPage} />}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error: authError } = await signIn(email, password);

    if (authError) {
      setError(authError.message);
      setLoading(false);
    } else {
      router.push(redirect);
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
            <h1>Welcome back</h1>
            <p>Sign in to access your dashboard</p>
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
            <div className={styles.formGroup}>
              <label htmlFor="login-email">Email</label>
              <input
                id="login-email"
                type="email"
                className="input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="login-password">Password</label>
              <input
                id="login-password"
                type="password"
                className="input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              disabled={loading}
              style={{ width: '100%' }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className={styles.authFooter}>
            <p>
              Don&apos;t have an account?{' '}
              <Link href="/auth/register">Create one</Link>
            </p>
          </div>
        </div>

        <div className={styles.authVisual}>
          <div className={styles.visualContent}>
            <div className={styles.visualIcon}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h2>Your credit journey starts here</h2>
            <p>Build your credit score with responsible spending on everyday essentials.</p>
            <div className={styles.visualStats}>
              <div className={styles.visualStat}>
                <span className={styles.visualStatValue}>10,000+</span>
                <span>Waitlist signups</span>
              </div>
              <div className={styles.visualStat}>
                <span className={styles.visualStatValue}>+50 pts</span>
                <span>Avg credit boost</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
