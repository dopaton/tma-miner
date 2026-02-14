import { useCallback } from 'react';
import type { User, Equipment } from '../types';
import { equipmentService, storageService } from '../services';

export const useEquipment = (user: User | null, setUser: (user: User) => void) => {
  const upgradeEquipment = useCallback((equipmentType: keyof Equipment) => {
    if (!user) return false;

    const cost = equipmentService.getUpgradeCost(equipmentType, user.equipment[equipmentType]);
    
    if (user.balance < cost) {
      return false;
    }

    const updatedEquipment = equipmentService.upgradeEquipment(user.equipment, equipmentType);
    const updatedUser: User = {
      ...user,
      balance: user.balance - cost,
      equipment: updatedEquipment,
    };

    setUser(updatedUser);
    storageService.saveUserData(updatedUser);
    
    return true;
  }, [user, setUser]);

  const getUpgradeCosts = useCallback(() => {
    if (!user) return null;
    return equipmentService.getAllUpgradeCosts(user.equipment);
  }, [user]);

  const canAffordUpgrade = useCallback((equipmentType: keyof Equipment) => {
    if (!user) return false;
    return equipmentService.canAffordUpgrade(
      user.balance,
      equipmentType,
      user.equipment[equipmentType]
    );
  }, [user]);

  return {
    upgradeEquipment,
    getUpgradeCosts,
    canAffordUpgrade,
  };
};
