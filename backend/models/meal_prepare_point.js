/* jshint indent: 2 */

const Sequelize = require("sequelize");
const db = require("../database/db");

module.exports = db.sequelize.define(
    "meal_prepare_point",
    {
        id: {
            autoIncrement: true,
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: false,
            primaryKey: true,
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
        title: {
            type: Sequelize.STRING(32),
            allowNull: false,
        },
        order_unit: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false,
        },
    },
    {
        Sequelize,
        tableName: "meal_prepare_point",
    }
);
