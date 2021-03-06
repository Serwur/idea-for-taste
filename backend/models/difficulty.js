/* jshint indent: 2 */

const Sequelize = require("sequelize");
const db = require("../database/db");

module.exports = db.sequelize.define(
    "difficulty",
    {
        id: {
            autoIncrement: true,
            type: Sequelize.BIGINT.UNSIGNED,
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
        tableName: "difficulty",
    }
);
