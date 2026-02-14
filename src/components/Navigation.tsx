import React from 'react';
import './Navigation.css';

interface NavigationProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentTab, onTabChange }) => {
  const tabs = [
    { id: 'mine', label: 'Mine', icon: '⛏️' },
    { id: 'shop', label: 'Shop', icon: '🏪' },
    { id: 'energy', label: 'Energy', icon: '⚡' },
    { id: 'wallet', label: 'Wallet', icon: '💼' },
    { id: 'leaderboard', label: 'Rank', icon: '🏆' },
    { id: 'referral', label: 'Refer', icon: '👥' },
  ];

  return (
    <nav className="navigation">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`nav-button ${currentTab === tab.id ? 'active' : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          <span className="nav-icon">{tab.icon}</span>
          <span className="nav-label">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default Navigation;
