# OphtaConnect Chrome Extension

Extension Chrome Manifest V3 pour créer rapidement des adressages depuis n'importe quelle page web.

## Fonctionnalités

- Menu contextuel pour adresser un patient depuis une sélection de texte
- Popup pour créer un adressage complet
- Configuration de l'URL de l'API
- Authentification intégrée

## Installation

1. Ouvrir Chrome et aller à `chrome://extensions/`
2. Activer le "Mode développeur"
3. Cliquer sur "Charger l'extension non empaquetée"
4. Sélectionner le dossier `apps/chrome-extension`

## Configuration

1. Cliquer sur l'icône de l'extension
2. Cliquer sur "Se connecter"
3. Configurer l'URL de l'API (par défaut: http://localhost:3001)
4. Se connecter avec vos identifiants OphtaConnect

## Utilisation

1. Sélectionner le nom d'un patient sur une page web
2. Clic droit → "Adresser via OphtaConnect"
3. Remplir le formulaire d'adressage
4. Valider

## Permissions

- `contextMenus` : Menu contextuel
- `storage` : Stockage de la configuration
- `activeTab` : Accès à l'onglet actif
- `host_permissions` : Communication avec l'API
