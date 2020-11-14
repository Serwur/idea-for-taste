import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import validateSignIn from "../../../validation/user/sign-in";
import TextFieldGroup from "../../common/TextFieldGroup";
import { signInRequest } from "../../../services/user.service";
import history from "../../../history";
import { Link } from "react-router-dom";
import { hideSignInModal } from "./SignInModal";
import { LoopCircleLoading as Loading } from "react-loadingg";
import { renderLoading } from "../../common/common";
import { NAV_URLS } from "../../../utility/constants";

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
            setTimeout(() => {
                this.props.signInRequest(this.state).then(
                    res => {
                        hideSignInModal();
                        history.push(NAV_URLS.HOME);
                    },
                    err => {
                        let errorMessage = null;
                        
                        if (err.response) {
                            errorMessage = err.response.data.error;
                        } else {
                            errorMessage = err.message;
                        }

                        this.setState({
                            validationError: {
                                general: errorMessage
                            },
                            isLoading: false
                        });
                    }
                );
            }, 500);
        }
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        const { login, password, validationError, isLoading } = this.state;
        const { flashMessages } = this.props;

        return (
            <>
                {isLoading && renderLoading(Loading)}
                <form className="d-flex flex-column align-items-center"
                    onSubmit={this.onSubmit}>
                    {validationError.general && <div className="alert alert-danger">{validationError.general}</div>}
                    {flashMessages.length > 0 && <div className="alert alert-danger">{flashMessages[0].text}</div>}
                    <TextFieldGroup
                        field="login"
                        label="Login or E-mail"
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
                    <Link to="/register" onClick={() => hideSignInModal()}>Don't have an account?</Link>
                    <Link to="/account-recover" onClick={() => hideSignInModal()}>Forgot a password?</Link>
                </form>
            </>
        );
    }
}

SignInForm.propTypes = {
    signInRequest: PropTypes.func.isRequired,
    flashMessages: PropTypes.array
};

function mapStateToProps(state) {
    return {
        flashMessages: state.flashMessages
    }
}

export default connect(mapStateToProps, { signInRequest })(SignInForm);