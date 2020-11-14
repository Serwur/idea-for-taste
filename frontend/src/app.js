import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import jwt from "jsonwebtoken";
import "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";

import "./styles/styles.css";
import "./styles/meal-styles.css";
import "./styles/navbar-styles.css";
import "./styles/btn-styles.css";
import "./styles/ingredient-styles.css";

import IngredientSearch from "./components/ingredient/IngredientSearch";
import MealByIngredientSearchPage from "./components/meal/page/MealByIngredientSearchPage";
import StandardIngredietListItem from "./components/ingredient/StandardIngredietListItem";
import FoundMealsPage from "./components/meal/page/FoundMealsPage";
import TopNavbar from "./components/common/TopNavbar";
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
import handleError from "./components/common/handleError";
import IngredientView from "./components/ingredient/singleView/IngredientView";

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
                        <Route exact path={NAV_URLS.HOME} component={() => <IngredientSearch listItemProps={{
                            ItemComponent: StandardIngredietListItem
                        }} />} />
                        <Route path={NAV_URLS.MEAL_BY_INGREDIENT_SEARCH} component={MealByIngredientSearchPage} />
                        <Route path={NAV_URLS.FOUND_MEALS} component={FoundMealsPage} />
                        <Route exact path={NAV_URLS.REGISTER} component={notAuthenticatedOnly(RegisterPage)} />
                        <Route exact path={NAV_URLS.SIGN_IN} component={notAuthenticatedOnly(SignInPage)} />
                        <Route exact path={NAV_URLS.CREATE_INGREDIENT} component={requireAuthenticate(IngredientCreationPage)} />
                        <Route path={NAV_URLS.MEAL} component={MealView} />
                        <Route path={NAV_URLS.INGREDIENT} component={IngredientView} />
                        <Route component={NotFound} />
                    </Switch>
                </main>
            </Router>
        </Provider>
    );
};