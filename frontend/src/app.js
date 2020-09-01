import React from 'react';
import { Router, Route, Switch, useHistory } from 'react-router-dom';
import { Provider } from "react-redux";

import "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import "./index.css";

import IngredientSearch from './components/ingredient/IngredientSearch';
import MealByIngredientSearchPage from './components/meal/page/MealByIngredientSearchPage';
import StandardIngredietListItem from './components/ingredient/IngredientListItem';
import FoundMealsPage from './components/meal/page/FoundMealsPage';
import TopNavbar from './components/common/TopNavbar';
import LoginForm from './components/login/common/LoginForm';
import RegisterPage from './components/login/page/RegisterPage';
import history from './history';
import NotFound from './components/errors/NotFound';
import store from "./store";

export default function App() {
    return (
        <Provider store={store}>
            <Router history={history}>
                <TopNavbar />
                <div className="container-fluid">
                    <Switch>
                        <Route exact path="/" component={() => <IngredientSearch listItemProps={{
                            ItemComponent: StandardIngredietListItem
                        }} />} />
                        <Route path="/meal-by-ingredients-search" component={MealByIngredientSearchPage} />
                        <Route path="/found-meals/:ingrIds" component={FoundMealsPage} />
                        <Route exact path="/register" component={RegisterPage} />
                        <Route exact path="/login" component={LoginForm} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </Router>
        </Provider>
    );
};