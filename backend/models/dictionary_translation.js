/* jshint indent: 2 */

const Sequelize = require("sequelize");
const db = require("../database/db");

module.exports = db.sequelize.define(
    "dictionary_translation",
    {
        id: {
            autoIncrement: true,
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: false,
            primaryKey: true,
        },
        type: {
            type: Sequelize.STRING(32),
            allowNull: false,
        },
        code: {
            type: Sequelize.STRING(32),
            allowNull: false,
        },
        language: {
            type: Sequelize.STRING(3),
            allowNull: false,
        },
        translation: {
            type: Sequelize.STRING(256),
            allowNull: false,
        },
    },
    {
        Sequelize,
        tableName: "dictionary_translation",
    }
);
