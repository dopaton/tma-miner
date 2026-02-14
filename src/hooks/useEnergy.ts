import { useCallback, useMemo } from 'react';
import type { User } from '../types';
import { storageService } from '../services';
import { ENERGY_COST_PER_CLAIM } from '../models/constants';

export const useEnergy = (user: User | null, setUser: (user: User) => void) => {
  // Use useMemo for derived state instead of useEffect
  const energyPercentage = useMemo(() => {
    return user ? (user.energy / user.maxEnergy) * 100 : 100;
  }, [user]);

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
  }, [user]);

  return {
    energyPercentage,
    consumeEnergy,
    hasEnoughEnergy,
  };
};
