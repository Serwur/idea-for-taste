const Sequelize = require("sequelize");
const db = require("../database/db");

module.exports = db.sequelize.define(
  'ingredient_description', {
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
    short_description: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    prepare_description: {
      type: "BLOB",
      allowNull: true
    }
  }, {
    tableName: 'ingredient_description'
  });
