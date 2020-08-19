const express = require("express");
const mealComponents = express.Router();
const cors = require("cors");
const controller = require("../controllers/meal_components.controller");

mealComponents.use(cors());
mealComponents.get("/", controller.findSingle);
mealComponents.get("/byIngredients", controller.findMealComponentsByIngredients);
mealComponents.post("/", controller.create);

module.exports = mealComponents;