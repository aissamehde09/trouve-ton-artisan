const { Artisan, Specialite, Categorie } = require('../models');
const { Op } = require('sequelize');

const getIncludeRelations = ({ categorie, specialite } = {}) => [
  {
    model: Specialite,
    as: 'specialite',
    required: Boolean(categorie || specialite),
    ...(specialite ? { where: { nom: specialite } } : {}),
    include: [
      {
        model: Categorie,
        as: 'categorie',
        required: Boolean(categorie),
        ...(categorie ? { where: { nom: categorie } } : {}),
      },
    ],
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

    if (search) {
      where.nom = { [Op.like]: `%${search}%` };
    }

    const artisans = await Artisan.findAll({
      where,
      include: getIncludeRelations({ categorie, specialite }),
      order: [['nom', 'ASC']],
    });

    res.json(artisans);
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
    const topArtisans = await Artisan.findAll({
      where: { top: true },
      include: getIncludeRelations(),
      limit: 3,
    });
    res.json(topArtisans);
  } catch (error) {
    console.error('Erreur getTopArtisans:', error);
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
      include: getIncludeRelations(),
    });

    if (!artisan) {
      return res.status(404).json({ error: 'Artisan introuvable.' });
    }

    res.json(artisan);
  } catch (error) {
    console.error('Erreur getArtisanById:', error);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
};

module.exports = { getAllArtisans, getTopArtisans, getArtisanById };
