const express = require('express');
const router = express.Router();
const { getAllArtisans, getTopArtisans, getArtisanById } = require('../controllers/artisanController');
const { getAllCategories } = require('../controllers/categorieController');
const { sendContact } = require('../controllers/contactController');

// Routes artisans
router.get('/artisans', getAllArtisans);
router.get('/artisans/top', getTopArtisans);
router.get('/artisans/:id', getArtisanById);

// Routes catégories
router.get('/categories', getAllCategories);

// Route contact
router.post('/contact', sendContact);

module.exports = router;
