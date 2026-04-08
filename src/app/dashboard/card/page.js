'use client';

import { useState } from 'react';
import VirtualCard from '@/components/VirtualCard';
import inner from '../inner.module.css';

const SPENDING_CONTROLS = [
  { name: 'Groceries', icon: '🛒', enabled: true },
  { name: 'Pharmacy', icon: '💊', enabled: true },
  { name: 'Transit', icon: '🚇', enabled: true },
  { name: 'Utilities', icon: '⚡', enabled: true },
  { name: 'Gas Stations', icon: '⛽', enabled: true },
  { name: 'Childcare', icon: '👶', enabled: true },
  { name: 'Medical', icon: '🏥', enabled: true },
  { name: 'Telecom', icon: '📱', enabled: true },
];

export default function CardPage() {
  const [cardLocked, setCardLocked] = useState(false);
  const [controls, setControls] = useState(SPENDING_CONTROLS);

  const toggleControl = (idx) => {
    setControls((prev) => prev.map((c, i) => i === idx ? { ...c, enabled: !c.enabled } : c));
  };

  const handleLockToggle = async () => {
    setCardLocked(!cardLocked);
    // In production: POST /api/cards/lock
  };

  return (
    <div className={inner.innerPage}>
      <div className={inner.pageHeader}>
        <div>
          <h1>Card Management</h1>
          <p>Manage your virtual card settings and spending controls</p>
        </div>
      </div>

      <div className={inner.gridTwo}>
        {/* Card Display */}
        <div className={inner.panel}>
          <div className={inner.panelHeader}>
            <h2>Your Card</h2>
            <span style={{
              fontSize: 'var(--text-xs)',
              fontWeight: 600,
              padding: '3px 10px',
              borderRadius: 'var(--radius-full)',
              background: cardLocked ? 'rgba(239, 68, 68, 0.1)' : 'rgba(0, 214, 143, 0.1)',
              color: cardLocked ? 'var(--color-error)' : 'var(--color-success)',
            }}>
              {cardLocked ? '🔒 Locked' : '✓ Active'}
            </span>
          </div>
          <div className={inner.panelBody} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-5)' }}>
            <div style={{ transform: 'scale(0.9)', transformOrigin: 'center', opacity: cardLocked ? 0.5 : 1, transition: 'opacity 0.3s' }}>
              <VirtualCard />
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
              <button className={`btn ${cardLocked ? 'btn-primary' : 'btn-secondary'}`} onClick={handleLockToggle} style={cardLocked ? { background: 'var(--color-error)', borderColor: 'var(--color-error)' } : {}}>
                {cardLocked ? '🔓 Unlock Card' : '🔒 Lock Card'}
              </button>
            </div>
          </div>
        </div>

        {/* Card Details */}
        <div className={inner.panel}>
          <div className={inner.panelHeader}>
            <h2>Card Details</h2>
          </div>
          <div className={inner.settingsGroup}>
            <div className={inner.settingsRow}>
              <div className={inner.settingsInfo}>
                <span className={inner.settingsLabel}>Card Number</span>
                <span className={inner.settingsDesc}>Virtual Mastercard</span>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)' }}>
                •••• •••• •••• 4821
              </span>
            </div>
            <div className={inner.settingsRow}>
              <div className={inner.settingsInfo}>
                <span className={inner.settingsLabel}>Expiry</span>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)' }}>09/28</span>
            </div>
            <div className={inner.settingsRow}>
              <div className={inner.settingsInfo}>
                <span className={inner.settingsLabel}>CVV</span>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)' }}>•••</span>
            </div>
            <div className={inner.settingsRow}>
              <div className={inner.settingsInfo}>
                <span className={inner.settingsLabel}>Credit Limit</span>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-text-primary)' }}>$500.00</span>
            </div>
            <div className={inner.settingsRow}>
              <div className={inner.settingsInfo}>
                <span className={inner.settingsLabel}>APR</span>
              </div>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)' }}>22.9%</span>
            </div>
            <div className={inner.settingsRow}>
              <div className={inner.settingsInfo}>
                <span className={inner.settingsLabel}>Monthly Fee</span>
              </div>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)' }}>$5.00</span>
            </div>
          </div>
        </div>
      </div>

      {/* Spending Controls */}
      <div className={inner.panel}>
        <div className={inner.panelHeader}>
          <h2>Spending Controls</h2>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)' }}>
            {controls.filter((c) => c.enabled).length} of {controls.length} categories enabled
          </span>
        </div>
        <div className={inner.panelBody}>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-5)' }}>
            Your card can only be used at these merchant categories. Toggle categories on or off to control where your card works.
          </p>
          <div className={inner.controlsGrid}>
            {controls.map((ctrl, i) => (
              <button key={ctrl.name} className={`${inner.controlItem} ${ctrl.enabled ? inner.controlItemActive : ''}`} onClick={() => toggleControl(i)} style={{ cursor: 'pointer' }}>
                <span className={inner.controlIcon}>{ctrl.icon}</span>
                <span className={inner.controlName}>{ctrl.name}</span>
                <span className={inner.controlStatus} style={{ color: ctrl.enabled ? 'var(--color-success)' : 'var(--color-text-tertiary)' }}>
                  {ctrl.enabled ? 'Enabled' : 'Disabled'}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Digital Wallet */}
      <div className={inner.panel}>
        <div className={inner.panelHeader}>
          <h2>Digital Wallets</h2>
        </div>
        <div className={inner.settingsGroup}>
          <div className={inner.settingsRow}>
            <div className={inner.settingsInfo}>
              <span className={inner.settingsLabel}>Apple Pay</span>
              <span className={inner.settingsDesc}>Use your LivingCard with Apple Pay for contactless payments</span>
            </div>
            <button className="btn btn-secondary btn-sm">Add to Wallet</button>
          </div>
          <div className={inner.settingsRow}>
            <div className={inner.settingsInfo}>
              <span className={inner.settingsLabel}>Google Pay</span>
              <span className={inner.settingsDesc}>Use your LivingCard with Google Pay for tap-to-pay</span>
            </div>
            <button className="btn btn-secondary btn-sm">Add to Wallet</button>
          </div>
        </div>
      </div>
    </div>
  );
}
