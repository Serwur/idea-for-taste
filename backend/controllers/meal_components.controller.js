const MealComponents = require("../models/meal_component");
const Controllers = require("./controllers.common");
const { Op } = require("sequelize");
const { handleStatus, handleStatusJson, handleStatusObject } = require("../utility/handler/status-handler");
const { STATUS_CODES } = require("../utility/errors/errors.status.constants");

exports.findSingle = Controllers.findByPk(MealComponents);

exports.findMealComponentsByIngredients = (req, res) => {
    if (req.query.ingrIds) {
        const ingrIds = req.query.ingrIds.split(",").map(id => Number(id));

        MealComponents.findAll({
            where: {
                ingredient_id: {
                    [Op.in]: ingrIds
                }
            }
        }).then(mealComponents => {
            if (mealComponents) {
                handleStatusJson(res, STATUS_CODES.SUCCESS.OK, mealComponents);
            } else {
                handleStatus(res, STATUS_CODES.CLIENT_ERROR.NOT_FOUND);
            }
        }).catch(err => {
            handleStatus(res, STATUS_CODES.SERVER_ERROR.INTERNAL, err);
        });
    } else {
        handleStatus(res, STATUS_CODES.CLIENT_ERROR.BAD_REQUEST, "Ingredient ids cannot be null nor empty");
    }
};

exports.create = (req, res) => {
    const { ingredient_id, meal_id, amount, ingredient_unit_id } = req.body;

    if (ingredient_id && meal_id && amount && ingredient_unit_id) {
        const mealComponent = { ...req.body };
        MealComponents.create(mealComponent)
            .then(Controllers.defHandleData(req, res))
            .catch(Controllers.defHandleErr(req, res));
    } else {
        handleStatusObject(res, STATUS_CODES.CLIENT_ERROR.BAD_REQUEST, {
            message: `None of values can be empty. 
            ingredient_id: ${ingredient_id}
            meal_id: ${meal_id}, 
            amount: ${amount}
            ingredient_unit_id: ${ingredient_unit_id}`
        });
    }
}