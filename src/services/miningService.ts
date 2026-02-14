import type { Equipment, MiningRate } from '../types';
import { MINING_RATES, REFERRAL_MINING_BONUS } from '../models/constants';

export class MiningService {
  private static instance: MiningService;

  private constructor() {}

  static getInstance(): MiningService {
    if (!MiningService.instance) {
      MiningService.instance = new MiningService();
    }
    return MiningService.instance;
  }

  calculateMiningRate(equipment: Equipment, referralCount: number = 0): MiningRate {
    const fromGPU = equipment.gpu * MINING_RATES.GPU;
    const fromASIC = equipment.asic * MINING_RATES.ASIC;
    const fromFarm = equipment.farm * MINING_RATES.FARM;
    const base = MINING_RATES.BASE;
    
    // Add referral bonus
    const referralBonus = referralCount * REFERRAL_MINING_BONUS;
    const total = (base + fromGPU + fromASIC + fromFarm) * (1 + referralBonus);

    return {
      base,
      fromGPU,
      fromASIC,
      fromFarm,
      total,
    };
  }

  calculateOfflineEarnings(
    equipment: Equipment,
    referralCount: number,
    lastMiningTime: number,
    currentTime: number
  ): number {
    const miningRate = this.calculateMiningRate(equipment, referralCount);
    const timeElapsedInSeconds = (currentTime - lastMiningTime) / 1000;
    
    // Cap offline earnings at 8 hours
    const maxOfflineTime = 8 * 60 * 60; // 8 hours in seconds
    const cappedTime = Math.min(timeElapsedInSeconds, maxOfflineTime);
    
    return miningRate.total * cappedTime;
  }

  calculateMiningForPeriod(
    equipment: Equipment,
    referralCount: number,
    durationInSeconds: number
  ): number {
    const miningRate = this.calculateMiningRate(equipment, referralCount);
    return miningRate.total * durationInSeconds;
  }
}

export const miningService = MiningService.getInstance();
