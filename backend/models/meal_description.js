const Sequelize = require("sequelize");
const db = require("../database/db");

module.exports = db.sequelize.define(
    "meal_description",
    {
        id: {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: false,
            primaryKey: true,
        },
        meal_id: {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: false,
            references: {
                model: "meal",
                key: "id",
            },
        },
        short_description: {
            type: Sequelize.STRING(255),
            allowNull: true,
        },
        prepare_description: {
            type: "BLOB",
            allowNull: true,
        },
    },
    {
        tableName: "meal_description",
    }
);
