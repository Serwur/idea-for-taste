/* jshint indent: 2 */

const Sequelize = require("sequelize");
const db = require("../database/db");

module.exports = db.sequelize.define(
    "amount_unit",
    {
        id: {
            autoIncrement: true,
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
        },
        code: {
            type: Sequelize.STRING(32),
            allowNull: false,
            unique: true,
        },
    },
    {
        Sequelize,
        tableName: "amount_unit",
    }
);
