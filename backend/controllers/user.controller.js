const User = require("../models/user");
const { handleStatus500, handleStatus400IdNull, handleStatus400 } = require("../utility/handler");
const Controllers = require("./controllers.common");
const { Op } = require("sequelize");
const userValidator = require("../utility/validation/user.validation");
const { createErrorMessage } = require("../utility/errors/errors.handler");

exports.login = (req, res) => {
    const { login, password } = req.body;
    console.log(JSON.stringify(req.body));
}

exports.register = (req, res) => {
    const { errors, isValid } = userValidator.validateUserRegister(req.body);

    if (!isValid) {
        console.log(`Register denined. ${JSON.stringify(errors)}`);
        res.status(400).json(errors);
    } else {
        const { login, password, email } = req.body;

        const user = {
            login,
            password,
            email,
            user_type_id: 3
        };

        User.create(user)
            .then(Controllers.defHandleData(req, res))
            .catch(err => {
                const { type, path } = err.errors[0];
                res.status(500).json({ general: createErrorMessage(type, path) });
            });
    }
}