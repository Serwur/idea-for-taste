import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useRouteMatch } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";
import { LoopCircleLoading as Loading } from "react-loadingg";

import mealImg from "../../../img/meal.jpeg";
import { NAV_URLS } from "../../../utility/constants";
import ImageView from "../../common/singleView/ImageView";
import TitleView from "../../common/singleView/TitleView";
import { createTestMeal } from "../../../utility/meal-funs";
import history from "../../../history";
import { setSelectedMealView } from "../../../actions/selectedMealViewAction";
import { renderLoading } from "../../common/loading";
import { getMealById } from "../../../services/meal.service";

function MealView(props) {
    const routeMatch = useRouteMatch("/meal/:id");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const { setSelectedMealView, getMealById, meal } = props;
        if (routeMatch) {
            console.log("Using meal from routeMatch");
            getMealById(routeMatch.params.id).then(
                res => {
                    const meal = res.data;
                    setSelectedMealView(meal);
                    setIsLoading(false);
                }
            ).catch(
                () => {
                    console.log("Setting test meal due to error (expected)");
                    setSelectedMealView(createTestMeal());
                    setIsLoading(false);
                }
            );
        } else if (meal) {
            console.log("Using meal from store");

            setSelectedMealView(meal);
            setIsLoading(false);
        } else {
            history.push("/precondition-failed-412");
        };
    }, [setIsLoading]);

    return (
        isLoading ? renderLoading(Loading) : <div className="container-sm meal single-view">
            <TitleView title={props.meal.name} />
            <div className="row p-1">
                <ImageView
                    className="col-sm-9 col-12 pb-2 pb-sm-0"
                    imgSrc={mealImg}
                    alt={`${props.meal.name}`}
                    imgSizeClass="meal-img"
                    title={props.meal.name}
                />
                <div className="col-sm-3 col-12 p-0">
                    <div className="row m-1">
                        <button className="col btn btn-outline-primary">
                            Add to favourites <span role="img" aria-label="favourites-icon">⭐</span>
                        </button>
                    </div>
                    <div className="row m-1">
                        <button className="col btn btn-outline-primary">
                            Edit <span role="img" aria-label="edit-icon">🛠</span>
                        </button>
                    </div>
                    <div className="row m-1 d-none d-sm-flex">
                        <MealInformations className="col text-right" meal={props.meal} />
                    </div>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-6 text-left">
                    <MealComponentList components={props.meal.components} />
                </div>
                <div className="col-6 text-right d-sm-none d-flex">
                    <MealInformations meal={props.meal} />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <RecipeStepsList steps={props.meal.recipeSteps} />
                </div>
            </div>
        </div>
    );
};

const MealInformations = ({ className, meal }) => {
    const compClassName = classnames(className, "n-lines");
    return (
        <div className={compClassName}>
            <span>Time: {meal.time.isAbout ? "~" : ""}{meal.time.total}min</span>
            <span>Serves: {meal.serves}</span>
            <span>Difficulty: {meal.difficulty}</span>
        </div>
    );
};

const MealComponentList = ({ components }) => {
    return (
        <>
            <h4 className="ml-2">Components</h4>
            <ul className="list-unstyled pl-3">
                {components.map((component, index) =>
                    <MealComponent key={`${component.id}-${index}`} component={component} />)
                }
            </ul>
        </>
    );
};

MealComponentList.propType = {
    components: PropTypes.array.isRequired
};

const MealComponent = ({ component }) => {
    return (
        <li className="p-1 pl-0">
            <a href={`${NAV_URLS.INGREDIENT}/${component.id}`}>
                {component.name} - {component.amount}{component.measure}
            </a>
        </li>
    );
};

MealComponent.propType = {
    component: PropTypes.object.isRequired
};

const RecipeStepsList = ({ steps }) => {
    return steps.map((step, stepIndex) => <RecipeStep key={`step-${stepIndex}`} step={step} stepNo={stepIndex + 1} />);
};

const RecipeStep = ({ stepNo, step }) => {
    const title = (stepNo, step) => {
        let title = `Step ${stepNo}`;
        if (step.title) title += " - " + step.title;
        return title;
    };

    return (
        <div className="meal-step">
            <h3 className="title border-bottom">{title(stepNo, step)}</h3>
            <p className="description">{step.description}</p>
        </div>
    );
};

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        meal: state.selectedMealView
    };
};

export default connect(mapStateToProps, { setSelectedMealView, getMealById })(MealView);