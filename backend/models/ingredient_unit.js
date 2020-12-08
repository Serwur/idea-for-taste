/* jshint indent: 2 */

const Sequelize = require("sequelize");
const db = require("../database/db");

module.exports = db.sequelize.define(
    "ingredient_unit",
    {
        id: {
            autoIncrement: true,
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
        },
        ingredient_id: {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: false,
            references: {
                model: {
                    tableName: "ingredient",
                },
                key: "id",
            },
        },
        amount_unit_id: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: {
                    tableName: "amount_unit",
                },
                key: "id",
            },
        },
        amount: {
            type: Sequelize.FLOAT,
            allowNull: false,
        },
    },
    {
        Sequelize,
        tableName: "ingredient_unit",
    }
);
