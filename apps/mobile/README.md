# OphtaConnect Mobile

Application mobile React Native Expo pour iOS et Android.

## Prérequis

- Node.js >= 20.0.0
- Expo CLI
- iOS Simulator (Mac) ou Android Emulator

## Installation

```bash
cd apps/mobile
npm install
```

## Développement

```bash
# Démarrer Expo
npm start

# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## Structure

```
app/
├── _layout.tsx          # Root layout
├── auth/
│   └── login.tsx        # Login screen
└── tabs/
    ├── _layout.tsx      # Tab navigation
    ├── dashboard.tsx    # Dashboard
    ├── adressages.tsx   # Adressages list
    ├── annuaire.tsx     # Médecins directory
    └── profil.tsx       # User profile
```

## Build

```bash
# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android
```

## Notes

- Utilise Expo Router pour la navigation
- Design system cohérent avec l'app web
- API client partagé depuis le package shared
