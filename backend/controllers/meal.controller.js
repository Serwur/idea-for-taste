const Meal = require("../models/meal");
const MealComponent = require("../models/meal_component");
const Controllers = require("./controllers.common");
const { Op } = require("sequelize");
const { handleStatus } = require("../utility/handler/status-handler");
const { STATUS_CODES } = require("../utility/errors/errors.status.constants");

exports.findSingle = Controllers.findByPk(Meal);

exports.create = (req, res) => {
    if (req.body.name) {
        const meal = { ...req.body };
        Meal.create(meal)
            .then(Controllers.defHandleData(req, res))
            .catch(Controllers.defHandleErr(req, res));
    } else {
        handleStatus(res, STATUS_CODES.CLIENT_ERROR.BAD_REQUEST, "Meal name cannot be null");
    }
};

exports.findByIngredients = (req, res) => {
    if (req.query.ingrIds) {
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
    } else {
        handleStatus(res, STATUS_CODES.CLIENT_ERROR.BAD_REQUEST, "Ingredient ids cannot be empty nor null");
    }
}

exports.findAllByIds = (req, res) => {
    handleStatus(res, STATUS_CODES.SERVER_ERROR.NOT_IMPLEMENTED);
}