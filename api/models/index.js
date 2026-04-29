const sequelize = require('../config/database');
const Artisan = require('./Artisan');
const Specialite = require('./Specialite');
const Categorie = require('./Categorie');

// Associations
Categorie.hasMany(Specialite, { foreignKey: 'categorie_id', as: 'specialites' });
Specialite.belongsTo(Categorie, { foreignKey: 'categorie_id', as: 'categorie' });

Specialite.hasMany(Artisan, { foreignKey: 'specialite_id', as: 'artisans' });
Artisan.belongsTo(Specialite, { foreignKey: 'specialite_id', as: 'specialite' });

module.exports = { sequelize, Artisan, Specialite, Categorie };
