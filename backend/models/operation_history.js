/* jshint indent: 2 */

const Sequelize = require("sequelize");
const db = require("../database/db");

module.exports = db.sequelize.define(
    "operation_history",
    {
        id: {
            autoIncrement: true,
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: false,
            primaryKey: true,
        },
        operation: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false,
        },
        operation_date: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        new_object_status: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: true,
        },
        user_id: {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: true,
            references: {
                model: {
                    tableName: "user",
                },
                key: "id",
            },
        },
        entry_point: {
            type: Sequelize.STRING(32),
            allowNull: true,
        },
    },
    {
        Sequelize,
        tableName: "operation_history",
    }
);
