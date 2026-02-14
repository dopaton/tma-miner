# TON Miner - Telegram Mini App

A Telegram Mini App idle mining game built with React, Vite, TypeScript, and TON Connect.

## Features

- 🎮 **Auto Idle Mining**: Continuous mining without tapping
- ⚙️ **Equipment Upgrades**: GPU, ASIC, and Farm levels
- ⚡ **Energy Management**: Energy regeneration system
- 💤 **Offline Earnings**: Earn while you're away (up to 8 hours)
- 🛍️ **Shop**: Purchase and upgrade mining equipment
- 💼 **Wallet**: TON Connect integration
- 👥 **Referral System**: Earn bonuses for inviting friends
- 🏆 **Leaderboard**: Compete with other miners
- 🎨 **Telegram Theme**: Fully integrated with Telegram's design system
- 📱 **Native Controls**: Uses mainButton, backButton, and hapticFeedback

## Project Structure

```
src/
├── components/        # React components
│   ├── MiningFarm.tsx    # Main mining view
│   ├── Shop.tsx          # Equipment shop
│   ├── Energy.tsx        # Energy management
│   ├── Wallet.tsx        # TON wallet integration
│   ├── Leaderboard.tsx   # Global rankings
│   ├── Referral.tsx      # Referral program
│   └── Navigation.tsx    # Bottom navigation
├── hooks/            # Custom React hooks
│   ├── useMining.ts      # Mining logic
│   ├── useEquipment.ts   # Equipment management
│   └── useEnergy.ts      # Energy system
├── services/         # Business logic
│   ├── storageService.ts    # Data persistence
│   ├── miningService.ts     # Mining calculations
│   └── equipmentService.ts  # Equipment upgrades
├── models/           # Data models and constants
│   └── constants.ts
├── types/            # TypeScript types
│   └── index.ts
└── utils/            # Helper functions
    └── helpers.ts
```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Game Mechanics

### Mining

- **Base Rate**: 0.01 coins/second
- **GPU**: +0.05 coins/second per level
- **ASIC**: +0.15 coins/second per level
- **Farm**: +0.5 coins/second per level

### Equipment Costs

Equipment costs increase exponentially:
- **GPU**: Base cost 10 coins, multiplied by 1.5^level
- **ASIC**: Base cost 100 coins, multiplied by 1.5^level
- **Farm**: Base cost 1000 coins, multiplied by 1.5^level

### Energy System

- **Max Energy**: 100 points
- **Regeneration**: 1 point per minute
- **Usage**: 10 points per claim action

### Referral Program

- **Referral Bonus**: 50 coins per invited friend
- **Mining Bonus**: +5% mining rate per referral

### Offline Earnings

Players earn coins while offline, up to 8 hours maximum.

## Technologies

- **React 19**: UI framework
- **Vite**: Build tool
- **TypeScript**: Type safety
- **TON Connect**: Wallet integration
- **Telegram WebApp API**: Native Telegram integration

## License

MIT
