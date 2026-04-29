const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Artisan = sequelize.define('Artisan', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nom: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  note: {
    type: DataTypes.DECIMAL(2, 1),
    allowNull: false,
    validate: { min: 0, max: 5 },
  },
  ville: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  a_propos: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING(150),
    allowNull: false,
    validate: { isEmail: true },
  },
  site_web: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  photo: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  top: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  specialite_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'artisans',
  timestamps: false,
});

module.exports = Artisan;
