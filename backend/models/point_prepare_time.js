/* jshint indent: 2 */

const Sequelize = require("sequelize");
const db = require("../database/db");

module.exports = db.sequelize.define(
    "point_prepare_time",
    {
        id: {
            autoIncrement: true,
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: false,
            primaryKey: true,
        },
        prepare_point_id: {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: false,
            references: {
                model: {
                    tableName: "meal_prepare_point",
                },
                key: "id",
            },
        },
        time: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false,
        },
        is_about: {
            type: Sequelize.INTEGER(1),
            allowNull: false,
        },
    },
    {
        Sequelize,
        tableName: "point_prepare_time",
    }
);
