import React from "react";
import { Link } from "react-router-dom";

import missingImage from "./../../img/missing_image.png";
import PropTypes from "prop-types";
import history from "../../history";
import { NAV_URLS } from "../../utility/constants";

export default function StandardIngredietListItem({ ingredient }) {
    const { id, name } = ingredient; 
    // , alcohol, carbohydrate, fat, organic_acid, protein, roughage, salt, sugar, water
    const searchForMeals = () => {
        history.push(`${NAV_URLS.FOUND_MEALS}/${id}`)
    }

    return (
        <div className="container m-2 ingredient-item" width="100px">
            <div className="row ingr-item" >
                <div className="col-9 p-2 clickable" onClick={searchForMeals}>
                    <div className="col-3">
                        <img src={missingImage} alt={name} className="ingr-img" />
                    </div>
                    <div className="col-9">
                        <h4>{name}</h4>
                        <p>100 kcal/100g</p>
                    </div>
                </div>
                <div className="col-3 text-right">
                    <Link to="/">Find meals</Link><br />
                    <Link to="/">Add to ingredient list</Link>
                </div>
            </div>
        </div>
    );
}

StandardIngredietListItem.propTypes = {
    ingredient: PropTypes.object.isRequired
};