import React from "react";

export default function RegisterForm() {
    return (
        <form className="m-2">
            <div className="form-group">
                <label htmlFor="login-name" className="m-1">Login</label>
                <input id="login-name"
                    name="login-name"
                    placeholder="Login name or e-mail"
                    className="m-1" />
            </div>
            <div className="form-group">
                <label htmlFor="password"
                    className="m-1">Password</label>
                <input id="password"
                    name="password"
                    placeholder="Password"
                    type="password"
                    className="m-1" />
            </div>
            <div className="form-group">
                <label htmlFor="password"
                    className="m-1">Password confirm</label>
                <input id="password-confirm"
                    name="password-confirm"
                    placeholder="Enter same password as above"
                    type="password"
                    className="m-1" />
            </div>
            <button type="button"
                value="sign-in"
                className="btn btn-outline-primary">
                Register
            </button>
        </form>
    );
}