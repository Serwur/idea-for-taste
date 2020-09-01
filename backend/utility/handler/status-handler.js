const { STATUS_CODES_MESSAGES } = require("../errors/errors.status.constants");

exports.handleStatus = (res, code, message) => {
    res.status(code).send(STATUS_CODES_MESSAGES.get(code).concat(message ? `. ${message}` : ""));
}

exports.handleStatusJson = (res, code, data) => {
    res.status(code).json(data);
}

exports.handleStatusObject = (res, code, obj) => {
    res.status(code).send(obj);
}