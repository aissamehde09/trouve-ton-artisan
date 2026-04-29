const { Categorie, Specialite } = require('../models');

// Données de test pour les catégories
const testCategories = [
  {
    id: 1,
    nom: "Électricité",
    specialites: [
      { id: 1, nom: "Électricien généraliste" },
      { id: 2, nom: "Électricien industriel" }
    ]
  },
  {
    id: 2,
    nom: "Plomberie",
    specialites: [
      { id: 3, nom: "Plombier chauffage" },
      { id: 4, nom: "Plombier sanitaire" }
    ]
  },
  {
    id: 3,
    nom: "Menuiserie",
    specialites: [
      { id: 5, nom: "Menuisier agenceur" },
      { id: 6, nom: "Menuisier charpentier" }
    ]
  }
];

/**
 * GET /api/categories
 * Retourne toutes les catégories avec leurs spécialités
 */
const getAllCategories = async (req, res) => {
  try {
    res.json(testCategories);
  } catch (error) {
    console.error('Erreur getAllCategories:', error);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
};

module.exports = { getAllCategories };
