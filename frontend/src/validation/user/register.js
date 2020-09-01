import { isEmpty, isLength, equals, isEmail } from "validator";
import isEmptyObject from "lodash/isEmpty";
import FieldValidator from "password-validator";

const FIELD_IS_REQUIRED = "This field is required";
const EMAIL_IS_INVALID = "Email is invalid";
const PASSWORD_EQUALITY_INVALID = "Passwords must match"
const PASSWORD_NOT_VALID = "Password must be 8 length, contains at least one lowercase, uppercase letter and one digit";
const LOGIN_INVALID_CHARACTERS = "Login cannot contains white spaces and can contains special characters: [.-_]";
const LOGIN_LENGTH_NOT_VALID = "Login should be length from 6 to 20";

const loginSchemaCharacters = new FieldValidator();
loginSchemaCharacters.has().not().spaces()
    .has().not(/([!@#%^&*()+=/<>?\\,';:"{}\[\]`~])/g);

const passwordSchema = new FieldValidator();
passwordSchema.is().min(8)
    .is().max(32)
    .has().uppercase()
    .has().lowercase()
    .has().digits(1)
    .has().not().spaces();

export function validateUserRegister(data) {
    const { login, password, passwordConfirm, email } = data;
    let errors = {};

    if (isEmpty(login)) {
        errors.login = FIELD_IS_REQUIRED;
    } else if (!isLength(login, { min: 6, max: 20 })) {
        errors.login = LOGIN_LENGTH_NOT_VALID;
    } else if (!loginSchemaCharacters.validate(login)) {
        errors.login = LOGIN_INVALID_CHARACTERS;
    }

    if (isEmpty(password)) {
        errors.password = FIELD_IS_REQUIRED;
    } else if (!passwordSchema.validate(password)) {
        errors.password = PASSWORD_NOT_VALID;
    }

    if (isEmpty(passwordConfirm)) {
        errors.passwordConfirm = FIELD_IS_REQUIRED;
    } else if (!equals(password, passwordConfirm)) {
        errors.passwordConfirm = PASSWORD_EQUALITY_INVALID;
    }

    if (isEmpty(email)) {
        errors.email = FIELD_IS_REQUIRED;
    } else if (!isEmail(email)) {
        errors.email = EMAIL_IS_INVALID;
    }

    return {
        errors,
        isValid: isEmptyObject(errors)
    };
}