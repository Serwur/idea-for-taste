import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const TextFieldGroup = ({ className, field, value, label, error, type, onChange, checkUserExists, placeholder, disabled }) => {
    return (
        <div className={classnames("form-group", { "has-error": error }, { [`${className}`]: className })}>
            <label className="control-label">{label}</label>
            <input
                onChange={onChange}
                onBlur={checkUserExists}
                value={value}
                type={type}
                name={field}
                className="form-control"
                placeholder={placeholder}
                disabled={disabled}
            />
            {error && <span className="help-block">{error}</span>}
        </div>
    );
};

TextFieldGroup.propTypes = {
    className: PropTypes.string,
    field: PropTypes.string.isRequired,
    value: PropTypes.string,
    label: PropTypes.string.isRequired,
    error: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    checkUserExists: PropTypes.func,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool
}

TextFieldGroup.defaultProps = {
    type: "text"
};

export default TextFieldGroup;