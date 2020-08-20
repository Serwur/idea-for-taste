import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import TextFieldGroup from "../common/TextFieldGroup.component";
import { registerRequest } from "../../services/user.service";

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

        this.setState({
            isLoading: true,
            wasRequestSent: false,
            isSuccess: false,
            errors: {}
        });

        this.props.register(this.state).then(
            () => {
                this.setState({
                    isLoading: false,
                    wasRequestSent: true,
                    isSuccess: true,
                    errors: {}
                });
            },
            (err) => {
                console.log(JSON.stringify(err.response, null, 3))
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
    }

    render() {
        const { login, password, passwordConfirm, email, errors, isLoading, isSuccess, wasRequestSent } = this.state;

        return (
            <form className="container m-2" onSubmit={this.onSubmit}>
                <h1>Register</h1>
                <TextFieldGroup
                    field="login"
                    label="Login"
                    value={login}
                    error={errors.login}
                    onChange={this.onChange}
                />
                <TextFieldGroup
                    field="password"
                    label="Password"
                    value={password}
                    error={errors.password}
                    onChange={this.onChange}
                    type="password"
                />
                <TextFieldGroup
                    field="passwordConfirm"
                    label="Password confirmation"
                    value={passwordConfirm}
                    error={errors.passwordConfirm}
                    onChange={this.onChange}
                    type="password"
                />
                <TextFieldGroup
                    field="email"
                    label="Email"
                    value={email}
                    error={errors.email}
                    onChange={this.onChange}
                    type="text"
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
    register: PropTypes.func.isRequired
};

export default connect(null, { register: registerRequest })(RegisterForm);

function setToErrorState(component, errors) {
    component.setState({
        isLoading: false,
        wasRequestSent: true,
        isSuccess: false,
        errors: errors
    })
}