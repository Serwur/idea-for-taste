import React from "react";

export const createNavItem = (props) => {
    const { href, text, className, linkClassName, key = "", onClick } = props;
    return (
        <li key={href} className={`nav-item ${className}`}>
            {createNavLink(
                {
                    href,
                    text,
                    className: `nav-link ${linkClassName}`,
                    key,
                    onClick
                }
            )}
        </li>
    );
}

export const createDropdownItem = (props) => {
    const { href, text, className, key = "" } = props;
    return (
        createNavLink({
            href,
            text,
            className: `dropdown-item ${className}`,
            key
        })
    );
}

export const createNavLink = (props) => {
    const { href, text, className = "nav-link", key = "", onClick } = props;
    return (
        <a key={key}
            className={className}
            href={`${href}`}
            onClick={onClick}>
            {text}
        </a>
    );
}

export class Dropdown extends React.Component {
    render() {
        const { id, text, children, className } = this.props;
        return (
            <li className={`nav-item dropdown ${className}`}>
                <a id={id}
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false">
                    {text}
                </a>
                <div className="dropdown-menu" aria-labelledby={id}>
                    {children}
                </div>
            </li>
        );
    }
}

export class DropdownItem extends React.Component {
    render() {
        const { href, text, className } = this.props;
        return (
            createDropdownItem(href ? href : "/", text, className)
        );
    }
}

export class DropdownDivider extends React.Component {
    render() {
        return (
            <div className="dropdown-divider" />
        );
    }
}

export class NavItem extends React.Component {
    render() {
        const { href, text, className, linkClassName, onClick } = this.props;

        return (
            createNavItem(
                {
                    href: href ? href : "/",
                    text,
                    className: className ? className : "",
                    linkClassName: linkClassName ? linkClassName : "",
                    onClick
                }
            )
        );
    }
}

export class NavItemSection extends React.Component {
    render() {
        const { type, children, className } = this.props;
        let align = "mr-auto";

        if (String(type).match("right")) {
            align = "";
        }

        return (
            <ul className={`navbar-nav ${align} ${className}`}>
                {children}
            </ul>
        );
    }
}

export class NavCollapse extends React.Component {
    render() {
        const { id, children, className } = this.props;

        return (
            <>
                <button className={`navbar-toggler ${className}`}
                    type="button"
                    data-toggle="collapse"
                    data-target={`#${id}`}
                    aria-controls={id}
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>

                <div id={id} className="collapse navbar-collapse">
                    {children}
                </div>
            </>
        );
    }
}

export class Nav extends React.Component {
    render() {
        const { className, id, children } = this.props;

        return (
            <nav key={id} id={id} className={className}>
                {children}
            </nav>
        );
    }
}

export class NavLink extends React.Component {
    render() {
        const { text, className, href } = this.props;

        return (
            createNavLink(href, text, `nav-link ${className ? className : ""}`)
        );
    }
}