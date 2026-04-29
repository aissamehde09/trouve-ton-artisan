require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { sequelize } = require('./models');
const apiKeyAuth = require('./middleware/apiKeyAuth');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Sécurité ───────────────────────────────────────────────
// Headers HTTP sécurisés
app.use(helmet());

// CORS : limité à l'application frontend
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'https://votre-app-vercel.vercel.app'],
  methods: ['GET', 'POST'],
}));

// Limite de requêtes : 100 par 15 min par IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Trop de requêtes, veuillez réessayer plus tard.' },
});
app.use('/api/', limiter);

// ─── Parsing ────────────────────────────────────────────────
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// ─── Routes ─────────────────────────────────────────────────
// Toutes les routes API sont protégées par la clé API
app.use('/api', apiKeyAuth, routes);

// Route de santé (sans clé API pour monitoring)
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// ─── 404 ────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: 'Route introuvable.' });
});

// ─── Démarrage ──────────────────────────────────────────────
sequelize
  .authenticate()
  .then(() => {
    console.log('✅ Connexion à la base de données réussie.');
    app.listen(PORT, () => {
      console.log(`🚀 API démarrée sur http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Impossible de se connecter à la base de données :', err);
    process.exit(1);
  });
