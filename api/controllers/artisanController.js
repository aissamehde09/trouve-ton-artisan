const { Artisan, Specialite, Categorie } = require('../models');
const { Op } = require('sequelize');

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
    const where = {};
    const includeWhere = {};

    if (search) {
      where.nom = { [Op.like]: `%${search}%` };
    }

    const artisans = await Artisan.findAll({
      where,
      include: includeRelations,
      order: [['nom', 'ASC']],
    });

    // Filtrer par catégorie/spécialité côté JS si nécessaire
    let result = artisans;
    if (categorie) {
      result = result.filter(
        (a) => a.specialite?.categorie?.nom?.toLowerCase() === categorie.toLowerCase()
      );
    }
    if (specialite) {
      result = result.filter(
        (a) => a.specialite?.nom?.toLowerCase() === specialite.toLowerCase()
      );
    }

    res.json(result);
  } catch (err) {
    console.error(err);
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
