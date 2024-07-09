const { Activity, Country } = require('../db.js');
const { Op } = require('sequelize');

// Controlador para obtener todas las actividades
async function getAllActivities(req, res, next) {
  try {
    const activities = await Activity.findAll();
    res.json(activities);
  } catch (error) {
    next(error);
  }
}
// Controlador para obtener actividades por temporada

/*async function getActivitiesBySeason(req, res) {
  try {
    const activitiesBySeason = await Activity.findAll({
      attributes: ['season'],
      group: ['season']
    });
    res.json(activitiesBySeason);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Hubo un error al obtener las actividades por temporada.' });
  }
}*/

// Controlador para crear una nueva actividad
async function createActivity(req, res, next) {
  const { name, difficulty, season, duration, countryNames, addCountry } = req.body;

  if (!name || !difficulty || !season || !duration || !Array.isArray(countryNames) || countryNames.length === 0) {
    return res.status(400).json({ error: 'Todos los campos son requeridos y debe haber al menos un país asociado.' });
  }

  try {
    // Busca los países por sus nombres
    const countries = await Country.findAll({
      where: {
        name: { [Op.iLike]: { [Op.any]: countryNames.map(name => `%${name}%`) } }
      }
    });

    // Si no se encuentran todos los países proporcionados
    if (countries.length !== countryNames.length) {
      return res.status(404).json({ error: 'Uno o más de los países asociados a la actividad no existen.' });
    }

    const countryIds = countries.map(country => country.id);

    let existingActivity = await Activity.findOne({
      where: { name: { [Op.iLike]: name } },
      include: {
        model: Country,
        where: {
          id: { [Op.in]: countryIds }
        }
      }
    });

    if (existingActivity) {
      return res.status(409).json({ 
        error: 'La actividad ya existe para este país.',
        type: 'duplicate_country',
        activity: existingActivity
      });
    }

    existingActivity = await Activity.findOne({
      where: { name: { [Op.iLike]: name } }
    });

    if (existingActivity) {
      const sameDetailsActivity = await Activity.findOne({
        where: { name: { [Op.iLike]: name }, difficulty, duration }
      });

      if (sameDetailsActivity) {
        if (addCountry) {
          await sameDetailsActivity.addCountries(countryIds);
          return res.status(200).json({
            message: 'País agregado a la actividad existente con éxito.',
            activity: sameDetailsActivity
          });
        } else {
          return res.status(409).json({
            error: `La actividad ya existe con duración: ${sameDetailsActivity.duration} y dificultad: ${sameDetailsActivity.difficulty}.`,
            type: 'different_details',
            activity: sameDetailsActivity
          });
        }
      } else {
        return res.status(409).json({
          error: 'La actividad ya existe para otro país. ¿Desea agregar este país a la actividad existente?',
          type: 'add_country',
          activity: existingActivity
        });
      }
    }

    const newActivity = await Activity.create({
      name,
      difficulty,
      season,
      duration,
    });

    // Asocia la nueva actividad con los países
    await newActivity.addCountries(countryIds);

    res.status(201).json({
      message: 'Actividad creada con éxito y países agregados.',
      activity: newActivity
    });

  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ error: 'Los datos de la actividad son inválidos.' });
    }
    next(error);
  }
}


  
module.exports = {
  getAllActivities,
  /*getActivitiesBySeason,*/
  createActivity,
  
};
