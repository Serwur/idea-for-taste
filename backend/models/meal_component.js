/* jshint indent: 2 */

const Sequelize = require("sequelize");
const db = require("../database/db");

module.exports = db.sequelize.define(
    "meal_component",
    {
        id: {
            autoIncrement: true,
            type: Sequelize.BIGINT.UNSIGNED,
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
        meal_id: {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: false,
            references: {
                model: {
                    tableName: "meal",
                },
                key: "id",
            },
        },
        ingredient_unit_id: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: {
                    tableName: "ingredient_unit",
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
        tableName: "meal_component",
    }
);
