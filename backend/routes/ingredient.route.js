const express = require("express");
const ingredients = express.Router();
const cors = require("cors");
const controller = require("../controllers/ingredient.controller");

ingredients.use(cors());
ingredients.get("/", controller.findSingle);
ingredients.post("/", controller.create);
ingredients.get("/name", controller.findAllByName);
ingredients.put("/:id",  controller.updateById);
ingredients.delete("/:id", controller.delete);

module.exports = ingredients;