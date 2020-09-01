import React from "react";

import ChoosenIngredientsListItem from "../meal/common/MealSearchIngredientListItem";
import { useHistory } from "react-router-dom";

export default function ChoosenIngredientsList({ ingredients, removeItem }) {
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

    let renderList = () => {
        if (ingrList.length > 0) {
            return (
                <>
                    <span className="m-2 text-dark">Choosen ingredients</span><br />
                    <button type="button"
                        className="btn btn-outline-success m-2 w-100"
                        onClick={handleSearch}>
                        Search for meal {String.fromCharCode(187)}
                    </button>
                    <ul className="list-group m-1 mb-2 w-100">
                        {ingrList.map(ingr =>
                            <ChoosenIngredientsListItem
                                key={ingr.id}
                                ingredient={ingr}
                                removeItem={removeItem}
                            />)}
                    </ul>
                </>
            );
        } else {
            return (
                <span className="alert alert-info d-flex mt-4">Your list is empty</span>
            );
        }
    }

    return renderList();
}