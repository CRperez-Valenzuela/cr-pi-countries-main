const express = require('express');
const router = express.Router();
const countriesController = require('../Controllers/countriesController');



router.get('/', countriesController.getAllCountries);
router.get('/busqueda/:name', countriesController.getCountriesByName);
router.get('/:idPais', countriesController.getCountryById);
router.get('/countries/season', countriesController.getCountriesBySeason);
router.get('/countries', countriesController.getAllCountriesAlphabetically);

module.exports = router;