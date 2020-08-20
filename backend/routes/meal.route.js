const express = require("express");
const meals = express.Router();
const cors = require("cors");
const controller = require("../controllers/meal.controller");

meals.use(cors());
meals.get("/", controller.findSingle);
meals.post("/", controller.create);
meals.get("/ids", controller.findByIngredients);

module.exports = meals;