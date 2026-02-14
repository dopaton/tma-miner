import type { Equipment, EquipmentCost } from '../types';

// Mining rates per second for each equipment level
export const MINING_RATES = {
  BASE: 0.01, // Base mining rate per second
  GPU: 0.05, // Per GPU level
  ASIC: 0.15, // Per ASIC level
  FARM: 0.5, // Per Farm level
};

// Equipment upgrade costs (exponential growth)
export const EQUIPMENT_BASE_COSTS: EquipmentCost = {
  gpu: 10,
  asic: 100,
  farm: 1000,
};

// Cost multiplier for each level
export const COST_MULTIPLIER = 1.5;

// Energy system
export const MAX_ENERGY = 100;
export const ENERGY_REGEN_RATE = 1; // Energy points per minute
export const ENERGY_COST_PER_CLAIM = 10;

// Referral rewards
export const REFERRAL_BONUS = 50; // Bonus coins for referring someone
export const REFERRAL_MINING_BONUS = 0.05; // 5% bonus to mining rate per referral

// Initial user state
export const INITIAL_EQUIPMENT: Equipment = {
  gpu: 0,
  asic: 0,
  farm: 0,
};

export const INITIAL_BALANCE = 0;
export const INITIAL_ENERGY = MAX_ENERGY;

// Storage keys
export const STORAGE_KEYS = {
  USER_DATA: 'ton_miner_user_data',
  LEADERBOARD: 'ton_miner_leaderboard',
};
