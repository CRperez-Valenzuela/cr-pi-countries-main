const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Activity', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    difficulty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      }
    },
    duration: {
      type: DataTypes.STRING, 
      allowNull: false,
      validate: {
        isValidDuration(value) {
          if (!/^[1-9][0-9]*\s*(horas?|hr)?$/.test(value)) {
            throw new Error('La duración debe ser un número seguido opcionalmente de "hora(s)"');
          }
        }
      }
    },
    season: {
      type: DataTypes.ENUM('Verano', 'Otoño', 'Invierno', 'Primavera'),
      allowNull: false,
    },
  });
};

