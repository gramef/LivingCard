'use client';

import { useState } from 'react';
import inner from '../../dashboard/inner.module.css';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    autoApproveHighScore: true,
    requireManualReview: false,
    emailNotifications: true,
    slackAlerts: false,
    maintenanceMode: false,
  });

  const toggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className={inner.innerPage}>
      <div className={inner.pageHeader}>
        <div>
          <h1>Settings</h1>
          <p>Platform configuration and controls</p>
        </div>
      </div>

      {/* Application Processing */}
      <div className={inner.panel}>
        <div className={inner.panelHeader}>
          <h2>Application Processing</h2>
        </div>
        <div className={inner.settingsGroup}>
          <div className={inner.settingsRow}>
            <div className={inner.settingsInfo}>
              <span className={inner.settingsLabel}>Auto-Approve High Scores</span>
              <span className={inner.settingsDesc}>Automatically approve applications with risk score ≥ 80</span>
            </div>
            <button className={`${inner.toggle} ${settings.autoApproveHighScore ? inner.toggleActive : ''}`} onClick={() => toggle('autoApproveHighScore')} />
          </div>
          <div className={inner.settingsRow}>
            <div className={inner.settingsInfo}>
              <span className={inner.settingsLabel}>Require Manual Review</span>
              <span className={inner.settingsDesc}>All applications require manual admin review before approval</span>
            </div>
            <button className={`${inner.toggle} ${settings.requireManualReview ? inner.toggleActive : ''}`} onClick={() => toggle('requireManualReview')} />
          </div>
          <div className={inner.settingsRow}>
            <div className={inner.settingsInfo}>
              <span className={inner.settingsLabel}>Default Credit Limit</span>
              <span className={inner.settingsDesc}>Starting limit for approved applicants</span>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-text-primary)' }}>$500.00</span>
          </div>
          <div className={inner.settingsRow}>
            <div className={inner.settingsInfo}>
              <span className={inner.settingsLabel}>Default APR</span>
              <span className={inner.settingsDesc}>Annual percentage rate for new cards</span>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-text-primary)' }}>22.9%</span>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className={inner.panel}>
        <div className={inner.panelHeader}>
          <h2>Admin Notifications</h2>
        </div>
        <div className={inner.settingsGroup}>
          <div className={inner.settingsRow}>
            <div className={inner.settingsInfo}>
              <span className={inner.settingsLabel}>Email Notifications</span>
              <span className={inner.settingsDesc}>Receive email alerts for new applications and flagged transactions</span>
            </div>
            <button className={`${inner.toggle} ${settings.emailNotifications ? inner.toggleActive : ''}`} onClick={() => toggle('emailNotifications')} />
          </div>
          <div className={inner.settingsRow}>
            <div className={inner.settingsInfo}>
              <span className={inner.settingsLabel}>Slack Alerts</span>
              <span className={inner.settingsDesc}>Post alerts to a Slack channel</span>
            </div>
            <button className={`${inner.toggle} ${settings.slackAlerts ? inner.toggleActive : ''}`} onClick={() => toggle('slackAlerts')} />
          </div>
        </div>
      </div>

      {/* Integration Keys */}
      <div className={inner.panel}>
        <div className={inner.panelHeader}>
          <h2>Integrations</h2>
        </div>
        <div className={inner.settingsGroup}>
          <div className={inner.settingsRow}>
            <div className={inner.settingsInfo}>
              <span className={inner.settingsLabel}>Supabase</span>
              <span className={inner.settingsDesc}>Database and authentication</span>
            </div>
            <span style={{
              fontSize: 'var(--text-xs)', fontWeight: 600, padding: '3px 10px', borderRadius: 'var(--radius-full)',
              background: 'rgba(0,214,143,0.1)', color: 'var(--color-success)',
            }}>Connected</span>
          </div>
          <div className={inner.settingsRow}>
            <div className={inner.settingsInfo}>
              <span className={inner.settingsLabel}>Lithic</span>
              <span className={inner.settingsDesc}>Card issuing and transaction processing</span>
            </div>
            <span style={{
              fontSize: 'var(--text-xs)', fontWeight: 600, padding: '3px 10px', borderRadius: 'var(--radius-full)',
              background: 'rgba(245,197,66,0.1)', color: 'var(--color-gold)',
            }}>Sandbox</span>
          </div>
          <div className={inner.settingsRow}>
            <div className={inner.settingsInfo}>
              <span className={inner.settingsLabel}>Equifax Canada</span>
              <span className={inner.settingsDesc}>Credit bureau reporting</span>
            </div>
            <span style={{
              fontSize: 'var(--text-xs)', fontWeight: 600, padding: '3px 10px', borderRadius: 'var(--radius-full)',
              background: 'rgba(99,102,241,0.1)', color: 'var(--color-info)',
            }}>Pending</span>
          </div>
          <div className={inner.settingsRow}>
            <div className={inner.settingsInfo}>
              <span className={inner.settingsLabel}>TransUnion Canada</span>
              <span className={inner.settingsDesc}>Credit bureau reporting</span>
            </div>
            <span style={{
              fontSize: 'var(--text-xs)', fontWeight: 600, padding: '3px 10px', borderRadius: 'var(--radius-full)',
              background: 'rgba(99,102,241,0.1)', color: 'var(--color-info)',
            }}>Pending</span>
          </div>
        </div>
      </div>

      {/* System */}
      <div className={inner.panel} style={{ borderColor: settings.maintenanceMode ? 'rgba(239,68,68,0.3)' : undefined }}>
        <div className={inner.panelHeader}>
          <h2>System</h2>
        </div>
        <div className={inner.settingsGroup}>
          <div className={inner.settingsRow}>
            <div className={inner.settingsInfo}>
              <span className={inner.settingsLabel} style={{ color: settings.maintenanceMode ? 'var(--color-error)' : undefined }}>Maintenance Mode</span>
              <span className={inner.settingsDesc}>Disable new registrations and card transactions</span>
            </div>
            <button className={`${inner.toggle} ${settings.maintenanceMode ? inner.toggleActive : ''}`}
              onClick={() => toggle('maintenanceMode')}
              style={settings.maintenanceMode ? { background: 'var(--color-error)' } : {}} />
          </div>
          <div className={inner.settingsRow}>
            <div className={inner.settingsInfo}>
              <span className={inner.settingsLabel}>Version</span>
              <span className={inner.settingsDesc}>LivingCard Platform</span>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)' }}>v1.0.0-beta</span>
          </div>
        </div>
      </div>
    </div>
  );
}
