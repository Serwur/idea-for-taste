const Validator = require("validator");
const isEmpty = require("lodash/isEmpty");

const TEXT_FIELD_IS_REQUIRED = "This field is required";
const TEXT_EMAIL_IS_INVALID = "Email is invalid";
const TEXT_PASSWORD_EQUALITY_INVALID = "Passwords must match"

exports.validateUserRegister = (data) => {
    const { login, password, passwordConfirm, email } = data;
    let errors = {};

    if (Validator.isEmpty(login)) {
        errors.login = TEXT_FIELD_IS_REQUIRED;
    }

    if (Validator.isEmpty(password)) {
        errors.password = TEXT_FIELD_IS_REQUIRED;
    }

    if (Validator.isEmpty(passwordConfirm)) {
        errors.passwordConfirm = TEXT_FIELD_IS_REQUIRED;
    } else if (!Validator.equals(password, passwordConfirm)) {
        errors.passwordConfirm = TEXT_PASSWORD_EQUALITY_INVALID;
    }

    if (Validator.isEmpty(email)) {
        errors.email = TEXT_FIELD_IS_REQUIRED;
    } else if (!Validator.isEmail(email)) {
        errors.email = TEXT_EMAIL_IS_INVALID;
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}
