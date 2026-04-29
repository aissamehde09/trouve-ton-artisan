# Trouve ton artisan 🔨

Plateforme dédiée aux artisans de la région **Auvergne-Rhône-Alpes**, permettant aux particuliers de trouver un artisan et de le contacter facilement.

---

## Stack technique

| Couche          | Technologies                                   |
| --------------- | --------------------------------------------- |
| Frontend        | React 18, Bootstrap 5, Sass, Font Awesome    |
| API             | Node.js, Express, Sequelize                  |
| Base de données | MySQL / MariaDB                               |
| Versioning      | Git + GitHub                                  |
| Icônes          | Font Awesome (icônes professionnelles SVG)    |

---

## Prérequis

- **Node.js** v18+ et **npm** v9+
- **MySQL** 8.0+ (ou MariaDB 10.6+)
- **Git**

---

## Installation

### 1. Cloner le dépôt

```bash
git clone https://github.com/votre-compte/trouve-ton-artisan.git
cd trouve-ton-artisan
```

### 2. Base de données

```bash
# Créer la base et les tables
mysql -u root -p < api/create_database.sql

# Insérer les données de test
mysql -u root -p < api/seed_database.sql
```

### 3. API (backend)

```bash
cd api
npm install

# Copier et remplir le fichier de configuration
cp .env.example .env
# Éditer .env avec vos paramètres DB, clé API et SMTP
```

Contenu minimal du fichier `.env` :

```env
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=trouve_ton_artisan
DB_USER=root
DB_PASSWORD=votre_mot_de_passe
API_KEY=une_cle_secrete_longue_et_aleatoire
FRONTEND_URL=http://localhost:3000
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=votre@email.com
MAIL_PASS=votre_mot_de_passe_app
```

```bash
# Démarrer l'API en développement
npm run dev

# Démarrer l'API en production
npm start
```

L'API est accessible sur : `http://localhost:5000`

### 4. Frontend

```bash
cd ../frontend
npm install

# Copier et remplir le fichier de configuration
cp .env.example .env
```

Contenu du fichier `.env` :

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_API_KEY=une_cle_secrete_longue_et_aleatoire
```

> ⚠️ La valeur de `REACT_APP_API_KEY` doit être identique à `API_KEY` dans le `.env` de l'API.

```bash
# Démarrer en développement
npm start

# Construire pour la production
npm run build
```

Le site est accessible sur : `http://localhost:3000`

---

## Structure du projet

```
trouve-ton-artisan/
├── api/                        # Backend Node.js / Express
│   ├── config/
│   │   └── database.js         # Configuration Sequelize
│   ├── controllers/
│   │   ├── artisanController.js
│   │   ├── categorieController.js
│   │   └── contactController.js
│   ├── middleware/
│   │   └── apiKeyAuth.js       # Authentification par clé API
│   ├── models/
│   │   ├── index.js            # Associations entre modèles
│   │   ├── Artisan.js
│   │   ├── Specialite.js
│   │   └── Categorie.js
│   ├── routes/
│   │   └── index.js
│   ├── create_database.sql     # Script de création BDD
│   ├── seed_database.sql       # Script d'alimentation BDD
│   ├── server.js               # Point d'entrée API
│   ├── .env.example
│   └── package.json

└── frontend/                   # Frontend React
    ├── public/
    │   ├── index.html
    │   ├── logo.png
    │   ├── favicon.png
    │   └── favicon-32.png
    ├── src/
    │   ├── components/
    │   │   ├── Header.jsx
    │   │   ├── Footer.jsx
    │   │   ├── ArtisanCard.jsx
    │   │   ├── FontAwesomeIcon.jsx  # Icônes Font Awesome
    │   │   └── Stars.jsx
    │   ├── pages/
    │   │   ├── HomePage.jsx
    │   │   ├── ArtisansPage.jsx
    │   │   ├── ArtisanPage.jsx
    │   │   ├── LegalPage.jsx
    │   │   └── NotFoundPage.jsx
    │   ├── styles/
    │   │   └── main.scss       # Styles globaux + Bootstrap + couleurs charte
    │   ├── utils/
    │   │   └── api.js          # Fonctions d'appel à l'API
    │   ├── App.jsx             # Routeur principal
    │   └── index.js
    ├── .env.example
    └── package.json
```

---

## Endpoints API

Toutes les routes nécessitent le header : `x-api-key: <votre_cle>`

| Méthode | Route               | Description                                         |
| ------- | ------------------- | --------------------------------------------------- |
| GET     | `/api/artisans`     | Liste des artisans (filtres: `search`, `categorie`) |
| GET     | `/api/artisans/top` | 3 artisans du mois                                  |
| GET     | `/api/artisans/:id` | Fiche complète d'un artisan                         |
| GET     | `/api/categories`   | Toutes les catégories + spécialités                 |
| POST    | `/api/contact`      | Envoyer un message à un artisan                     |
| GET     | `/health`           | Santé du serveur (sans clé API)                     |

---

## Fonctionnalités

- **Icônes professionnelles** : Font Awesome pour chaque spécialité d'artisan
- **Design responsive** : Mobile first, compatible tablette et ordinateur
- **Accessibilité WCAG 2.1** : skip-link, aria-label, rôles, contraste
- **Charte graphique** : Couleurs officielles région Auvergne-Rhône-Alpes
- **Recherche dynamique** : Par nom de artisan ou par catégorie
- **Formulaire de contact** : Envoi d'e-mails directement aux artisans

## Sécurité

- **Clé API** : toutes les routes sont protégées par `x-api-key`
- **Helmet** : headers HTTP sécurisés
- **CORS** : limité au domaine frontend
- **Rate limiting** : 100 requêtes / 15 min par IP
- **Validation** : vérification des entrées côté API
- **WCAG 2.1** : accessibilité (skip-link, aria-label, roles, contraste)

---

## Hébergement

- **Frontend** : [Vercel](https://vercel.com) ou [Netlify](https://netlify.com) (dossier `frontend/build`)
- **API** : [Railway](https://railway.app) ou [Render](https://render.com)
- **Base de données** : instance MySQL managée

---

## Auteur

Projet réalisé dans le cadre d'une mission pour la **Région Auvergne-Rhône-Alpes** — Centre Européen de Formation.
