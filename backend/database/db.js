const Sequelize = require("sequelize");
const config = require("../configs/db_config");
const db = {};

const sequelize = new Sequelize(
    config.SCHEMA,
    config.LOGIN,
    config.PASSWORD,
    {
        host: config.CONNECTION,
        dialect: config.DIALECT,
        define: {
            timestamps: false
        }
    }
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
