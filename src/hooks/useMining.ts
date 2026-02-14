import { useState, useEffect, useCallback, useMemo } from 'react';
import type { User } from '../types';
import { storageService, miningService } from '../services';
import { ENERGY_REGEN_RATE } from '../models/constants';

export const useMining = (user: User | null, setUser: (user: User) => void) => {
  // Calculate initial offline earnings once using useMemo
  const initialOfflineEarnings = useMemo(() => {
    if (!user) return 0;
    const currentTime = Date.now();
    return miningService.calculateOfflineEarnings(
      user.equipment,
      user.referrals.length,
      user.lastMiningTime,
      currentTime
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [offlineEarnings, setOfflineEarnings] = useState<number>(initialOfflineEarnings);

  // Calculate mining rate using useMemo instead of useEffect
  const miningRate = useMemo(() => {
    if (!user) return 0;
    const rate = miningService.calculateMiningRate(
      user.equipment,
      user.referrals.length
    );
    return rate.total;
  }, [user]);

  // Auto-mining ticker (updates every second)
  useEffect(() => {
    if (!user) return;

    const interval = setInterval(() => {
      const currentTime = Date.now();
      const earnings = miningService.calculateMiningForPeriod(
        user.equipment,
        user.referrals.length,
        1 // 1 second
      );

      const updatedUser: User = {
        ...user,
        balance: user.balance + earnings,
        totalMined: user.totalMined + earnings,
        lastMiningTime: currentTime,
      };

      setUser(updatedUser);
      storageService.saveUserData(updatedUser);
      storageService.updateLeaderboard(updatedUser);
    }, 1000);

    return () => clearInterval(interval);
  }, [user, setUser]);

  // Energy regeneration
  useEffect(() => {
    if (!user) return;

    const interval = setInterval(() => {
      if (user.energy < user.maxEnergy) {
        const updatedUser: User = {
          ...user,
          energy: Math.min(user.energy + ENERGY_REGEN_RATE / 60, user.maxEnergy),
        };
        setUser(updatedUser);
        storageService.saveUserData(updatedUser);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [user, setUser]);

  const claimOfflineEarnings = useCallback(() => {
    if (user && offlineEarnings > 0) {
      const updatedUser: User = {
        ...user,
        balance: user.balance + offlineEarnings,
        totalMined: user.totalMined + offlineEarnings,
      };
      setUser(updatedUser);
      storageService.saveUserData(updatedUser);
      storageService.updateLeaderboard(updatedUser);
      setOfflineEarnings(0);
    }
  }, [user, offlineEarnings, setUser]);

  return {
    miningRate,
    offlineEarnings,
    claimOfflineEarnings,
  };
};
