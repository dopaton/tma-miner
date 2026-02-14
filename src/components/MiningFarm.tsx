import React from 'react';
import type { User } from '../types';
import { formatNumber } from '../utils/helpers';
import './MiningFarm.css';

interface MiningFarmProps {
  user: User;
  miningRate: number;
  offlineEarnings: number;
  onClaimOffline: () => void;
}

const MiningFarm: React.FC<MiningFarmProps> = ({
  user,
  miningRate,
  offlineEarnings,
  onClaimOffline,
}) => {
  return (
    <div className="mining-farm">
      <div className="balance-section">
        <h1 className="balance-title">Your Balance</h1>
        <div className="balance-amount">
          <span className="coin-icon">💎</span>
          <span>{formatNumber(user.balance)}</span>
        </div>
      </div>

      <div className="mining-info">
        <div className="mining-rate">
          <div className="label">Mining Rate</div>
          <div className="value">
            <span className="coin-icon-small">💎</span>
            {formatNumber(miningRate * 3600)}/hour
          </div>
        </div>

        <div className="equipment-summary">
          <div className="equipment-item">
            <span className="equipment-icon">🖥️</span>
            <span className="equipment-name">GPU</span>
            <span className="equipment-level">Level {user.equipment.gpu}</span>
          </div>
          <div className="equipment-item">
            <span className="equipment-icon">⚡</span>
            <span className="equipment-name">ASIC</span>
            <span className="equipment-level">Level {user.equipment.asic}</span>
          </div>
          <div className="equipment-item">
            <span className="equipment-icon">🏭</span>
            <span className="equipment-name">Farm</span>
            <span className="equipment-level">Level {user.equipment.farm}</span>
          </div>
        </div>
      </div>

      {offlineEarnings > 0 && (
        <div className="offline-earnings">
          <div className="offline-message">
            <span className="offline-icon">🎁</span>
            <div>
              <div className="offline-title">Welcome Back!</div>
              <div className="offline-amount">
                You earned <span className="coin-icon-small">💎</span>
                {formatNumber(offlineEarnings)} while offline
              </div>
            </div>
          </div>
          <button className="claim-button" onClick={onClaimOffline}>
            Claim Rewards
          </button>
        </div>
      )}

      <div className="stats-section">
        <div className="stat-item">
          <div className="stat-label">Total Mined</div>
          <div className="stat-value">
            <span className="coin-icon-small">💎</span>
            {formatNumber(user.totalMined)}
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Referrals</div>
          <div className="stat-value">👥 {user.referrals.length}</div>
        </div>
      </div>
    </div>
  );
};

export default MiningFarm;
