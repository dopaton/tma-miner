import React, { useState } from 'react';
import type { User } from '../types';
import { generateReferralCode } from '../utils/helpers';
import { REFERRAL_BONUS } from '../models/constants';
import './Referral.css';

interface ReferralProps {
  user: User;
}

const Referral: React.FC<ReferralProps> = ({ user }) => {
  const [copied, setCopied] = useState(false);
  const referralCode = generateReferralCode(user.id);
  const referralLink = `https://t.me/your_bot?start=${referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="referral">
      <div className="referral-header">
        <h2>Referral Program</h2>
      </div>

      <div className="referral-stats">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <div className="stat-label">Total Referrals</div>
            <div className="stat-value">{user.referrals.length}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🎁</div>
          <div className="stat-content">
            <div className="stat-label">Bonus per Referral</div>
            <div className="stat-value">
              <span className="coin-icon-small">💎</span>
              {REFERRAL_BONUS}
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <div className="stat-label">Mining Bonus</div>
            <div className="stat-value">+{user.referrals.length * 5}%</div>
          </div>
        </div>
      </div>

      <div className="referral-benefits">
        <h3>Benefits</h3>
        <div className="benefit-list">
          <div className="benefit-item">
            <span className="benefit-icon">💰</span>
            <p>Get {REFERRAL_BONUS} coins for each friend who joins</p>
          </div>
          <div className="benefit-item">
            <span className="benefit-icon">⚡</span>
            <p>Earn +5% mining rate bonus per referral</p>
          </div>
          <div className="benefit-item">
            <span className="benefit-icon">🚀</span>
            <p>Help your friends start mining with bonus coins</p>
          </div>
        </div>
      </div>

      <div className="referral-link-section">
        <h3>Your Referral Link</h3>
        <div className="link-container">
          <input
            type="text"
            value={referralLink}
            readOnly
            className="link-input"
          />
          <button className="copy-button" onClick={handleCopy}>
            {copied ? '✓ Copied' : '📋 Copy'}
          </button>
        </div>
        <p className="link-description">
          Share this link with friends to earn rewards!
        </p>
      </div>

      {user.referrals.length > 0 && (
        <div className="referral-list">
          <h3>Your Referrals ({user.referrals.length})</h3>
          <div className="referral-items">
            {user.referrals.map((referralId) => (
              <div key={referralId} className="referral-item">
                <span className="referral-icon">👤</span>
                <span className="referral-name">User {referralId.substring(0, 8)}</span>
                <span className="referral-badge">+{REFERRAL_BONUS} 💎</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Referral;
