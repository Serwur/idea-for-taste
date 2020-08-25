const Sequelize = require("sequelize");
const config = require("./config");
const db = {};

const sequelize = new Sequelize(
    config.SCHEMA,
    config.LOGIN,
    config.PASSWORD,
    config.CONNECTION
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;