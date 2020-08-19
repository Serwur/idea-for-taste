const User = require("../models/user");
const { handleStatus500, handleStatus400IdNull, handleStatus400 } = require("../utility/handler");
const Controllers = require("./controllers.common");
const { Op } = require("sequelize");

exports.auth = (req, res) => {
    const {login, password} = req.body;
}