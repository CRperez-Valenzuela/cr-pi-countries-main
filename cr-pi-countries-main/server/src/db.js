
require("dotenv").config({ path: './.env' });


const { Sequelize } = require("sequelize");

const fs = require('fs');
const path = require('path');

const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
  logging: false, 
  native: false, 
});

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });


modelDefiners.forEach(model => model(sequelize));


const { Country, Activity  } = sequelize.models;

// Definir la relación entre Country y Activity
Country.hasMany(Activity, { foreignKey: 'countryId', sourceKey: 'id' });
Activity.belongsTo(Country, { foreignKey: 'countryId', targetKey: 'id' });

// Definir la relación muchos a muchos entre Activity y Country
Activity.belongsToMany(Country, { through: 'ActivityCountry' });

module.exports = {
  ...sequelize.models, 
  conn: sequelize, 
};
