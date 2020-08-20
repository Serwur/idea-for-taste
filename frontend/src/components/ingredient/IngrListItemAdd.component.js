import React from "react";

export default function IngrListItemAdd({ ingredient, props }) {
    const { name } = ingredient;
    const { addIngredientToList, isIngredientChoosen } = props;

    let renderAddableItem = () => {
        return (
            <div className="align-items-center d-flex justify-content-between list-group-item">
                <span>{name}</span>
                <button onClick={() => addIngredientToList(ingredient)}
                    type="button"
                    className="btn btn-outline-primary btn-sm align-items-center">+</button>
            </div>
        );
    };

    let renderBlockedItem = () => {
        return (
            <div className="list-group-item align-items-center d-flex justify-content-between bg-secondary border-light">
                <span className="text-white">{name}</span>
                <small className="text-white-50">Already added</small>
            </div>
        );
    };

    return (
        isIngredientChoosen(ingredient.id) ? renderBlockedItem() : renderAddableItem()
    );
}