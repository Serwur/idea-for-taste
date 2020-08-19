const MealComponents = require("../models/meal_component");
const { handleStatus500 } = require("../utility/handler");
const Controllers = require("./controllers.common");
const { Op } = require("sequelize");

exports.findSingle = Controllers.findByPk(MealComponents);

exports.findMealComponentsByIngredients = (req, res) => {
    if (!req.query.ingrIds) {
        res.status(400).send({
            message: "Not given any ingredient id"
        });
        return;
    }

    const ingrIds = req.query.ingrIds.split(",").map(id => Number(id));

    MealComponents.findAll({
        where: {
            ingredient_id: {
                [Op.in]: ingrIds
            }
        }
    }).then(mealComponents => {
        if (mealComponents) {
            res.json(mealComponents);
        } else {
            res.sendStatus(404);
        }
    }).catch(err => {
        handleStatus500(res, `${err}`);
    });
};

exports.create = (req, res) => {
    const { ingredient_id, meal_id, amount, ingredient_unit_id } = req.body;
    if (!ingredient_id || !meal_id || !amount || !ingredient_unit_id) {
        res.status(400).send({
            message: `None of values can be empty. 
            ingredient_id: ${ingredient_id}
            meal_id: ${meal_id}, 
            amount: ${amount}
            ingredient_unit_id: ${ingredient_unit_id}`
        });
        return;
    }

    const mealComponent = { ...req.body };
    MealComponents.create(mealComponent)
        .then(Controllers.defHandleData(req, res))
        .catch(Controllers.defHandleErr(req, res));
}