const { STATUS_CODES } = require("../utility/errors/errors.status.constants");
const { handleStatus, handleStatusJson } = require("../utility/handler/status-handler");

exports.findByPk = (model, errMessages) => {
    return (req, res) => {
        const errMess = errMessages ? errMessages : {
            s400: "Bad request",
            s404: "Not found",
            s500: "Internal server error. Passed ID cannot be null."
        };
        const id = req.query.id;

        if (id) {
            model.findByPk(id)
                .then(data => {
                    if (data) {
                        res.status(200).json(data);
                    } else {
                        handleStatus(res, STATUS_CODES.CLIENT_ERROR.NOT_FOUND);
                    }
                }).catch(() => {
                    handleStatus(res, STATUS_CODES.SERVER_ERROR.INTERNAL);
                });
        } else {
            handleStatus(res, STATUS_CODES.SERVER_ERROR.INTERNAL);
        }
    }
}

exports.defHandleData = (req, res) => {
    return (data) => {
        if (data) {
            handleStatusJson(res, STATUS_CODES.SUCCESS.CREATED, data);
        } else {
            handleStatus(res, STATUS_CODES.CLIENT_ERROR.NOT_FOUND);
        }
    }
}

exports.defHandleErr = (req, res) => {
    return (err) => {
        handleStatus(res, STATUS_CODES.SERVER_ERROR.INTERNAL, err);
    }
}