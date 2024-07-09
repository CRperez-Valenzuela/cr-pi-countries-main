const express = require('express');
const router = express.Router();
const activitiesController = require('../Controllers/activitiesController');




// Ruta GET para obtener actividades por temporada
/*router.get('/byseasons', activitiesController.getActivitiesBySeason);*/
router.post('/create', activitiesController.createActivity)
router.get('/activities', activitiesController.getAllActivities);

module.exports = router;