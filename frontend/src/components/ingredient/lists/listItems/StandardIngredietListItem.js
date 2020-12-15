import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import $ from "jquery";

import missingImage from "./../../../../img/missing_image.png";
import history from "../../../../history";
import { NAV_URLS } from "../../../../utility/constants";
import { addIngredient } from "../../../../actions/ingredientListAction";

function StandardIngredietListItem(props) {
    const { addIngredient, ingredient } = props;
    const { id, name, kcal } = ingredient;

    const addIngredientWithToast = (ingredient) => {
        addIngredient(ingredient);
        toast("Ingredient has been added");
    };

    const URL_FOUND_MEALS = `${NAV_URLS.FOUND_MEALS}/${id}`;

    return (
        <div className="container m-2 ingredient-item">
            <div className="row ingr-item m-0 p-0 border-0">
                <div className="container p-0">
                    <div className="row border-0 p-0 m-1 mt-2">
                        <div className="col-6">
                            <IngredientImg img={missingImage} alt={name} />
                        </div>
                        <div className="col-6 text-right">
                            <Link to={URL_FOUND_MEALS}>Find meals</Link>
                            <br />
                            <Link
                                to="/"
                                onClick={() =>
                                    addIngredientWithToast(ingredient)
                                }
                            >
                                Add to list
                            </Link>
                        </div>
                    </div>
                    <hr className="mb-0" />
                    <div className="row border-0 p-0 m-1 mb-2">
                        <div className="col">
                            <IngredientMainInfo
                                name={name}
                                kcal={kcal}
                                id={id}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function IngredientImg({ img, alt }) {
    return <img src={img} alt={alt} className="ingr-img" />;
}

function IngredientMainInfo({ id, name, kcal }) {
    const URL_INGREDIENT_VIEW = `${NAV_URLS.INGREDIENT}/${id}`;
    return (
        <>
            <Link to={URL_INGREDIENT_VIEW}>
                <h5>{name}</h5>
            </Link>
            <p>{kcal} kcal/100g</p>
        </>
    );
}

StandardIngredietListItem.propTypes = {
    ingredient: PropTypes.object.isRequired,
};

export default connect(null, { addIngredient })(StandardIngredietListItem);
