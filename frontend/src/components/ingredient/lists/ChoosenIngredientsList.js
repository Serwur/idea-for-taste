import React from "react";
import { useHistory } from "react-router-dom";
import $ from "jquery";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import ChoosenIngredientsListItem from "../../meal/common/MealSearchIngredientListItem";
import { removeIngredient } from "../../../actions/ingredientListAction";

/**
 * @param {Object} props
 * @param {Ingredient[]} props.ingredients
 * @param {function(Ingredient)} props.removeIngredient
 */
function ChoosenIngredientsList(props) {
    const { ingredients, removeIngredient } = props;
    const history = useHistory();

    let ingrList = [];
    if (ingredients) {
        ingrList = ingredients;
    }

    const handleSearch = () => {
        const ingrIds = ingrList.map((ingredient) => ingredient.id);
        const redirectLink = `/found-meals/${ingrIds}`;
        history.push(redirectLink);
    };

    const shouldRender = () => {
        return ingredients.length > 0;
    };

    const switchVisibility = () => {
        const list = $("#ingredient-choosen-list");
        if (list.hasClass("hide")) {
            list.removeClass("hide");
        } else {
            list.addClass("hide");
        }
    };

    return shouldRender() ? (
        <div
            id="ingredient-choosen-list"
            className="ingredient-choosen-list hide"
        >
            <div className="container">
                <div className="list">
                    <div className="title">Ingredients List</div>
                    <br />
                    <button
                        type="button"
                        className="btn btn-outline-success m-2 w-100"
                        onClick={handleSearch}
                        disabled={ingrList.length === 0}
                    >
                        Search for meal {String.fromCharCode(187)}
                    </button>
                    <ul className="list-group w-100">
                        {ingrList.map((ingr) => (
                            <ChoosenIngredientsListItem
                                key={ingr.id}
                                ingredient={ingr}
                                removeItem={() => removeIngredient(ingr)}
                            />
                        ))}
                    </ul>
                </div>
                <div className="button" onClick={switchVisibility}></div>
            </div>
        </div>
    ) : (
        <></>
    );
}

ChoosenIngredientsList.propTypes = {
    ingredients: PropTypes.array.isRequired,
};

/**
 * @param {Object} state
 * @param {Map} state.ingredientList
 */
function mapStateToProps(state) {
    return {
        ingredients: Array.from(state.ingredientList.values()),
    };
}

export default connect(mapStateToProps, { removeIngredient })(
    ChoosenIngredientsList
);
