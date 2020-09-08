import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { NavCollapse, NavItemSection, NavItem } from "../../utility/navbar-factory";
import { NAV_URLS } from "../../utility/constants";
import { logout } from "../../services/user.service";

class TopNavbar extends React.Component {
    render() {
        const { isAuthenticated } = this.props.auth;

        const userLinks = (
            <NavItem href={NAV_URLS.HOME}
                onClick={() => this.props.logout()}
                text="Logout" />
        );

        const guestLinks = (
            <>
                <NavItem href={NAV_URLS.SIGN_IN} text="Sign in" />
                <NavItem href={NAV_URLS.REGISTER} text="Register" />
            </>
        );

        const userGreetings = (
            <span className="navbar-brand">
                Hello, {this.props.username}!
            </span>
        );

        return (
            <>
                <nav className="navbar navbar-expand-md fixed-top">
                    <NavCollapse id="nav-collapse">
                        <NavItemSection type="left">
                            <NavItem href={NAV_URLS.HOME} text="Ingredients" />
                            <NavItem href={NAV_URLS.MEAL_BY_INGREDIENT_SEARCH} text="Meals" />
                        </NavItemSection>
                        <NavItemSection type="right">
                            {isAuthenticated && userGreetings}
                            {isAuthenticated ? userLinks : guestLinks}
                        </NavItemSection>
                    </NavCollapse>
                </nav>
                <div className="top-navbar-offset" />
            </>
        );
    }
}

TopNavbar.propTypes = {
    auth: PropTypes.object.isRequired,
    username: PropTypes.string
};

function mapStateToProps(state) {
    return {
        auth: state.auth,
        username: state.auth.user.username
    };
};

export default connect(mapStateToProps, { logout })(TopNavbar);