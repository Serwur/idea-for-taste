import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import validateInput from "../../utility/validateInput";
import TextFieldGroup from "../common/TextFieldGroup.component";
import { loginRequest } from "../../services/user.service";

class LoginForm extends React.Component {
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
        const { validationError, isValid } = validateInput(this.state);

        if (!isValid) {
            this.setState({ validationError });
        }

        return isValid;
    }

    onSubmit(event) {
        event.preventDefault();
        if (this.isValid()) {
            this.setState({ validationError: {}, isLoading: true });
            this.props.login(this.state).then(
                res => this.context.router.push("/"),
                err => this.setState({
                    validationError: {
                        general: "Ups... propably there is problem with connection"
                    },
                    isLoading: false
                })
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
            <form className="container m-2" onSubmit={this.onSubmit}>
                <h1>Login</h1>
                <TextFieldGroup
                    field="login"
                    label="Login name / Email"
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
                {validationError.general ? <div className="alert alert-danger">{validationError.general}</div> : <></>}
            </form>
        );
    }
}

LoginForm.propTypes = {
    login: PropTypes.func.isRequired
};

LoginForm.contextTypes = {
    router: PropTypes.object.isRequired
}

export default connect(null, { login: loginRequest })(LoginForm);