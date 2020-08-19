const Sequelize = require("sequelize");
const db = require("../database/db");

module.exports = db.sequelize.define(
  'meal', {
  id: {
    type: Sequelize.INTEGER(12).UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING(128),
    allowNull: false
  },
  difficulty_id: {
    type: Sequelize.INTEGER(2).UNSIGNED,
    allowNull: true,
    references: {
      model: 'difficulty',
      key: 'id'
    }
  },
  min_prepare_time: {
    type: Sequelize.INTEGER(4).UNSIGNED,
    allowNull: true
  },
  max_prepare_time: {
    type: Sequelize.INTEGER(4).UNSIGNED,
    allowNull: true
  },
  serves: {
    type: Sequelize.INTEGER(2).UNSIGNED,
    allowNull: true
  },
  creator_id: {
    type: Sequelize.INTEGER(16).UNSIGNED,
    allowNull: true,
    references: {
      model: 'user',
      key: 'id'
    }
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
  tableName: 'meal',
  timestamps: false
});
