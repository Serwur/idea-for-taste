import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from "react-redux";
import jwt from "jsonwebtoken";

import "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import "./index.css";

import IngredientSearch from './components/ingredient/IngredientSearch';
import MealByIngredientSearchPage from './components/meal/page/MealByIngredientSearchPage';
import StandardIngredietListItem from './components/ingredient/IngredientListItem';
import FoundMealsPage from './components/meal/page/FoundMealsPage';
import TopNavbar from './components/common/TopNavbar';
import SignInForm from './components/login/common/SignInForm';
import RegisterPage from './components/login/page/RegisterPage';
import history from './history';
import NotFound from './components/errors/NotFound';
import store from "./store";
import { NAV_URLS } from './utility/constants';
import setAuthorizationToken from './utility/setAuthorizationToken';
import { setCurrentUser } from './services/user.service';

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
                <div className="container-fluid">
                    <Switch>
                        <Route exact path={NAV_URLS.HOME} component={() => <IngredientSearch listItemProps={{
                            ItemComponent: StandardIngredietListItem
                        }} />} />
                        <Route path={NAV_URLS.MEAL_BY_INGREDIENT_SEARCH} component={MealByIngredientSearchPage} />
                        <Route path={NAV_URLS.FOUND_MEALS} component={FoundMealsPage} />
                        <Route exact path={NAV_URLS.REGISTER} component={RegisterPage} />
                        <Route exact path={NAV_URLS.SIGN_IN} component={SignInForm} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </Router>
        </Provider>
    );
};