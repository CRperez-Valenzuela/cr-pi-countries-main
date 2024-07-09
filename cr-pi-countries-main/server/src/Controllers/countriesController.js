

const { Country, Activity, ActivityCountry } = require('../db');
const { Op } = require('sequelize');
const axios = require('axios');


// Controlador para obtener todos los países
async function getAllCountries(req, res) {
  try {
    // Verificar si hay datos en la base de datos
    const countriesInDB = await Country.findAll();

    if (countriesInDB.length > 0) {
      return res.json(countriesInDB);
    } else {
      // Si no hay datos, hacer una solicitud a la API externa
      const response = await axios.get('http://localhost:5000/countries');
      const countriesFromAPI = response.data;
      
      // Limpiar la base de datos antes de agregar nuevos datos
      await Country.destroy({ where: {} });

      // Agregar los datos a la base de datos
      for (const country of countriesFromAPI) {
        await Country.create({
          id: country.cca3, // Usar cca3 como ID
          name: country.name.common,
          flagImage: country.flags.png,
          continent: country.continents[0],
          capital: country.capital ? country.capital[0] : null,
          population: country.population,
        });
      }

      // Obtener todos los países después de la actualización
      const newCountries = await Country.findAll();
      return res.json(newCountries);
    }
  } catch (error) {
    return res.status(500).json({ message: "Hubo un error al obtener los países.", error: error.message });
  }
}

// Controlador para obtener un país por su ID
async function getCountryById(req, res) {
  const { idPais } = req.params;

  try {
    // Buscar el país
    const country = await Country.findOne({ where: { id: idPais } });

    if (!country) {
      return res.status(404).json({ message: "No se encontró el país." });
    }

    // Buscar actividades relacionadas a través de la tabla intermedia
    const activityRelations = await ActivityCountry.findAll({ where: { CountryId: idPais } });
    const activityIds = activityRelations.map(rel => rel.ActivityId);

    // Buscar actividades por los IDs obtenidos
    const activities = await Activity.findAll({ where: { id: activityIds } });

    const countryDetails = {
      id: country.id,
      name: country.name,
      flagImage: country.flagImage,
      continent: country.continent,
      capital: country.capital,
      population: country.population,
      activities: activities.length > 0 ? 
        activities.map(activity => ({
          name: activity.name,
          difficulty: activity.difficulty,
          duration: activity.duration,
          season: activity.season,
        })) : "No hay actividades turísticas registradas."
    };

    res.json({ country: countryDetails });
  } catch (error) {
    console.error('Error al obtener el país:', error);
    res.status(500).json({ message: "Hubo un error al obtener el país.", error: error.message });
  }
}


// Controlador para buscar países por nombre
async function getCountriesByName(req, res) {
  const { name } = req.query;

  try {
    // Buscar países por nombre (case-insensitive)
    const countries = await Country.findAll({
      where: {
        name: { [Op.iLike]: `%${name}%` } // Usar Op.iLike para comparación case-insensitive
      }
    });

    if (countries.length > 0) {
      const countryDetails = countries.map(country => ({
        id: country.id,
        name: country.name,
        flagImage: country.flagImage,
        continent: country.continent,
        capital: country.capital,
        population: country.population
        
      }));

      res.json({
        countries: countryDetails
      });
    } else {
      res.status(404).json({ message: "No se encontraron países con ese nombre." });
    }
  } catch (error) {
    console.error('Error al buscar detalles de los países:', error);
    res.status(500).json({ message: "Hubo un error al buscar países por nombre." });
  }
}


// Controlador para obtener países por temporada de actividades
async function getCountriesBySeason(req, res) {
  const { season } = req.query;

  try {
    // Encontrar todas las actividades para la temporada específica
    const activities = await Activity.findAll({
      where: {
        season: {
          [Op.iLike]: `%${season}%` // Búsqueda case-insensitive
        }
      },
      include: {
        model: Country,
        attributes: ['id', 'name', 'flagImage', 'continent', 'capital', 'population']
      }
    });

    if (activities.length > 0) {
      // Extraer los países únicos de las actividades encontradas
      const countries = activities.reduce((acc, activity) => {
        activity.Countries.forEach(country => {
          if (!acc.find(c => c.id === country.id)) {
            acc.push(country);
          }
        });
        return acc;
      }, []);

      res.json(countries);
    } else {
      res.status(404).json({ message: `No se encontraron actividades para la temporada "${season}".` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Hubo un error al buscar países por temporada.", error: error.message });
  }
}

// Controlador para ordenar alfabéticamente todos los países
async function getAllCountriesAlphabetically(req, res) {
  try {
    const countries = await Country.findAll({
      order: [
        ['name', 'ASC'] // Ordenar por el nombre del país en orden ascendente
      ]
    });

    res.json(countries);
  } catch (error) {
    res.status(500).json({ message: "Hubo un error al obtener los países ordenados alfabéticamente.", error: error.message });
  }
}

module.exports = {
  getAllCountries,
  getCountryById,
  getCountriesByName,
  getCountriesBySeason,
  getAllCountriesAlphabetically,
  
};
