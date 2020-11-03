import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import TextFieldGroup from "../../common/TextFieldGroup";
import { validateUserRegister } from "../../../validation/user/register";

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            login: "",
            password: "",
            passwordConfirm: "",
            email: "",
            errors: {},
            isLoading: false,
            isSuccess: false,
            wasRequestSent: false
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onSubmit(event) {
        event.preventDefault();

        const validatation = validateUserRegister(this.state);
        if (validatation.isValid) {
            this.setState({
                isLoading: true,
                wasRequestSent: false,
                isSuccess: false,
                errors: {}
            });

            this.props.registerRequest(this.state).then(
                () => {
                    this.props.addFlashMessage({
                        type: "success",
                        text: "You have registered successfully"
                    });
                    this.setState({
                        isLoading: false,
                        wasRequestSent: true,
                        isSuccess: true
                    });
                },
                (err) => {
                    const { status, data } = err.response;
                    if (status === 500) {
                        setToErrorState(this, { general: data.general });
                    } else if (status === 404) {
                        setToErrorState(this, { general: data.general });
                    } else {
                        setToErrorState(this, data);
                    }
                }
            );
        } else {
            this.setState({
                errors: validatation.errors
            });
        }
    }

    render() {
        const { login, password, passwordConfirm, email, errors, isLoading, isSuccess, wasRequestSent } = this.state;

        return (
            <form onSubmit={this.onSubmit}>
                <h1>Register</h1>
                <TextFieldGroup
                    field="login"
                    label="Login"
                    value={login}
                    error={errors.login}
                    onChange={this.onChange}
                    disabled={isLoading}
                />
                <TextFieldGroup
                    field="password"
                    label="Password"
                    value={password}
                    error={errors.password}
                    onChange={this.onChange}
                    type="password"
                    disabled={isLoading}
                />
                <TextFieldGroup
                    field="passwordConfirm"
                    label="Password confirmation"
                    value={passwordConfirm}
                    error={errors.passwordConfirm}
                    onChange={this.onChange}
                    type="password"
                    disabled={isLoading}
                />
                <TextFieldGroup
                    field="email"
                    label="Email"
                    value={email}
                    error={errors.email}
                    onChange={this.onChange}
                    type="text"
                    disabled={isLoading}
                />
                <div className="form-group">
                    <button type="submit"
                        value="sign-in"
                        className="btn btn-primary"
                        disabled={isLoading}>
                        Register
                </button>
                </div>
                {errors.general && <div className="alert alert-danger">{errors.general}</div>}
                {isSuccess && wasRequestSent && <div className="alert alert-success">Account has been created</div>}
            </form>
        );
    }
}

RegisterForm.propTypes = {
    registerRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired
};

function setToErrorState(component, errors) {
    component.setState({
        isLoading: false,
        wasRequestSent: true,
        isSuccess: false,
        errors: errors
    })
}

export default connect(null)(RegisterForm);