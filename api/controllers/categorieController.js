const { Categorie, Specialite } = require('../models');

/**
 * GET /api/categories
 * Retourne toutes les catégories avec leurs spécialités
 */
const getAllCategories = async (req, res) => {
  try {
    const categories = await Categorie.findAll({
      include: [{ model: Specialite, as: 'specialites' }],
      order: [['nom', 'ASC']],
    });
    res.json(categories);
  } catch (error) {
    console.error('Erreur getAllCategories:', error);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
};

module.exports = { getAllCategories };
