'use client';

import { useState } from 'react';
import inner from '../inner.module.css';

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    transactions: true,
    payments: true,
    scoreChanges: true,
    marketing: false,
  });

  const toggleNotif = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className={inner.innerPage}>
      <div className={inner.pageHeader}>
        <div>
          <h1>Settings</h1>
          <p>Manage your account preferences</p>
        </div>
      </div>

      {/* Profile */}
      <div className={inner.panel}>
        <div className={inner.panelHeader}>
          <h2>Profile Information</h2>
          <button className="btn btn-secondary btn-sm" onClick={() => alert('Profile editing will be available after launch.')}>Edit</button>
        </div>
        <div className={inner.settingsGroup}>
          <div className={inner.settingsRow}>
            <div className={inner.settingsInfo}>
              <span className={inner.settingsLabel}>Full Name</span>
            </div>
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)' }}>Sarah Johnson</span>
          </div>
          <div className={inner.settingsRow}>
            <div className={inner.settingsInfo}>
              <span className={inner.settingsLabel}>Email</span>
            </div>
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)' }}>sarah.j@mail.com</span>
          </div>
          <div className={inner.settingsRow}>
            <div className={inner.settingsInfo}>
              <span className={inner.settingsLabel}>Phone</span>
            </div>
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)' }}>+1 (416) 555-0123</span>
          </div>
          <div className={inner.settingsRow}>
            <div className={inner.settingsInfo}>
              <span className={inner.settingsLabel}>Province</span>
            </div>
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)' }}>Ontario</span>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className={inner.panel}>
        <div className={inner.panelHeader}>
          <h2>Notifications</h2>
        </div>
        <div className={inner.settingsGroup}>
          <div className={inner.settingsRow}>
            <div className={inner.settingsInfo}>
              <span className={inner.settingsLabel}>Transaction Alerts</span>
              <span className={inner.settingsDesc}>Get notified for every card transaction</span>
            </div>
            <button className={`${inner.toggle} ${notifications.transactions ? inner.toggleActive : ''}`} onClick={() => toggleNotif('transactions')} />
          </div>
          <div className={inner.settingsRow}>
            <div className={inner.settingsInfo}>
              <span className={inner.settingsLabel}>Payment Reminders</span>
              <span className={inner.settingsDesc}>Remind me 3 days before payment is due</span>
            </div>
            <button className={`${inner.toggle} ${notifications.payments ? inner.toggleActive : ''}`} onClick={() => toggleNotif('payments')} />
          </div>
          <div className={inner.settingsRow}>
            <div className={inner.settingsInfo}>
              <span className={inner.settingsLabel}>Credit Score Changes</span>
              <span className={inner.settingsDesc}>Notify when your credit score updates</span>
            </div>
            <button className={`${inner.toggle} ${notifications.scoreChanges ? inner.toggleActive : ''}`} onClick={() => toggleNotif('scoreChanges')} />
          </div>
          <div className={inner.settingsRow}>
            <div className={inner.settingsInfo}>
              <span className={inner.settingsLabel}>Marketing & Tips</span>
              <span className={inner.settingsDesc}>Credit-building tips and product updates</span>
            </div>
            <button className={`${inner.toggle} ${notifications.marketing ? inner.toggleActive : ''}`} onClick={() => toggleNotif('marketing')} />
          </div>
        </div>
      </div>

      {/* Security */}
      <div className={inner.panel}>
        <div className={inner.panelHeader}>
          <h2>Security</h2>
        </div>
        <div className={inner.settingsGroup}>
          <div className={inner.settingsRow}>
            <div className={inner.settingsInfo}>
              <span className={inner.settingsLabel}>Password</span>
              <span className={inner.settingsDesc}>Last changed 30 days ago</span>
            </div>
            <button className="btn btn-secondary btn-sm" onClick={() => alert('Password change will be available after launch.')}>Change</button>
          </div>
          <div className={inner.settingsRow}>
            <div className={inner.settingsInfo}>
              <span className={inner.settingsLabel}>Two-Factor Authentication</span>
              <span className={inner.settingsDesc}>Add an extra layer of security to your account</span>
            </div>
            <button className="btn btn-secondary btn-sm" onClick={() => alert('Two-factor authentication will be available after launch.')}>Enable</button>
          </div>
          <div className={inner.settingsRow}>
            <div className={inner.settingsInfo}>
              <span className={inner.settingsLabel}>Active Sessions</span>
              <span className={inner.settingsDesc}>1 device currently logged in</span>
            </div>
            <button className="btn btn-secondary btn-sm" onClick={() => alert('Session management will be available after launch.')}>Manage</button>
          </div>
        </div>
      </div>

      {/* Billing */}
      <div className={inner.panel}>
        <div className={inner.panelHeader}>
          <h2>Billing & Statements</h2>
        </div>
        <div className={inner.settingsGroup}>
          <div className={inner.settingsRow}>
            <div className={inner.settingsInfo}>
              <span className={inner.settingsLabel}>Monthly Subscription</span>
              <span className={inner.settingsDesc}>$5.00/month — Next billing: April 25, 2025</span>
            </div>
            <span style={{
              fontSize: 'var(--text-xs)', fontWeight: 600, padding: '3px 10px', borderRadius: 'var(--radius-full)',
              background: 'rgba(0,214,143,0.1)', color: 'var(--color-success)',
            }}>Active</span>
          </div>
          <div className={inner.settingsRow}>
            <div className={inner.settingsInfo}>
              <span className={inner.settingsLabel}>Download Statements</span>
              <span className={inner.settingsDesc}>PDF statements for your records</span>
            </div>
            <button className="btn btn-secondary btn-sm" onClick={() => alert('Statement downloads will be available after launch.')}>Download</button>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className={inner.panel} style={{ borderColor: 'rgba(239, 68, 68, 0.2)' }}>
        <div className={inner.panelHeader}>
          <h2 style={{ color: 'var(--color-error)' }}>Danger Zone</h2>
        </div>
        <div className={inner.settingsGroup}>
          <div className={inner.settingsRow}>
            <div className={inner.settingsInfo}>
              <span className={inner.settingsLabel}>Close Account</span>
              <span className={inner.settingsDesc}>Permanently close your LivingCard account. This action cannot be undone.</span>
            </div>
            <button className="btn btn-secondary btn-sm" style={{ borderColor: 'var(--color-error)', color: 'var(--color-error)' }} onClick={() => { if(confirm('Are you sure you want to close your account? This action cannot be undone.')) alert('Account closure will be processed after launch.'); }}>
              Close Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
