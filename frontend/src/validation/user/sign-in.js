import Validator from "validator";
import isEmpty from "lodash/isEmpty";

export default function validateSignIn(data) {
    const validationError = {};

    if (Validator.isEmpty(data.login)) {
        validationError.login = "This field is required";
    }

    if (Validator.isEmpty(data.password)) {
        validationError.password = "This field is required";
    }

    return {
        validationError,
        isValid: isEmpty(validationError),
    };
}
