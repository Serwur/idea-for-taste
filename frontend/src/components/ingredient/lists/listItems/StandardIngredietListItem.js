import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import missingImage from "./../../../../img/missing_image.png";
import history from "../../../../history";
import { NAV_URLS } from "../../../../utility/constants";
import { addIngredient } from "../../../../actions/ingredientListAction";
function StandardIngredietListItem(props) {
    const { addIngredient, ingredient } = props;
    const { id, name, kcal } = ingredient;

    const URL_FOUND_MEALS = `${NAV_URLS.FOUND_MEALS}/${id}`;
    const URL_INGREDIENT_VIEW = `${NAV_URLS.INGREDIENT}/${id}`;

    return (
        <div className="container m-2 ingredient-item" width="100px">
            <div className="row ingr-item">
                <div
                    className="col-9 p-2 clickable"
                    onClick={() => history.push(URL_INGREDIENT_VIEW)}
                >
                    <div className="col-3">
                        <img
                            src={missingImage}
                            alt={name}
                            className="ingr-img"
                        />
                    </div>
                    <div className="col-9">
                        <h4>{name}</h4>
                        <p>{kcal} kcal/100g</p>
                    </div>
                </div>
                <div className="col-3 text-right">
                    <Link to={URL_FOUND_MEALS}>Find meals</Link>
                    <br />
                    <Link to="/" onClick={() => addIngredient(ingredient)}>
                        Add to list
                    </Link>
                </div>
            </div>
        </div>
    );
}

StandardIngredietListItem.propTypes = {
    ingredient: PropTypes.object.isRequired,
};

export default connect(null, { addIngredient })(StandardIngredietListItem);
