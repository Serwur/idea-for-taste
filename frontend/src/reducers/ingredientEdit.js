import { SET_INGREDIENT } from "../actions/types";
import { createEmptyIngredientObject } from "../utility/ingredients-funs";

export default (state = createEmptyIngredientObject(), action = {}) => {
    switch (action.type) {
        case SET_INGREDIENT:
            return action.ingredient;
        default:
            return state;
    }
}