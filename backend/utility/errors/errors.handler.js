const { UNIQUE_VALUE, UNKNOWN_ERROR } = require("./errors.db.constants");

exports.createSqlError = (type, field) => {
    switch (type) {
        case UNIQUE_VALUE:
            return `${field} already exists`;
        default:
            return UNKNOWN_ERROR;
    }
}

exports.createFriendlyServerError = (message) => {
    return `Ups...there was a problem by our side. Don't panic, on your side everything is fine =)
    Error problem: ${message}`;
}