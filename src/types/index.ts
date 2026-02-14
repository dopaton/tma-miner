export interface Equipment {
  gpu: number;
  asic: number;
  farm: number;
}

export interface User {
  id: string;
  username?: string;
  balance: number;
  equipment: Equipment;
  energy: number;
  maxEnergy: number;
  lastMiningTime: number;
  totalMined: number;
  referrals: string[];
  referredBy?: string;
}

export interface EquipmentCost {
  gpu: number;
  asic: number;
  farm: number;
}

export interface MiningRate {
  base: number;
  fromGPU: number;
  fromASIC: number;
  fromFarm: number;
  total: number;
}

export interface ShopItem {
  id: string;
  name: string;
  type: keyof Equipment;
  cost: number;
  miningBoost: number;
  level: number;
}

export interface LeaderboardEntry {
  id: string;
  username?: string;
  totalMined: number;
  rank: number;
}
