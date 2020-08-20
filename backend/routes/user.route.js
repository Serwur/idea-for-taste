const express = require("express");
const users = express.Router();
const cors = require("cors");
const controller = require("../controllers/user.controller");

users.use(cors());

users.post("/login", controller.login);
users.post("/register", controller.register);

module.exports = users;