import type { Equipment, EquipmentCost } from '../types';
import { EQUIPMENT_BASE_COSTS, COST_MULTIPLIER } from '../models/constants';

export class EquipmentService {
  private static instance: EquipmentService;

  private constructor() {}

  static getInstance(): EquipmentService {
    if (!EquipmentService.instance) {
      EquipmentService.instance = new EquipmentService();
    }
    return EquipmentService.instance;
  }

  getUpgradeCost(equipmentType: keyof Equipment, currentLevel: number): number {
    const baseCost = EQUIPMENT_BASE_COSTS[equipmentType];
    return Math.floor(baseCost * Math.pow(COST_MULTIPLIER, currentLevel));
  }

  getAllUpgradeCosts(equipment: Equipment): EquipmentCost {
    return {
      gpu: this.getUpgradeCost('gpu', equipment.gpu),
      asic: this.getUpgradeCost('asic', equipment.asic),
      farm: this.getUpgradeCost('farm', equipment.farm),
    };
  }

  canAffordUpgrade(balance: number, equipmentType: keyof Equipment, currentLevel: number): boolean {
    const cost = this.getUpgradeCost(equipmentType, currentLevel);
    return balance >= cost;
  }

  upgradeEquipment(equipment: Equipment, equipmentType: keyof Equipment): Equipment {
    return {
      ...equipment,
      [equipmentType]: equipment[equipmentType] + 1,
    };
  }
}

export const equipmentService = EquipmentService.getInstance();
