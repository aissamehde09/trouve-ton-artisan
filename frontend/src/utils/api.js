/**
 * Service d'appel à l'API REST Trouve ton artisan.
 * Toutes les requêtes incluent automatiquement la clé API.
 */

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const API_KEY = process.env.REACT_APP_API_KEY || '';

const headers = {
  'Content-Type': 'application/json',
  'x-api-key': API_KEY,
};

/**
 * Récupère tous les artisans (avec filtres optionnels)
 * @param {Object} params - { search, categorie, specialite }
 */
export const fetchArtisans = async (params = {}) => {
  const query = new URLSearchParams();
  if (params.search)     query.append('search', params.search);
  if (params.categorie)  query.append('categorie', params.categorie);
  if (params.specialite) query.append('specialite', params.specialite);

  const url = `${API_URL}/artisans${query.toString() ? '?' + query.toString() : ''}`;
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error('Erreur lors de la récupération des artisans.');
  return res.json();
};

/**
 * Récupère les 3 artisans du mois (top = true)
 */
export const fetchTopArtisans = async () => {
  const res = await fetch(`${API_URL}/artisans/top`, { headers });
  if (!res.ok) throw new Error('Erreur lors de la récupération des artisans du mois.');
  return res.json();
};

/**
 * Récupère un artisan par son ID
 * @param {number|string} id
 */
export const fetchArtisanById = async (id) => {
  const res = await fetch(`${API_URL}/artisans/${id}`, { headers });
  if (!res.ok) throw new Error('Artisan introuvable.');
  return res.json();
};

/**
 * Récupère toutes les catégories avec leurs spécialités
 */
export const fetchCategories = async () => {
  const res = await fetch(`${API_URL}/categories`, { headers });
  if (!res.ok) throw new Error('Erreur lors de la récupération des catégories.');
  return res.json();
};

/**
 * Envoie un message de contact à un artisan
 * @param {Object} data - { nom, email, objet, message, artisan_email, artisan_nom }
 */
export const sendContactMessage = async (data) => {
  const res = await fetch(`${API_URL}/contact`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Erreur lors de l\'envoi du message.');
  return json;
};
