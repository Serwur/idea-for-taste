const { UNIQUE_VALUE, UNKNOWN_ERROR } = require("./errors.db.constants");

exports.createErrorMessage = (type, field) => {
    switch (type) {
        case UNIQUE_VALUE:
            return `${field} already exists`;
        default:
            return UNKNOWN_ERROR;
    }
}