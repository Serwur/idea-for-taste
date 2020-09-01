import React from "react";

import { NavCollapse, NavItemSection, NavItem } from "../../utility/navbar-factory";
import { NAV_URLS } from "../../utility/constants";

export default function TopNavbar() {
    return (
        <>
            <nav className="navbar navbar-expand-md fixed-top">
                <NavCollapse id="nav-collapse">
                    <NavItemSection type="left">
                        <NavItem href={NAV_URLS.HOME} text="Ingredients" />
                        <NavItem href={NAV_URLS.MEAL_BY_INGREDIENT_SEARCH} text="Meals" />
                    </NavItemSection>
                    <NavItemSection type="right">
                        <NavItem href={NAV_URLS.SIGN_IN} text="Sign in" />
                        <NavItem href={NAV_URLS.REGISTER} text="Register" />
                    </NavItemSection>
                </NavCollapse>
            </nav>
            <div className="top-navbar-offset" />
        </>
    );
}