import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import jwt from "jsonwebtoken";
import "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import "react-toastify/dist/ReactToastify.css";

import "./styles/dist/main.css";
import "./styles/dist/meal-styles.css";
import "./styles/dist/navbar-styles.css";
import "./styles/dist/btn-styles.css";
import "./styles/dist/ingredient-styles.css";
import "./styles/dist/form-field-group.css";
import "./styles/dist/single-view.css";

import IngredientSearch from "./components/ingredient/search/IngredientSearch";
import StandardIngredietListItem from "./components/ingredient/lists/listItems/StandardIngredietListItem";
import FoundMealsPage from "./components/meal/page/FoundMealsPage";
import TopNavbar from "./components/navbars/TopNavbar";
import RegisterPage from "./components/login/page/RegisterPage";
import history from "./history";
import NotFound from "./components/errors/NotFound";
import store from "./store";
import { NAV_URLS } from "./utility/constants";
import setAuthorizationToken from "./utility/setAuthorizationToken";
import { setCurrentUser } from "./services/user.service";
import requireAuthenticate from "./components/common/requireAuthenticate";
import notAuthenticatedOnly from "./components/common/notAuthenticatedOnly";
import SignInModal from "./components/login/common/SignInModal";
import SignInPage from "./components/login/page/SignInPage";
import IngredientCreationPage from "./components/ingredient/creation/IngredientCreationPage";
import MealView from "./components/meal/singleView/MealView";
import IngredientView from "./components/ingredient/singleView/IngredientView";
import { Slide, ToastContainer } from "react-toastify";

const jwtToken = localStorage.getItem("jwtToken");

if (jwtToken) {
    setAuthorizationToken(jwtToken);
    store.dispatch(setCurrentUser(jwt.decode(jwtToken)));
}

export default function App() {
    return (
        <Provider store={store}>
            <Router history={history}>
                <TopNavbar />
                <SignInModal />
                <main className="container-fluid pb-4">
                    <Switch>
                        <Route
                            exact
                            path={NAV_URLS.HOME}
                            component={() => (
                                <IngredientSearch
                                    listItemProps={{
                                        ItemComponent: StandardIngredietListItem,
                                    }}
                                />
                            )}
                        />
                        <Route
                            path={NAV_URLS.FOUND_MEALS}
                            component={FoundMealsPage}
                        />
                        <Route
                            exact
                            path={NAV_URLS.REGISTER}
                            component={notAuthenticatedOnly(RegisterPage)}
                        />
                        <Route
                            exact
                            path={NAV_URLS.SIGN_IN}
                            component={notAuthenticatedOnly(SignInPage)}
                        />
                        <Route
                            exact
                            path={NAV_URLS.CREATE_INGREDIENT}
                            component={requireAuthenticate(
                                IngredientCreationPage
                            )}
                        />
                        <Route path={NAV_URLS.MEAL} component={MealView} />
                        <Route
                            path={NAV_URLS.INGREDIENT}
                            component={IngredientView}
                        />
                        <Route component={NotFound} />
                    </Switch>
                </main>
                <ToastContainer
                    position="bottom-center"
                    autoClose={1500}
                    hideProgressBar
                    newestOnTop={true}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    transition={Slide}
                />
            </Router>
        </Provider>
    );
}
