/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { toInteger } from "lodash";
import PropTypes from "prop-types";
import { useRouteMatch } from "react-router-dom";
import { connect } from "react-redux";
import $ from "jquery";
import classnames from "classnames";

import mealImg from "../../../img/meal.jpeg";
import { NAV_URLS } from "../../../utility/constants";
import ImageView from "../../common/singleView/ImageView";
import TitleView from "../../common/singleView/TitleView";

const MealView = (props) => {
    const parsedParams = useRouteMatch("/meal/:id");
    const mealId = parsedParams.params.id;
    const meal = createTestMeal();
    const viewId = `meal-view-${mealId}`;

    return (
        <div className="container-sm meal single-view">
            <TitleView viewId={viewId} title={meal.name} />
            <div className="row p-1">
                <ImageView
                    className="col-sm-9 col-12 pb-2 pb-sm-0"
                    imgSrc={mealImg}
                    alt={`${meal.name}`}
                    imgSizeClass="meal-img"
                    title={meal.name}
                />
                <div className="col-sm-3 col-12 p-0">
                    <div className="row m-1">
                        <button className="col btn btn-outline-primary">Add to favourites ⭐</button>
                    </div>
                    <div className="row m-1">
                        <button className="col btn btn-outline-primary">Edit 🛠</button>
                    </div>
                    <div className="row m-1 d-none d-sm-flex">
                        <MealInformations className="col text-right" meal={meal} />
                    </div>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-6 text-left">
                    <MealComponentList components={meal.components} />
                </div>
                <div className="col-6 text-right d-sm-none d-flex">
                    <MealInformations meal={meal} />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <RecipeStepsList steps={meal.recipeSteps} />
                </div>
            </div>
        </div>
    );
};

const MealInformations = ({ className, meal }) => {
    const compClassName = classnames(className, "n-lines");
    return (
        <div className={compClassName}>
            <span>Serves: {meal.serves}</span>
            <span>Difficulty: {meal.difficulty}</span>
            <MealTimes mealTimes={meal.times} />
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

const MealTimes = ({ mealTimes }) => {
    return (
        mealTimes.map((mealTime, index) => <div key={`time-${index}`}>{getTimeImg(mealTime.type)}: {mealTime.length}min</div>)
    );

    function getTimeImg(type) {
        switch (type) {
            case MEAL_TIME_TYPE.PREPARATION:
                return "url_preparation";
            case MEAL_TIME_TYPE.BAKE:
                return "url_bake";
            case MEAL_TIME_TYPE.COOK:
                return "url_cook";
            default: return "url_time";
        }
    }
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

const MEAL_TIME_TYPE = {
    PREPARATION: "preparation",
    COOK: "cook",
    BAKE: "bake"
};

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
};

export default connect(mapStateToProps, {})(MealView);

function createTestMeal() {
    return {
        name: "Super ultra meal, without any gluten and uranium, with tomato sauce",
        image: "image url",
        components: [
            createComponent("onion", 3, "kg"),
            createComponent("ham", 200, "g"),
            createComponent("eggs", 3, "pcs"),
            createComponent("flour", 560, "g"),
            createComponent("milk", 150, "ml"),
        ],
        description: "Drawings me opinions returned absolute in. Otherwise therefore sex did are unfeeling something. Certain be ye amiable by exposed so. To celebrated estimating excellence do. Coming either suffer living her gay theirs. Furnished do otherwise daughters contented conveying attempted no. Was yet general visitor present hundred too brother fat arrival. Friend are day own either lively new",
        recipeSteps: [
            createStep("Ignorant saw her her drawings marriage laughter. Case oh an that or away sigh do here upon. Acuteness you exquisite ourselves now end forfeited.", "Preparation"),
            createStep("Was justice improve age article between. No projection as up preference reasonably delightful celebrated. Preserved and abilities assurance tolerably breakfast use saw."),
            createStep("And painted letters forming far village elderly compact. Her rest west each spot his and you knew."),
            createStep("Estate gay wooded depart six far her. Of we be have it lose gate bred. Do separate removing or expenses in.", "Fry"),
            createStep("No depending be convinced in unfeeling he. Excellence she unaffected and too sentiments her. Rooms he doors there ye aware in by shall. Education remainder in so cordially. His remainder and own dejection daughters sportsmen. Is easy took he shed to kind.", "Bake"),
            createStep("Do separate removing or expenses in. Had covered but evident chapter matters anxious.", "Serving")
        ],
        times: [
            createTime(5, MEAL_TIME_TYPE.PREPARATION),
            createTime(15, MEAL_TIME_TYPE.COOK),
            createTime(12, MEAL_TIME_TYPE.BAKE)
        ],
        serves: 2,
        creatorId: 1,
        difficulty: "easy"
    };
}

function createComponent(name, amount, measure) {
    return {
        name,
        id: toInteger(Math.random() * 25000),
        amount,
        measure
    };
}

function createTime(length, type) {
    return {
        length,
        type
    };
}

function createStep(description, title) {
    return {
        description,
        title
    };
}