import React from "react";

export default function MealSearchIngredientListItem({ ingredient, removeItem }) {
    const { name } = ingredient;

    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            <span>{name}</span>
            <button type="button"
                className="btn btn-danger btn-sm"
                aria-label="Remove"
                onClick={() => removeItem(ingredient.id)}>X</button>
        </li>
    );
}