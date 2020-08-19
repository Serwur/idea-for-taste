import React from "react";

import { NavCollapse, NavItemSection, NavItem, Dropdown, DropdownItem } from "../../utility/navbar-factory";
import LoginForm from "../login/LoginForm.component";

export default function TopNavbar() {
    return (
        <>
            <nav className="navbar navbar-expand-md navbar-light bg-light fixed-top">
                <NavCollapse id="nav-collapse">
                    <NavItemSection type="left">
                        <NavItem href="/" text="Ingredients" />
                        <NavItem href="/meal-by-ingredients-search" text="Meals" />
                        <NavItem href="/found-meals" text="Found meals (test)" />
                    </NavItemSection>
                    <NavItemSection type="right">
                        <NavItem href="/login" text="Login"/>
                        <NavItem href="/register" text="Register"/>
                    </NavItemSection>
                </NavCollapse>
            </nav>
            <div className="top-navbar-offset" />
        </>
    );
}