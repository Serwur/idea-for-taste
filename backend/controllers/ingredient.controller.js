const Ingredient = require("../models/ingredient");
const { like } = require("sequelize").Op;
const Controllers = require("./controllers.common");
const { handleStatus, handleStatusObject, handleStatusJson } = require("../utility/handler/status-handler");
const { STATUS_CODES } = require("../utility/errors/errors.status.constants");

exports.findSingle = Controllers.findByPk(Ingredient);

exports.create = (req, res) => {
    const { name } = req.body;
    if (name) {
        Ingredient.create(req.body)
            .then(Controllers.defHandleData(req, res))
            .catch(Controllers.defHandleErr(req, res));
    } else {
        handleStatus(res, STATUS_CODES.SERVER_ERROR.INTERNAL);
    }
};

exports.findAllByName = (req, res) => {
    const name = req.query.name;

    if (name) {
        Ingredient.findAll({
            where: {
                name: {
                    [like]: `%${name}%`
                }
            }
        }).then(ingredients => {
            if (ingredients) {
                handleStatusJson(res, STATUS_CODES.SUCCESS.OK, ingredients);
            } else {
                handleStatus(res, STATUS_CODES.CLIENT_ERROR.NOT_FOUND);
            }
        }).catch(err => {
            handleStatus(res, STATUS_CODES.SERVER_ERROR.INTERNAL, err);
        });
    } else {
        handleStatusObject(res, STATUS_CODES.CLIENT_ERROR.BAD_REQUEST, {
            message: "Name cannot be empty"
        });
    }
};

exports.updateById = (req, res) => {
    const id = req.params.id;

    if (id) {
        Ingredient.update(req.body, {
            where: {
                id
            },
            fields: ["name", "protein", "fat", "carbohydrate", "alcohol",
                "roughage", "sugar", "organic_acid", "water", "salt"]
        }).then(ingredients => {
            if (ingredients.length === 1) {
                handleStatusJson(res, STATUS_CODES.SUCCESS.OK);
            } else {
                handleStatusObject(res, STATUS_CODES.CLIENT_ERROR.NOT_FOUND, {
                    message: `Cannot update ingredient with id: ${id}. Found objects: ${ingredients.length}`
                });
            }
        }).catch(err => {
            handleStatus(res, STATUS_CODES.SERVER_ERROR.INTERNAL, err);
        })
    } else {
        handleStatus(res, STATUS_CODES.CLIENT_ERROR.BAD_REQUEST);
    }
}

exports.delete = (req, res) => {
    const id = req.params.id;

    if (id) {
        Ingredient.destroy({
            where: {
                id: id
            }
        }).then(count => {
            if (Number(count) > 0) {
                handleStatus(res, STATUS_CODES.SUCCESS.OK);
            } else {
                handleStatus(res, STATUS_CODES.CLIENT_ERROR.NOT_FOUND);
            }
        }).catch(err => {
            handleStatus(res, res, STATUS_CODES.SERVER_ERROR.INTERNAL, err);
        });
    } else {
        handleStatus(res, STATUS_CODES.CLIENT_ERROR.BAD_REQUEST);
    }
}