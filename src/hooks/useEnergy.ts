import { useState, useEffect, useCallback } from 'react';
import type { User } from '../types';
import { storageService } from '../services';
import { ENERGY_COST_PER_CLAIM } from '../models/constants';

export const useEnergy = (user: User | null, setUser: (user: User) => void) => {
  const [energyPercentage, setEnergyPercentage] = useState(100);

  useEffect(() => {
    if (user) {
      setEnergyPercentage((user.energy / user.maxEnergy) * 100);
    }
  }, [user?.energy, user?.maxEnergy]);

  const consumeEnergy = useCallback((amount: number = ENERGY_COST_PER_CLAIM): boolean => {
    if (!user || user.energy < amount) {
      return false;
    }

    const updatedUser: User = {
      ...user,
      energy: user.energy - amount,
    };

    setUser(updatedUser);
    storageService.saveUserData(updatedUser);
    
    return true;
  }, [user, setUser]);

  const hasEnoughEnergy = useCallback((amount: number = ENERGY_COST_PER_CLAIM): boolean => {
    return user ? user.energy >= amount : false;
  }, [user?.energy]);

  return {
    energyPercentage,
    consumeEnergy,
    hasEnoughEnergy,
  };
};
