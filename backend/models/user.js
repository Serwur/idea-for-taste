/* jshint indent: 2 */

const Sequelize = require("sequelize");
const db = require("../database/db");

module.exports = db.sequelize.define(
    "user",
    {
        id: {
            autoIncrement: true,
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: false,
            primaryKey: true,
        },
        login: {
            type: Sequelize.STRING(32),
            allowNull: false,
            unique: true,
        },
        email: {
            type: Sequelize.STRING(128),
            allowNull: false,
            unique: true,
        },
        password: {
            type: Sequelize.STRING(32),
            allowNull: false,
        },
        salt: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false,
        },
        sys_create_date: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        last_login_date: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        logins_amount: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
        },
        status: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 1,
        },
    },
    {
        Sequelize,
        tableName: "user",
    }
);
