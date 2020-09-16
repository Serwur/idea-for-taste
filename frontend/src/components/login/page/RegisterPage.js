import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import RegisterForm from "../common/RegisterForm";
import { registerRequest } from "../../../services/user.service";
import { addFlashMessage } from "../../../actions/flashMessagesAction";

class RegisterPage extends React.Component {
    render() {
        const { registerRequest, addFlashMessage } = this.props;

        return (
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <RegisterForm registerRequest={registerRequest}
                        addFlashMessage={addFlashMessage} />
                </div>
            </div>
        );
    }
}

RegisterForm.propTypes = {
    registerRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired
}

export default connect(null, { registerRequest, addFlashMessage })(RegisterPage);