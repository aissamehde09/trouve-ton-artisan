/**
 * Middleware de vérification de la clé API.
 * Limite l'accès à l'API aux applications autorisées.
 */
const apiKeyAuth = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey) {
    return res.status(401).json({ error: 'Clé API manquante.' });
  }

  if (apiKey !== process.env.API_KEY) {
    return res.status(403).json({ error: 'Clé API invalide.' });
  }

  next();
};

module.exports = apiKeyAuth;
