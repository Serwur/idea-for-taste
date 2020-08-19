exports.handleStatus500 = (res, message) => {
    res.status(500).send({
        message: message
    });
};

exports.handleStatus400 = (res, message) => {
    res.status(400).send({
        message: message
    })
};

exports.handleStatus400IdNull = (res) => {
    res.status(400).send({
        message: "Id cannot be empty"
    })
}