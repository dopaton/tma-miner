import type { User } from '../types';
import { INITIAL_EQUIPMENT, INITIAL_BALANCE, INITIAL_ENERGY, MAX_ENERGY, STORAGE_KEYS } from '../models/constants';

export class StorageService {
  private static instance: StorageService;

  private constructor() {}

  static getInstance(): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }
    return StorageService.instance;
  }

  getUserData(userId: string): User | null {
    try {
      const data = localStorage.getItem(`${STORAGE_KEYS.USER_DATA}_${userId}`);
      if (data) {
        return JSON.parse(data);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
    return null;
  }

  saveUserData(user: User): void {
    try {
      localStorage.setItem(`${STORAGE_KEYS.USER_DATA}_${user.id}`, JSON.stringify(user));
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  }

  createNewUser(userId: string, username?: string, referredBy?: string): User {
    const newUser: User = {
      id: userId,
      username,
      balance: INITIAL_BALANCE,
      equipment: { ...INITIAL_EQUIPMENT },
      energy: INITIAL_ENERGY,
      maxEnergy: MAX_ENERGY,
      lastMiningTime: Date.now(),
      totalMined: 0,
      referrals: [],
      referredBy,
    };
    this.saveUserData(newUser);
    return newUser;
  }

  getLeaderboard(): User[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.LEADERBOARD);
      if (data) {
        return JSON.parse(data);
      }
    } catch (error) {
      console.error('Error loading leaderboard:', error);
    }
    return [];
  }

  updateLeaderboard(user: User): void {
    try {
      let leaderboard = this.getLeaderboard();
      const existingIndex = leaderboard.findIndex(u => u.id === user.id);
      
      if (existingIndex >= 0) {
        leaderboard[existingIndex] = user;
      } else {
        leaderboard.push(user);
      }
      
      // Sort by total mined (descending) and keep top 100
      leaderboard = leaderboard
        .sort((a, b) => b.totalMined - a.totalMined)
        .slice(0, 100);
      
      localStorage.setItem(STORAGE_KEYS.LEADERBOARD, JSON.stringify(leaderboard));
    } catch (error) {
      console.error('Error updating leaderboard:', error);
    }
  }
}

export const storageService = StorageService.getInstance();
