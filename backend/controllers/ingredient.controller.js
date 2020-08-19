const Ingredient = require("../models/ingredient");
const { handleStatus500, handleStatus400IdNull } = require("../utility/handler");
const { like } = require("sequelize").Op;
const Controllers = require("./controllers.common");

exports.create = (req, res) => {
    const { name } = req.body;
    if (!name) {
        handleStatus400IdNull(res);
        return;
    }

    const ingredient = {
        name: name
    };

    Ingredient.create(ingredient)
        .then(Controllers.defHandleData(req, res))
        .catch(Controllers.defHandleErr(req, res));
};

exports.findSingle = Controllers.findByPk(Ingredient);

exports.findAllByName = (req, res) => {
    const name = req.query.name;

    if (!name) {
        res.status(400).send({
            message: "Name cannot be empty"
        });
        return;
    }

    Ingredient.findAll({
        where: {
            name: {
                [like]: `%${name}%`
            }
        }
    }).then(ingredient => {
        if (ingredient) {
            res.json(ingredient);
        } else {
            res.sendStatus(404);
        }
    }).catch(err => {
        handleStatus500(res, `${err}`);
    });
};

exports.updateById = (req, res) => {
    const id = req.params.id;

    if (!id) {
        handleStatus400IdNull(res);
        return;
    }

    Ingredient.update(req.body, {
        where: {
            id: id
        }
    }).then(num => {
        if (Number(num) === 1) {
            res.send({
                message: `Successfully updated ingredient with id: ${id}. Size: ${num}`
            })
        } else {
            res.send({
                message: `Cannot update ingredient with id: ${id}. Propably ingredient with such id does not exists. Size: ${num}`
            });
        }
    }).catch(err => {
        handleStatus500(res, `Error while updating ingredient with id: ${id}`);
    })
}

exports.delete = (req, res) => {
    const id = req.params.id;

    if (!id) {
        handleStatus400IdNull(res);
        return;
    }

    Ingredient.destroy({
        where: {
            id: id
        }
    }).then(nums => {
        res.send(`Deleted ${nums} ingredients from db`);
    }).catch(err => {
        handleStatus500(res, err);
    });
}