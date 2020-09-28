import React from 'react'
import { connect } from 'react-redux';
import PropTypes from "prop-types";

import history from '../../history';
import { hideSignInModal } from '../login/common/SignInModal';

export default function notAuthenticatedOnly(ComponentOnlyForNotAuthenticated) {
    class NotAuthenticatedOnly extends React.Component {
        componentDidMount() {
            if (this.props.isAuthenticated) {
                hideSignInModal();
                history.push("/");
            }
        }

        render() {
            return <ComponentOnlyForNotAuthenticated {...this.props} />
        }
    }

    NotAuthenticatedOnly.propTypes = {
        isAuthenticated: PropTypes.bool.isRequired
    }

    function mapStateToProps(state) {
        return {
            isAuthenticated: state.auth.isAuthenticated
        };
    }

    return connect(mapStateToProps)(NotAuthenticatedOnly);
}

