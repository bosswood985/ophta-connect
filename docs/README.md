# OphtaConnect - Plateforme d'Adressage Ophtalmologique

Plateforme sécurisée complète pour faciliter la mise en réseau d'ophtalmologues, le partage de dossiers patients et la communication entre confrères, conforme aux exigences HDS (Hébergement de Données de Santé).

## 🏗️ Architecture Monorepo

Ce projet utilise une architecture monorepo avec npm workspaces et Turborepo pour gérer plusieurs applications interconnectées :

- **apps/api** - Backend API Node.js + Express + Prisma + PostgreSQL
- **apps/web** - Application web React + Vite + TailwindCSS
- **apps/mobile** - Application mobile React Native Expo (iOS + Android)
- **apps/chrome-extension** - Extension Chrome Manifest V3
- **packages/shared** - Types TypeScript et utilitaires partagés

## 🚀 Démarrage rapide

### Prérequis

- Node.js >= 20.0.0
- npm >= 10.0.0
- PostgreSQL >= 14

### Installation

1. Cloner le repository :
```bash
git clone https://github.com/bosswood985/ophta-connect.git
cd ophta-connect
```

2. Installer les dépendances :
```bash
npm install
```

3. Configuration de l'environnement :
```bash
cp .env.example .env
# Éditer .env avec vos valeurs
```

4. Configurer la base de données :
```bash
cd apps/api
npm run prisma:migrate
```

5. Lancer les applications en développement :
```bash
# Toutes les applications
npm run dev

# Ou individuellement
cd apps/api && npm run dev    # API sur port 3001
cd apps/web && npm run dev    # Web sur port 5173
```

## 📦 Structure du Projet

```
ophta-connect/
├── apps/
│   ├── api/                 # Backend API
│   │   ├── src/
│   │   │   ├── config/      # Configuration (DB, CORS, env)
│   │   │   ├── middleware/  # Auth, roles, audit, rate limiting
│   │   │   ├── routes/      # Routes API
│   │   │   ├── controllers/ # Contrôleurs
│   │   │   ├── services/    # Logique métier
│   │   │   ├── validators/  # Validation Zod
│   │   │   └── utils/       # Utilitaires (JWT, encryption)
│   │   └── package.json
│   │
│   ├── web/                 # Application web
│   │   ├── src/
│   │   │   ├── api/         # Clients API
│   │   │   ├── components/  # Composants React
│   │   │   ├── pages/       # Pages
│   │   │   ├── context/     # Context React
│   │   │   └── hooks/       # Hooks personnalisés
│   │   └── package.json
│   │
│   ├── mobile/              # App mobile (à venir)
│   └── chrome-extension/    # Extension Chrome (à venir)
│
├── packages/
│   └── shared/              # Types et constantes partagés
│       └── src/
│           ├── types/       # Types TypeScript
│           └── constants/   # Constantes
│
├── prisma/
│   └── schema.prisma        # Schéma de base de données
│
└── docs/
    ├── README.md
    └── HDS-COMPLIANCE.md
```

## 🔒 Sécurité

Le projet implémente plusieurs couches de sécurité :

- **JWT** : Authentification avec tokens d'accès et de rafraîchissement
- **Bcrypt** : Hachage sécurisé des mots de passe (12 rounds)
- **Helmet.js** : Headers de sécurité HTTP
- **CORS** : Configuration stricte des origines autorisées
- **Rate Limiting** : Protection contre les abus
- **Audit Logs** : Traçabilité complète des actions
- **Validation** : Validation stricte des entrées avec Zod

## 🎨 Design System

Le design suit des principes professionnels et médicaux :

- **Palette** : Tons neutres, blanc cassé, gris doux, accent bleu médical discret
- **Inspiration** : Notion, Linear, Stripe Dashboard
- **Typographie** : Inter, hiérarchie claire
- **Composants** : Cards avec bordures subtiles, hover states discrets

## 📱 API Endpoints

### Authentification
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `POST /api/auth/refresh` - Rafraîchir le token
- `POST /api/auth/logout` - Déconnexion

### Médecins
- `GET /api/medecins` - Liste des médecins
- `GET /api/medecins/:id` - Détails d'un médecin
- `PUT /api/medecins/:id` - Modifier un médecin

### Patients
- `GET /api/patients` - Liste des patients
- `GET /api/patients/:id` - Détails d'un patient
- `POST /api/patients` - Créer un patient

### Adressages
- `GET /api/adressages` - Liste des adressages
- `GET /api/adressages/:id` - Détails d'un adressage
- `POST /api/adressages` - Créer un adressage
- `PATCH /api/adressages/:id/statut` - Modifier le statut

### Motifs
- `GET /api/motifs` - Liste des motifs d'adressage
- `POST /api/motifs` - Créer un motif

## 🧪 Tests et Qualité

```bash
# Linting
npm run lint

# Build
npm run build

# Type checking
npx tsc --noEmit
```

## 📝 Base de Données

Le projet utilise PostgreSQL avec Prisma ORM. Les modèles principaux :

- **Medecin** : Utilisateurs médecins/secrétariat/admin
- **Patient** : Patients
- **Adressage** : Demandes d'adressage entre médecins
- **MotifAdressage** : Motifs prédéfinis
- **Document** : Documents attachés aux adressages
- **TemplatePrerempli** : Templates de notes
- **AuditLog** : Logs d'audit pour la traçabilité

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est privé et confidentiel.

## 🔗 Liens Utiles

- [Documentation Prisma](https://www.prisma.io/docs)
- [React Router](https://reactrouter.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [Expo](https://expo.dev/)

## 👥 Support

Pour toute question ou support, contactez l'équipe de développement.
