exports.STATUS_CODES = {
    SUCCESS: {
        OK: 200,
        CREATED: 201,
        NO_CONTENT: 204
    },
    REDIRECTION: {
        NOT_MODIFIED: 304
    },
    CLIENT_ERROR: {
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        CONFLICT: 409
    },
    SERVER_ERROR: {
        INTERNAL: 500,
        NOT_IMPLEMENTED: 501
    }
}

exports.STATUS_CODES_MESSAGES = new Map([
    [200, "OK"],
    [201, "Created"],
    [204, "No content"],
    [304, "Not modified"],
    [400, "Bad request"],
    [401, "Unauthorized"],
    [403, "Forbidden"],
    [404, "Not found"],
    [409, "Conflict"],
    [500, "Internal server error"],
    [501, "Not implemented functionality"]
]);