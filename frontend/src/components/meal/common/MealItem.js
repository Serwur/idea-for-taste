import React from "react";
import missingImage from "../../../img/missing_image.png";
import PropTypes from "prop-types";

function MealItem({ meal, requiredIngredientsIds, ownedIngredientsIds }) {
    if (!meal) throw new Error("meal cannot be null");
    if (!ownedIngredientsIds) throw new Error("ownedIngredientsIds cannot be null");
    if (!requiredIngredientsIds) throw new Error("requiredComponents cannot be null");

    const ownedComponentsAmount = countOwnedComponents(requiredIngredientsIds, ownedIngredientsIds);
    const missingComponentsAmount = requiredIngredientsIds.size - ownedComponentsAmount;

    return (
        <div className="card m-2">
            <div className="card-header"><a href="/">{meal.name}</a></div>
            <img src={missingImage} alt={meal.name} className="card-img" />
            <div className="card-body">
                <div className="row">
                    <div className="col-8">
                        Sample text for {meal.id}
                    </div>
                    <div className="col-4">
                        <p className="owned-ingr">Owned: {ownedComponentsAmount}</p>
                        <p className="miss-ingr">Missing: {missingComponentsAmount}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

function countOwnedComponents(requiredIngredientsIds, ownedIngredientsIds) {
    let count = 0;

    requiredIngredientsIds.forEach(ingrId => {
        if (ownedIngredientsIds.has(ingrId)) count++;
    });

    return count;
}

MealItem.propTypes = {
    meal: PropTypes.object.isRequired,
    requiredIngredientsIds: PropTypes.object.isRequired,
    ownedIngredientsIds: PropTypes.object.isRequired
}

export default MealItem;