import React from "react";

export default function MealSearchIngredientListItem({ ingredient, removeItem }) {
    const { name } = ingredient;

    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            <span className="m-1 mr-3">{name}</span>
            <button type="button"
                className="btn btn-danger btn-sm p-2 pl-3 pr-3"
                aria-label="Remove"
                onClick={() => removeItem(ingredient.id)}>X</button>
        </li>
    );
}