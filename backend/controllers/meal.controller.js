const Meal = require("../models/meal");
const MealComponent = require("../models/meal_component");
const { handleStatus500, handleStatus400IdNull, handleStatus400 } = require("../utility/handler");
const Controllers = require("./controllers.common");
const { Op } = require("sequelize");

exports.findSingle = Controllers.findByPk(Meal);

exports.create = (req, res) => {
    if (!req.body.name) {
        handleStatus400(res, "Name cannot be null");
        return;
    }

    const meal = { ...req.body };
    Meal.create(meal)
        .then(Controllers.defHandleData(req, res))
        .catch(Controllers.defHandleErr(req, res));
};

exports.findByIngredients = (req, res) => {
    if (!req.query.ingrIds) {
        handleStatus400(res, "Ingredient ids cannot be null");
        return;
    }

    const ingrIds = req.query.ingrIds.split(",").map(id => Number(id));
    Meal.hasMany(MealComponent, { foreignKey: "meal_id" });
    MealComponent.belongsTo(Meal, { foreignKey: "meal_id" });

    Meal.findAll({
        include: [{
            model: MealComponent,
            required: true,
            where: {
                ingredient_id: {
                    [Op.in]: [...ingrIds]
                }
            }
        }]
    }).then(Controllers.defHandleData(req, res))
        .catch(Controllers.defHandleErr(req, res));
}

exports.findAllByIds = (req, res) => {
    if (!req.query.mealIds) {
        handleStatus400(res, "Ingredient ids cannot be null");
        return;
    }


}