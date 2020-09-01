import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import validateSignIn from "../../../validation/user/sign-in";
import TextFieldGroup from "../../common/TextFieldGroup";
import { signInRequest } from "../../../services/user.service";

class SignInForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            login: "",
            password: "",
            validationError: {},
            isLoading: false
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.isValid = this.isValid.bind(this);
    }

    isValid() {
        const { validationError, isValid } = validateSignIn(this.state);

        if (!isValid) {
            this.setState({ validationError });
        }

        return isValid;
    }

    onSubmit(event) {
        event.preventDefault();

        if (this.isValid()) {
            this.setState({ validationError: {}, isLoading: true });
            this.props.signInRequest(this.state).then(
                res => {
                    this.setState({
                        isLoading: false,
                        validationError: {}
                    });
                    
                },
                err => {
                    const {status, data} = err.response;
                    this.setState({
                        validationError: {
                            general: data.error
                        },
                        isLoading: false
                    })
                }
            );
        }
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        const { login, password, validationError, isLoading } = this.state;

        return (
            <div className="row">
                <form className="col-4 offset-4" onSubmit={this.onSubmit}>
                    <h1>Sign In</h1>
                    <TextFieldGroup
                        field="login"
                        label="Login"
                        value={login}
                        error={validationError.login}
                        onChange={this.onChange}
                    />
                    <TextFieldGroup
                        field="password"
                        label="Password"
                        value={password}
                        error={validationError.password}
                        onChange={this.onChange}
                        type="password"
                    />
                    <div className="form-group">
                        <button type="submit"
                            value="sign-in"
                            className="btn btn-primary"
                            disabled={isLoading}>
                            Login
                </button>
                    </div>
                    {validationError.general && <div className="alert alert-danger">{validationError.general}</div>}
                </form>
            </div>
        );
    }
}

SignInForm.propTypes = {
    signInRequest: PropTypes.func.isRequired
};

export default connect(null, { signInRequest: signInRequest })(SignInForm);