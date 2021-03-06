/* jshint indent: 2 */

const Sequelize = require("sequelize");
const db = require("../database/db");

module.exports = db.sequelize.define(
    "meal",
    {
        id: {
            autoIncrement: true,
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING(128),
            allowNull: false,
        },
        serves: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: true,
        },
        total_time: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: true,
        },
        description: {
            type: Sequelize.STRING(512),
            allowNull: false,
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
        difficulty_id: {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: true,
            references: {
                model: {
                    tableName: "difficulty",
                },
                key: "id",
            },
        },
        status: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: true,
            defaultValue: 1,
        },
    },
    {
        Sequelize,
        tableName: "meal",
    }
);
