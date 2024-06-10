const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('City', {
   
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    countryId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
  });
};