/* jshint indent: 2 */

const Sequelize = require("sequelize");
const db = require("../database/db");

module.exports = db.sequelize.define(
    "ingredient_operation",
    {
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
        operation_history_id: {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: false,
            references: {
                model: {
                    tableName: "operation_history",
                },
                key: "id",
            },
        },
    },
    {
        Sequelize,
        tableName: "ingredient_operation",
    }
);
