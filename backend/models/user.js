const Sequelize = require("sequelize");
const db = require("../database/db");

module.exports = db.sequelize.define(
  'user', {
    id: {
      type: Sequelize.INTEGER(16).UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    login: {
      type: Sequelize.STRING(32),
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING(256),
      allowNull: false,
      unique: true
    },
    user_type_id: {
      type: Sequelize.INTEGER(2).UNSIGNED,
      allowNull: false,
      references: {
        model: 'user_type',
        key: 'id'
      }
    },
    sys_create_date: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    last_login_date: {
      type: Sequelize.DATE,
      allowNull: true
    },
    login_amount: {
      type: Sequelize.INTEGER(8),
      allowNull: true,
      defaultValue: '0'
    }
  }, {
    tableName: 'user'
  });
