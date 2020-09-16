import React, { useEffect } from "react"
import PropTypes from "prop-types";
import { connect, useDispatch, useSelector } from "react-redux";

import history from "../../history";
import { addFlashMessage } from "../../actions/flashMessagesAction";

export default function (ComposedComponent) {
    class Authenticate extends React.Component {
        componentDidMount() {
            if (!this.props.isAuthenticated) {
                this.props.addFlashMessage({
                    type: "error",
                    text: "You need to login to access this page"
                });
                history.push("/sign-in");
            }
        }

        componentDidUpdate(nextProps) {
            if (!nextProps.isAuthenticated) {
                history.push("/");
            }
        }

        render() {
            return (
                <ComposedComponent {...this.props} />
            );
        }
    }

    Authenticate.propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        addFlashMessage: PropTypes.func.isRequired
    }

    function mapStateToProps(state) {
        return {
            isAuthenticated: state.auth.isAuthenticated
        };
    }

    return connect(mapStateToProps, { addFlashMessage })(Authenticate);
}

// export function requireAuthenticate(ComposedComponent) {

//     return connect(null, { addFlashMessage })(() => {
//         const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
//         const addFlashMessage = useDispatch();

//         useEffect(() => {
//             if (!isAuthenticated) {
//                 addFlashMessage({
//                     type: "error",
//                     text: "You need to login to access this page"
//                 });
//                 history.push("sign-in");
//             }
//         }, []);

//         return (
//             <ComposedComponent />
//         );
//     })
// }