const Sequelize = require("sequelize");
const db = require("../database/db");

module.exports = db.sequelize.define(
  'ingredient_mass_unit', {
    id: {
      type: Sequelize.INTEGER(12).UNSIGNED,
      allowNull: false,
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
    amount_unit_id: {
      type: Sequelize.INTEGER(2).UNSIGNED,
      allowNull: false,
      references: {
        model: 'amount_unit',
        key: 'id'
      }
    },
    mass: {
      type: Sequelize.FLOAT,
      allowNull: false
    }
  }, {
    tableName: 'ingredient_mass_unit',
    timestamps: false
  });
