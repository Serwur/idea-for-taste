const Sequelize = require("sequelize");
const db = require("../database/db");

module.exports = db.sequelize.define(
  'difficulty', {
    id: {
      type: Sequelize.INTEGER(2).UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    code: {
      type: Sequelize.STRING(32),
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'difficulty'
  });
