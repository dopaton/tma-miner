import React from 'react';
import type { User } from '../types';
import './Energy.css';

interface EnergyProps {
  user: User;
  energyPercentage: number;
}

const Energy: React.FC<EnergyProps> = ({ user, energyPercentage }) => {
  return (
    <div className="energy">
      <div className="energy-header">
        <h2>Energy Status</h2>
        <div className="energy-value">
          ⚡ {Math.floor(user.energy)} / {user.maxEnergy}
        </div>
      </div>

      <div className="energy-bar-container">
        <div 
          className="energy-bar-fill" 
          style={{ width: `${energyPercentage}%` }}
        />
      </div>

      <div className="energy-info">
        <div className="info-item">
          <span className="info-icon">🔋</span>
          <div className="info-text">
            <div className="info-title">Energy regenerates over time</div>
            <div className="info-description">+1 energy per minute</div>
          </div>
        </div>
        <div className="info-item">
          <span className="info-icon">💫</span>
          <div className="info-text">
            <div className="info-title">Use energy for special actions</div>
            <div className="info-description">Claim bonuses, speed boosts, and more</div>
          </div>
        </div>
      </div>

      <div className="energy-stats">
        <div className="stat-box">
          <div className="stat-label">Regeneration Rate</div>
          <div className="stat-value">1/min</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">Current Level</div>
          <div className="stat-value">{energyPercentage.toFixed(0)}%</div>
        </div>
      </div>
    </div>
  );
};

export default Energy;
