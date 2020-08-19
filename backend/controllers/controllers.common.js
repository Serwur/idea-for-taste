const { handleStatus500, handleStatus400IdNull } = require("../utility/handler");

exports.findByPk = (model) => {
    return (req, res) => {
        const id = req.query.id;

        if (!id) {
            handleStatus400IdNull(res);
            return;
        }

        model.findByPk(id)
            .then(data => {
                if (data) {
                    res.json(data);
                } else {
                    res.sendStatus(404);
                }
            }).catch(err => {
                handleStatus500(res, `Error while retrieving object with id ${id}. ${err}`)
            });
    }
}

exports.defHandleData = (req, res) => {
    return (data) => {
        if (data) {
            res.json(data);
        } else {
            res.sendStatus(404);
        }
    }
}

exports.defHandleErr = (req, res) => {
    return (err) => {
        handleStatus500(res, err);
    }
}