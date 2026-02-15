# OphtaConnect

Plateforme sécurisée d'adressage ophtalmologique — Réseau de praticiens, prise de RDV, partage de dossiers.

## 🚀 Stack technique

- **Web** : React + Vite + TailwindCSS
- **Mobile** : React Native Expo (iOS + Android)
- **Backend** : Node.js + Express + Prisma + PostgreSQL
- **Extension Chrome** : Manifest V3
- **Sécurité** : Conforme HDS (Hébergement de Données de Santé)

## 📦 Architecture Monorepo

Ce projet utilise une architecture monorepo avec Turborepo :

```
ophta-connect/
├── apps/
│   ├── api/                 # Backend Node.js + Express + Prisma
│   ├── web/                 # Frontend React + Vite + TailwindCSS
│   ├── mobile/              # App mobile React Native Expo
│   └── chrome-extension/    # Extension Chrome Manifest V3
├── packages/
│   └── shared/              # Types TypeScript partagés
└── prisma/
    └── schema.prisma        # Schéma de base de données
```

## 🏃 Démarrage rapide

### Prérequis

- Node.js >= 20.0.0
- npm >= 10.0.0
- PostgreSQL >= 14

### Installation

```bash
# Cloner le repository
git clone https://github.com/bosswood985/ophta-connect.git
cd ophta-connect

# Installer les dépendances
npm install

# Configuration
cp .env.example .env
# Éditer .env avec vos paramètres

# Base de données
cd apps/api
npm run prisma:migrate

# Lancer en développement
npm run dev  # Lance toutes les apps
```

### Applications individuelles

```bash
# API Backend (port 3001)
cd apps/api && npm run dev

# Frontend Web (port 5173)
cd apps/web && npm run dev

# Application Mobile
cd apps/mobile && npm start
```

## 🎨 Design System

Design professionnel et médical inspiré de Notion, Linear et Stripe :

- **Palette** : Tons neutres, blanc cassé (#FAFAFA), gris doux, accent bleu médical (#2563EB)
- **Typographie** : Inter, hiérarchie claire
- **Composants** : Cards avec bordures subtiles, hover states discrets, coins arrondis

## 🔒 Sécurité

- Authentification JWT avec tokens d'accès et de rafraîchissement
- Hachage bcrypt des mots de passe (12 rounds)
- Rate limiting et protection anti-brute force
- Validation stricte des entrées avec Zod
- Audit logs complets pour la traçabilité
- Headers de sécurité avec Helmet.js
- CORS configuré strictement

## 📚 Documentation

- [Documentation complète](docs/README.md)
- [Conformité HDS](docs/HDS-COMPLIANCE.md)

## 🛠️ Développement

```bash
# Linting
npm run lint

# Build
npm run build

# Tests
npm run test

# Clean
npm run clean
```

## 📱 Applications

### Backend API
Routes principales : `/api/auth`, `/api/medecins`, `/api/patients`, `/api/adressages`, `/api/motifs`

### Frontend Web
Interface web complète avec authentification, dashboard, gestion des adressages, annuaire.

### Mobile App
Application native iOS/Android avec Expo Router pour la navigation.

### Chrome Extension
Extension pour créer des adressages rapidement depuis n'importe quelle page web via menu contextuel.

## 🤝 Contribution

Voir [CONTRIBUTING.md](docs/CONTRIBUTING.md) pour les guidelines de contribution.

## 📄 Licence

Projet privé et confidentiel - Tous droits réservés