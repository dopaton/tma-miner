import React from 'react';
import type { User, Equipment } from '../types';
import { formatNumber } from '../utils/helpers';
import './Shop.css';

interface ShopProps {
  user: User;
  onUpgrade: (equipmentType: keyof Equipment) => void;
  upgradeCosts: { gpu: number; asic: number; farm: number } | null;
  canAfford: (equipmentType: keyof Equipment) => boolean;
}

const Shop: React.FC<ShopProps> = ({ user, onUpgrade, upgradeCosts, canAfford }) => {
  const equipmentItems = [
    {
      type: 'gpu' as keyof Equipment,
      name: 'GPU Miner',
      icon: '🖥️',
      description: 'Basic mining equipment',
      boost: '+0.18 💎/hour per level',
    },
    {
      type: 'asic' as keyof Equipment,
      name: 'ASIC Miner',
      icon: '⚡',
      description: 'Professional mining hardware',
      boost: '+0.54 💎/hour per level',
    },
    {
      type: 'farm' as keyof Equipment,
      name: 'Mining Farm',
      icon: '🏭',
      description: 'Industrial mining facility',
      boost: '+1.8 💎/hour per level',
    },
  ];

  return (
    <div className="shop">
      <div className="shop-header">
        <h2>Equipment Shop</h2>
        <div className="balance-display">
          <span className="coin-icon-small">💎</span>
          {formatNumber(user.balance)}
        </div>
      </div>

      <div className="shop-items">
        {equipmentItems.map((item) => {
          const currentLevel = user.equipment[item.type];
          const cost = upgradeCosts?.[item.type] || 0;
          const affordable = canAfford(item.type);

          return (
            <div key={item.type} className="shop-item">
              <div className="item-icon">{item.icon}</div>
              <div className="item-info">
                <div className="item-header">
                  <h3 className="item-name">{item.name}</h3>
                  <span className="item-level">Level {currentLevel}</span>
                </div>
                <p className="item-description">{item.description}</p>
                <p className="item-boost">{item.boost}</p>
              </div>
              <button
                className={`upgrade-button ${affordable ? 'affordable' : 'not-affordable'}`}
                onClick={() => onUpgrade(item.type)}
                disabled={!affordable}
              >
                <span className="upgrade-cost">
                  <span className="coin-icon-small">💎</span>
                  {formatNumber(cost)}
                </span>
                <span className="upgrade-text">Upgrade</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Shop;
