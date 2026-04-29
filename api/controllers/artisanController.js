const { Artisan, Specialite, Categorie } = require('../models');
const { Op } = require('sequelize');

// Données de test pour contourner le problème MySQL
const testData = [
  {
    id: 1,
    nom: "Dupont Électricité",
    metier: "Électricien",
    localisation: "Lyon",
    telephone: "06 12 34 56 78",
    email: "dupont@email.com",
    photo: "https://via.placeholder.com/300x200/0074c7/ffffff?text=Électricien",
    description: "Électricien certifié avec 10 ans d'expérience",
    note_moyenne: 4.5,
    nombre_avis: 23
  },
  {
    id: 2,
    nom: "Martin Plomberie",
    metier: "Plombier",
    localisation: "Grenoble",
    telephone: "06 23 45 67 89",
    email: "martin@email.com",
    photo: "https://via.placeholder.com/300x200/82b864/ffffff?text=Plombier",
    description: "Plombier spécialisé en rénovation",
    note_moyenne: 4.8,
    nombre_avis: 31
  },
  {
    id: 3,
    nom: "Durand Menuiserie",
    metier: "Menuisier",
    localisation: "Clermont-Ferrand",
    telephone: "06 34 56 78 90",
    email: "durand@email.com",
    photo: "https://via.placeholder.com/300x200/cd2c2e/ffffff?text=Menuisier",
    description: "Menuisier artisanal depuis 15 ans",
    note_moyenne: 4.7,
    nombre_avis: 18
  }
];

// Inclure les relations dans chaque requête
const includeRelations = [
  {
    model: Specialite,
    as: 'specialite',
    include: [{ model: Categorie, as: 'categorie' }],
  },
];

/**
 * GET /api/artisans
 * Retourne tous les artisans (avec filtres optionnels)
 */
const getAllArtisans = async (req, res) => {
  try {
    const { search, categorie, specialite } = req.query;
    let filteredArtisans = testData;

    // Filtrer par recherche
    if (search) {
      filteredArtisans = filteredArtisans.filter(artisan =>
        artisan.nom.toLowerCase().includes(search.toLowerCase()) ||
        artisan.metier.toLowerCase().includes(search.toLowerCase()) ||
        artisan.localisation.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filtrer par catégorie/métier
    if (categorie) {
      filteredArtisans = filteredArtisans.filter(artisan =>
        artisan.metier.toLowerCase().includes(categorie.toLowerCase())
      );
    }

    // Filtrer par spécialité
    if (specialite) {
      filteredArtisans = filteredArtisans.filter(artisan =>
        artisan.metier.toLowerCase().includes(specialite.toLowerCase())
      );
    }

    res.json(filteredArtisans);
  } catch (error) {
    console.error('Erreur getAllArtisans:', error);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
};

/**
 * GET /api/artisans/top
 * Retourne les 3 artisans du mois (top = true)
 */
const getTopArtisans = async (req, res) => {
  try {
    const artisans = await Artisan.findAll({
      where: { top: true },
      include: includeRelations,
      limit: 3,
    });
    res.json(artisans);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
};

/**
 * GET /api/artisans/:id
 * Retourne un artisan par son ID
 */
const getArtisanById = async (req, res) => {
  try {
    const artisan = await Artisan.findByPk(req.params.id, {
      include: includeRelations,
    });

    if (!artisan) {
      return res.status(404).json({ error: 'Artisan introuvable.' });
    }

    res.json(artisan);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
};

module.exports = { getAllArtisans, getTopArtisans, getArtisanById };
