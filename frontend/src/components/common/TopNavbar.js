import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import $ from "jquery";

import { NavCollapse, NavItemSection, NavItem, Dropdown, DropdownItem, NavItemButton } from "../../utility/navbar-factory";
import { NAV_URLS } from "../../utility/constants";
import { logout } from "../../services/user.service";

class TopNavbar extends React.Component {
    constructor() {
        super();
        this.setDropdownShowOnHover = this.setDropdownShowOnHover.bind();
    }

    componentDidMount() {
        this.setDropdownShowOnHover();
    }

    setDropdownShowOnHover() {
        const $dropdown = $(".dropdown");
        const $dropdownToggle = $(".dropdown-toggle");
        const $dropdownMenu = $(".dropdown-menu");
        const showClass = "show";

        $(window).on("load resize", function () {
            if (this.matchMedia("(min-width: 768px)").matches) {
                $dropdown.on("mouseenter", function () {
                    const $this = $(this);
                    $this.addClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "true");
                    $this.find($dropdownMenu).addClass(showClass);
                });
                $dropdown.on("mouseleave", function () {
                    const $this = $(this);
                    $this.removeClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "false");
                    $this.find($dropdownMenu).removeClass(showClass);
                });
            } else {
                $dropdown.off("mouseenter mouseleave");
            }
        });
    }

    render() {
        const { isAuthenticated } = this.props.auth;

        const userLinks = (
            <NavItem href={NAV_URLS.HOME}
                onClick={() => this.props.logout()}
                text="Logout" />
        );

        const guestLinks = (
            <>
                <NavItemButton dataToggle="modal" dataTarget="#signInModal" text="Sign in" />
                <NavItem href={NAV_URLS.REGISTER} text="Register" />
            </>
        );

        return (
            <>
                <nav className="navbar navbar-expand-md fixed-top navbar-dark">
                    <NavCollapse id="nav-collapse">
                        <NavItemSection type="left">
                            <Dropdown text="Ingredients">
                                <DropdownItem href={NAV_URLS.HOME} text="Find" />
                                <DropdownItem href={NAV_URLS.CREATE_INGREDIENT} text="Create" />
                            </Dropdown>
                            {/* <NavItem href={NAV_URLS.HOME} text="Ingredients" /> */}
                            <NavItem href={NAV_URLS.MEAL_BY_INGREDIENT_SEARCH} text="Meals" />
                        </NavItemSection>
                        <NavItemSection type="right">
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
    username: PropTypes.string,
    logout: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        auth: state.auth,
        username: state.auth.user.username
    };
};

export default connect(mapStateToProps, { logout })(TopNavbar);