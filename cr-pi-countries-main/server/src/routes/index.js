const { Router } = require("express");
const countriesRouter = require('./countriesRouter');
const activitiesRouter = require('./activitiesRouter');

const router = Router();
router.use('/countries', countriesRouter);
router.use('/activity', activitiesRouter);

module.exports = router;
