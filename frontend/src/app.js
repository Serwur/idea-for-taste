import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import "./index.css";

import IngredientSearch from './components/ingredient/IngredientSearch.component';
import MealByIngredientSearchPage from './components/pages/MealByIngredientSearchPage.component';
import StandardIngredietListItem from './components/ingredient/IngredientListItem.component';
import FoundMealsPage from './components/meal/FoundMealsPage.component';
import TopNavbar from './components/navbar/TopNavbar.component';
import LoginForm from './components/login/LoginForm.component';
import RegisterForm from './components/login/RegisterForm.component';

export default function App() {
    return (
        <>
            <TopNavbar />
            <Router>
                <Switch>
                    <Route path="/meal-by-ingredients-search" exact component={MealByIngredientSearchPage} />
                    <Route path="/" exact component={() => <IngredientSearch listItemProps={{
                        ItemComponent: StandardIngredietListItem
                    }} />} />
                    <Route path="/found-meals/:ingrIds" exact component={FoundMealsPage} />
                    <Route path="/register" exact component={RegisterForm} />
                    <Route path="/login" exact component={LoginForm} />
                </Switch>
            </Router>
        </>
    );
};