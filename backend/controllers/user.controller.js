const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../configs/tokens_config");

const User = require("../models/user");
const Controllers = require("./controllers.common");
const { createSqlError: createSqlError, createFriendlyServerError } = require("../utility/errors/errors.handler");
const { handleStatus, handleStatusObject, handleStatusJson } = require("../utility/handler/status-handler");
const { STATUS_CODES } = require("../utility/errors/errors.status.constants");

exports.signIn = (req, res) => {
    const { login: identifier, password } = req.body;

    getUser(identifier).then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign({
                id: user.id,
                username: user.login
            }, config.JWT_SECRET);

            handleStatusJson(res, STATUS_CODES.SUCCESS.OK, { token });

        } else {
            handleStatusObject(res, STATUS_CODES.CLIENT_ERROR.UNAUTHORIZED, {
                error: "Wrong login/email or password"
            });
        }
    }).catch(err => {
        console.log(err);
        handleStatus(res, STATUS_CODES.SERVER_ERROR.INTERNAL, err);
    });
}

exports.register = (req, res) => {
    const { login, password, email } = req.body;
    bcrypt.hash(password, 10, (err, hashedPass) => {
        if (err) {
            handleStatus(res, STATUS_CODES.SERVER_ERROR.INTERNAL, err);
        } else {
            const user = {
                login,
                password: hashedPass,
                email,
                user_type_id: 3
            };

            User.create(user)
                .then(Controllers.defHandleData(req, res))
                .catch(err => {
                    const { type, path } = err.errors[0];
                    res.status(400).json({ general: createSqlError(type, path) });
                });
        }
    });
}

const doesUserExists = (identifier) => {
    return User.findOne({
        where: {
            [Op.or]: [
                { login: identifier },
                { email: identifier }
            ]
        }
    }).then((user) => {
        return !!user;
    }).catch((err) => {
        throw err;
    });
}

const getUser = (identifier) => {
    return User.findOne({
        where: {
            [Op.or]: [
                { login: identifier },
                { email: identifier }
            ]
        }
    }).then((user) => {
        return user;
    }).catch((err) => {
        throw err;
    });
}