import React from "react";
import $ from "jquery";

import SignInForm from "./SignInForm";

export default function SignInModal() {
    return (
        <div
            id={SIGN_IN_MODAL_ID}
            aria-hidden="true"
            role="dialog"
            className="modal fade"
            aria-labelledby="signInModalTitle"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Sign in</h4>
                        <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">x</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <SignInForm />
                    </div>
                </div>
            </div>
        </div>
    );
}

export function showSignInModal() {
    console.log("Showing modal");
    changeModalView(true);
}

export function hideSignInModal() {
    console.log("Hiding modal");
    changeModalView(false);
}

function changeModalView(visible) {
    $(`#${SIGN_IN_MODAL_ID}`).modal(visible ? "show" : "hide");
}

export const SIGN_IN_MODAL_ID = "signInModal";
