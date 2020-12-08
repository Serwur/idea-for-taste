/* jshint indent: 2 */

const Sequelize = require("sequelize");
const db = require("../database/db");

module.exports = db.sequelize.define(
    "ingredient",
    {
        id: {
            autoIncrement: true,
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: false,
            primaryKey: true,
        },
        kcal: {
            type: Sequelize.FLOAT,
            allowNull: false,
            defaultValue: 0,
        },
        name: {
            type: Sequelize.STRING(128),
            allowNull: false,
        },
        carbohydrate: {
            type: Sequelize.FLOAT,
            allowNull: false,
            defaultValue: 0,
        },
        protein: {
            type: Sequelize.FLOAT,
            allowNull: false,
            defaultValue: 0,
        },
        fat: {
            type: Sequelize.FLOAT,
            allowNull: false,
            defaultValue: 0,
        },
        water: {
            type: Sequelize.FLOAT,
            allowNull: false,
            defaultValue: 0,
        },
        roughage: {
            type: Sequelize.FLOAT,
            allowNull: false,
            defaultValue: 0,
        },
        sugar: {
            type: Sequelize.FLOAT,
            allowNull: false,
            defaultValue: 0,
        },
        alcohol: {
            type: Sequelize.FLOAT,
            allowNull: false,
            defaultValue: 0,
        },
        organic_acid: {
            type: Sequelize.FLOAT,
            allowNull: false,
            defaultValue: 0,
        },
        salt: {
            type: Sequelize.FLOAT,
            allowNull: false,
            defaultValue: 0,
        },
        sys_create_date: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        sys_update_date: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        creator_id: {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: true,
            references: {
                model: {
                    tableName: "user",
                },
                key: "id",
            },
        },
        status: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: true,
            defaultValue: 1,
        },
        description: {
            type: Sequelize.STRING(1024),
            allowNull: true,
            defaultValue: ""
        }
    },
    {
        Sequelize,
        tableName: "ingredient",
    }
);
