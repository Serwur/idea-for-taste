const Sequelize = require("sequelize");
const db = require("../database/db");

module.exports = db.sequelize.define(
  'ingredient',
  {
    id: {
      type: Sequelize.INTEGER(12).UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING(128),
      allowNull: false
    },
    carbohydrate: {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: '0'
    },
    protein: {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: '0'
    },
    fat: {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: '0'
    },
    water: {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: '0'
    },
    roughage: {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: '0'
    },
    sugar: {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: '0'
    },
    alcohol: {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: '0'
    },
    organic_acid: {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: '0'
    },
    salt: {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: '0'
    },
    sys_create_date: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    sys_update_date: {
      type: Sequelize.DATE,
      allowNull: true
    }
  }, {
  tableName: 'ingredient',
  timestamps: false
});
