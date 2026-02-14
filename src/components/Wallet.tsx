import React from 'react';
import { TonConnectButton } from '@tonconnect/ui-react';
import type { User } from '../types';
import { formatNumber } from '../utils/helpers';
import './Wallet.css';

interface WalletProps {
  user: User;
}

const Wallet: React.FC<WalletProps> = ({ user }) => {
  return (
    <div className="wallet">
      <div className="wallet-header">
        <h2>Wallet</h2>
      </div>

      <div className="wallet-connect">
        <TonConnectButton />
      </div>

      <div className="wallet-info">
        <div className="info-card">
          <div className="info-icon">💎</div>
          <div className="info-content">
            <div className="info-label">Current Balance</div>
            <div className="info-value">{formatNumber(user.balance)}</div>
          </div>
        </div>

        <div className="info-card">
          <div className="info-icon">📊</div>
          <div className="info-content">
            <div className="info-label">Total Mined</div>
            <div className="info-value">{formatNumber(user.totalMined)}</div>
          </div>
        </div>

        <div className="info-card">
          <div className="info-icon">👥</div>
          <div className="info-content">
            <div className="info-label">Referrals</div>
            <div className="info-value">{user.referrals.length}</div>
          </div>
        </div>
      </div>

      <div className="wallet-features">
        <h3>Coming Soon</h3>
        <div className="feature-list">
          <div className="feature-item">
            <span className="feature-icon">💸</span>
            <div className="feature-text">
              <div className="feature-title">Withdraw to TON</div>
              <div className="feature-description">
                Convert your mined coins to TON cryptocurrency
              </div>
            </div>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🔄</span>
            <div className="feature-text">
              <div className="feature-title">Exchange</div>
              <div className="feature-description">
                Trade with other miners in the marketplace
              </div>
            </div>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🎁</span>
            <div className="feature-text">
              <div className="feature-title">NFT Rewards</div>
              <div className="feature-description">
                Earn exclusive NFTs for top miners
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
