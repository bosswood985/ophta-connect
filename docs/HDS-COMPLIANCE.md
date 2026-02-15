# Conformité HDS (Hébergement de Données de Santé)

Ce document détaille les mesures de sécurité et de conformité mises en place dans OphtaConnect pour respecter les exigences HDS.

## 🔐 Sécurité des Données

### Authentification et Autorisation
- [x] Authentification JWT avec tokens sécurisés
- [x] Tokens d'accès de courte durée (15 minutes par défaut)
- [x] Tokens de rafraîchissement pour sessions persistantes
- [x] Hachage des mots de passe avec bcrypt (12 rounds)
- [x] Gestion des rôles (MEDECIN, SECRETARIAT, ADMIN)
- [x] Middleware d'autorisation basé sur les rôles

### Chiffrement
- [x] HTTPS obligatoire en production
- [x] Mots de passe hachés avec bcrypt
- [x] Tokens JWT signés cryptographiquement
- [ ] Chiffrement des données sensibles au repos (à implémenter en production)

### Protection des API
- [x] Rate limiting global et stricte pour l'authentification
- [x] Validation stricte des entrées avec Zod
- [x] Protection CORS configurée strictement
- [x] Headers de sécurité avec Helmet.js
- [x] Protection contre les injections SQL (Prisma ORM)

## 📋 Traçabilité et Audit

### Logs d'Audit
- [x] Enregistrement de toutes les actions utilisateur
- [x] Capture de l'adresse IP source
- [x] Horodatage précis de chaque action
- [x] Détails des requêtes (body, query, params)
- [x] Association avec l'utilisateur authentifié

### Données Auditées
- Actions d'authentification (login, logout, refresh)
- Création/modification/suppression d'adressages
- Accès aux dossiers patients
- Modifications des données utilisateurs
- Upload/download de documents

## 🔒 Contrôle d'Accès

### Ségrégation des Données
- [x] Isolation des données par utilisateur
- [x] Accès limité selon le rôle
- [x] Validation des permissions pour chaque requête

### Gestion des Sessions
- [x] Expiration automatique des tokens
- [x] Mécanisme de rafraîchissement sécurisé
- [x] Déconnexion côté client et serveur

## 📁 Gestion des Documents

### Upload Sécurisé
- [x] Validation des types de fichiers
- [x] Limitation de la taille des fichiers
- [x] Stockage avec noms de fichiers aléatoires
- [x] Association avec l'utilisateur uploadeur

### Types de Fichiers Autorisés
- Images : JPEG, PNG, JPG
- Documents : PDF, DOC, DOCX

## 🛡️ Protection contre les Attaques

### Mesures Implémentées
- [x] Protection contre l'injection SQL (Prisma)
- [x] Protection XSS (validation des entrées)
- [x] Protection CSRF (tokens)
- [x] Rate limiting contre les attaques par force brute
- [x] Validation stricte des données d'entrée
- [x] Sanitization des données utilisateur

## 📊 Sauvegarde et Récupération

### Recommandations Production
- [ ] Sauvegardes automatiques quotidiennes de la base de données
- [ ] Rétention des sauvegardes pendant 90 jours minimum
- [ ] Tests de restauration mensuels
- [ ] Plan de reprise d'activité documenté

## 🔍 Monitoring et Alertes

### Logs Application
- [x] Logger Winston pour le backend
- [x] Niveaux de logs configurables
- [x] Format JSON structuré

### Recommandations Production
- [ ] Système de monitoring centralisé
- [ ] Alertes sur événements de sécurité
- [ ] Dashboard de métriques
- [ ] Analyse des logs d'audit

## 👥 Gestion des Utilisateurs

### Cycle de Vie
- [x] Inscription avec validation des données
- [x] Activation/désactivation des comptes
- [x] Gestion des rôles et permissions
- [ ] Processus de validation des inscriptions (recommandé)

### Bonnes Pratiques
- Politique de mots de passe forts
- Changement régulier des mots de passe
- Revue périodique des accès
- Formation à la sécurité

## 🌐 Infrastructure

### Recommandations Hébergement
- [ ] Hébergeur certifié HDS
- [ ] Infrastructure en France ou UE
- [ ] Redondance et haute disponibilité
- [ ] Firewall et WAF configurés
- [ ] VPN pour accès administrateur
- [ ] Séparation des environnements (dev, staging, prod)

## 📝 Documentation et Procédures

### Documentation Requise
- [x] Documentation technique
- [x] Documentation de sécurité (ce document)
- [ ] Procédures opérationnelles
- [ ] Plan de gestion des incidents
- [ ] Politique de confidentialité
- [ ] CGU et mentions légales

## ✅ Checklist de Mise en Production

### Avant le Déploiement
- [ ] Audit de sécurité complet
- [ ] Tests de pénétration
- [ ] Revue du code de sécurité
- [ ] Configuration des secrets en production
- [ ] Certificats SSL/TLS configurés
- [ ] Sauvegardes automatiques activées
- [ ] Monitoring en place
- [ ] Documentation à jour

### Configuration Production
- [ ] Variables d'environnement sécurisées
- [ ] Secrets rotationnels implémentés
- [ ] Base de données sécurisée
- [ ] Accès restreints
- [ ] Logs centralisés
- [ ] HTTPS forcé

## 🔄 Maintenance et Mises à Jour

### Processus
- [ ] Tests de sécurité réguliers
- [ ] Mises à jour des dépendances
- [ ] Audits de sécurité trimestriels
- [ ] Revue des logs d'audit
- [ ] Tests de restauration
- [ ] Formation continue de l'équipe

## 📞 Gestion des Incidents

### Procédure en Cas de Faille
1. Identification et confinement
2. Évaluation de l'impact
3. Notification des autorités si nécessaire
4. Notification des utilisateurs concernés
5. Correction et tests
6. Documentation post-mortem
7. Mise en place de mesures préventives

## 📈 Améliorations Futures

- [ ] Authentification à deux facteurs (2FA)
- [ ] Chiffrement de bout en bout
- [ ] Signature électronique des documents
- [ ] Anonymisation des données pour analytics
- [ ] Conformité RGPD complète
- [ ] Certification ISO 27001

## 📚 Références

- [Référentiel HDS - ASIP Santé](https://esante.gouv.fr/)
- [RGPD](https://www.cnil.fr/fr/reglement-europeen-protection-donnees)
- [ANSSI - Recommandations de sécurité](https://www.ssi.gouv.fr/)

---

*Document mis à jour le : 2026-02-15*
*Version : 1.0*
