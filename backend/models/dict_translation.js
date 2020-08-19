const Sequelize = require("sequelize");
const db = require("../database/db");

module.exports = db.sequelize.define(
  'dict_translation', {
    id: {
      type: Sequelize.INTEGER(12).UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    type: {
      type: Sequelize.STRING(32),
      allowNull: false
    },
    code: {
      type: Sequelize.STRING(32),
      allowNull: false
    },
    language: {
      type: Sequelize.STRING(6),
      allowNull: false
    },
    translation: {
      type: Sequelize.STRING(128),
      allowNull: false
    }
  }, {
    tableName: 'dict_translation'
  });
