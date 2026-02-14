import { useEffect, useState } from 'react';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import type { User, Equipment } from './types';
import { storageService } from './services';
import { useMining, useEquipment, useEnergy } from './hooks';
import MiningFarm from './components/MiningFarm';
import Shop from './components/Shop';
import Energy from './components/Energy';
import Wallet from './components/Wallet';
import Leaderboard from './components/Leaderboard';
import Referral from './components/Referral';
import Navigation from './components/Navigation';
import './App.css';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentTab, setCurrentTab] = useState('mine');
  const [isDark, setIsDark] = useState(false);

  // Initialize user
  useEffect(() => {
    const initUser = () => {
      // Try to get Telegram WebApp data
      const tg = window.Telegram?.WebApp;
      
      // Use Telegram user ID if available, otherwise use a demo ID
      const userId = tg?.initDataUnsafe?.user?.id?.toString() || 'demo_user';
      const username = tg?.initDataUnsafe?.user?.username || tg?.initDataUnsafe?.user?.first_name;
      
      // Check for referral code in start param
      const startParam = tg?.initDataUnsafe?.start_param;
      let referredBy: string | undefined;
      
      if (startParam) {
        try {
          referredBy = atob(startParam);
        } catch {
          console.error('Invalid referral code');
        }
      }

      let userData = storageService.getUserData(userId);
      
      if (!userData) {
        userData = storageService.createNewUser(userId, username, referredBy);
        
        // If user was referred, add to referrer's list
        if (referredBy) {
          const referrer = storageService.getUserData(referredBy);
          if (referrer && !referrer.referrals.includes(userId)) {
            referrer.referrals.push(userId);
            referrer.balance += 50; // Referral bonus
            storageService.saveUserData(referrer);
          }
        }
      }
      
      setUser(userData);

      // Setup Telegram theme
      if (tg) {
        tg.ready();
        tg.expand?.();
        setIsDark(tg.colorScheme === 'dark');
        
        // Apply theme colors
        document.documentElement.style.setProperty('--tg-theme-bg-color', tg.themeParams?.bg_color || '#ffffff');
        document.documentElement.style.setProperty('--tg-theme-text-color', tg.themeParams?.text_color || '#000000');
        document.documentElement.style.setProperty('--tg-theme-hint-color', tg.themeParams?.hint_color || '#999999');
        document.documentElement.style.setProperty('--tg-theme-button-color', tg.themeParams?.button_color || '#007bff');
        document.documentElement.style.setProperty('--tg-theme-button-text-color', tg.themeParams?.button_text_color || '#ffffff');
        document.documentElement.style.setProperty('--tg-theme-secondary-bg-color', tg.themeParams?.secondary_bg_color || '#f0f0f0');
      }
    };

    initUser();
  }, []);

  // Setup back button
  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (!tg) return;

    if (currentTab !== 'mine') {
      tg.BackButton?.show();
      const handleBack = () => setCurrentTab('mine');
      tg.BackButton?.onClick(handleBack);
      return () => {
        tg.BackButton?.offClick(handleBack);
      };
    } else {
      tg.BackButton?.hide();
    }
  }, [currentTab]);

  // Setup main button for shop
  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (!tg) return;

    if (currentTab === 'mine') {
      tg.MainButton?.setParams({
        text: 'Open Shop',
        is_visible: true,
        is_enabled: true,
      });
      
      const handleMainButton = () => setCurrentTab('shop');
      tg.MainButton?.onClick(handleMainButton);
      
      return () => {
        tg.MainButton?.offClick(handleMainButton);
      };
    } else {
      tg.MainButton?.hide();
    }
  }, [currentTab]);

  // Custom hooks
  const { miningRate, offlineEarnings, claimOfflineEarnings } = useMining(user, setUser);
  const { upgradeEquipment, getUpgradeCosts, canAffordUpgrade } = useEquipment(user, setUser);
  const { energyPercentage } = useEnergy(user, setUser);

  const handleUpgrade = (equipmentType: keyof Equipment) => {
    const success = upgradeEquipment(equipmentType);
    const tg = window.Telegram?.WebApp;
    if (success) {
      // Haptic feedback on successful upgrade
      try {
        tg?.HapticFeedback?.notificationOccurred('success');
      } catch {
        console.log('Haptic feedback not available');
      }
    } else {
      try {
        tg?.HapticFeedback?.notificationOccurred('error');
      } catch {
        console.log('Haptic feedback not available');
      }
    }
  };

  const handleClaimOffline = () => {
    claimOfflineEarnings();
    const tg = window.Telegram?.WebApp;
    try {
      tg?.HapticFeedback?.notificationOccurred('success');
    } catch {
      console.log('Haptic feedback not available');
    }
  };

  if (!user) {
    return (
      <div className="loading">
        <div className="loading-spinner">⛏️</div>
        <p>Loading TON Miner...</p>
      </div>
    );
  }

  return (
    <TonConnectUIProvider manifestUrl="https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json">
      <div className={`app ${isDark ? 'dark' : 'light'}`}>
        <div className="app-content">
          {currentTab === 'mine' && (
            <MiningFarm
              user={user}
              miningRate={miningRate}
              offlineEarnings={offlineEarnings}
              onClaimOffline={handleClaimOffline}
            />
          )}
          {currentTab === 'shop' && (
            <Shop
              user={user}
              onUpgrade={handleUpgrade}
              upgradeCosts={getUpgradeCosts()}
              canAfford={canAffordUpgrade}
            />
          )}
          {currentTab === 'energy' && (
            <Energy user={user} energyPercentage={energyPercentage} />
          )}
          {currentTab === 'wallet' && <Wallet user={user} />}
          {currentTab === 'leaderboard' && <Leaderboard currentUserId={user.id} />}
          {currentTab === 'referral' && <Referral user={user} />}
        </div>
        <Navigation currentTab={currentTab} onTabChange={setCurrentTab} />
      </div>
    </TonConnectUIProvider>
  );
}

export default App;
