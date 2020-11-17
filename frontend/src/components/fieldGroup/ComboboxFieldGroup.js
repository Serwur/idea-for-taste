import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const ComboboxFieldGroup = ({ id, className, field, options, label, error, type, onChange, disabled }) => {
    const optionElements = options ? options.map(option => <option value={option.value} key={option.value}>{option.name}</option>) : [];

    return (
        <div className={classnames("form-group", { "has-error": error }, { [`${className}`]: className })}>
            <label className="control-label">{label}</label>
            <select
                id={id}
                onChange={onChange}
                type={type}
                name={field}
                className="form-control"
                disabled={disabled}>
                {optionElements}
            </select>
            {error && <span className="help-block">{error}</span>}
        </div>
    );
};

ComboboxFieldGroup.propTypes = {
    id: PropTypes.number.isRequired,
    className: PropTypes.string,
    field: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    label: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    type: PropTypes.string
};

ComboboxFieldGroup.defaultProps = {

};

export default ComboboxFieldGroup;

export function option(value, name) {
    return {
        value,
        name
    };
}