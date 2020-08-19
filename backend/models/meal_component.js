const Sequelize = require("sequelize");
const db = require("../database/db");

module.exports = db.sequelize.define(
  'meal_component', {
  id: {
    type: Sequelize.INTEGER(16).UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  ingredient_id: {
    type: Sequelize.INTEGER(12).UNSIGNED,
    allowNull: false,
    references: {
      model: 'ingredient',
      key: 'id'
    }
  },
  meal_id: {
    type: Sequelize.INTEGER(12).UNSIGNED,
    allowNull: false,
    references: {
      model: 'meal',
      key: 'id'
    }
  },
  amount: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  ingredient_unit_id: {
    type: Sequelize.INTEGER(12).UNSIGNED,
    allowNull: false,
    references: {
      model: 'ingredient_mass_unit',
      key: 'id'
    }
  }
}, {
  tableName: 'meal_component',
  timestamps: false
});
