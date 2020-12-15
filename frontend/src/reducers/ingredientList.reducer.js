import { INGREDIENT_LIST } from "../actions/types";

/**
 * @param {Object} action
 * @param {String} action.type
 * @param {Object} action.ingredient
 */
export default (state = new Map(), action = {}) => {
    const stateCopy = new Map(state);
    switch (action.type) {
        case INGREDIENT_LIST.ADD_INGREDIENT:
            stateCopy.set(action.ingredient.id, action.ingredient);
            break;
        case INGREDIENT_LIST.REMOVE_INGREDIENT:
            stateCopy.delete(action.ingredient.id);
            break;
        default:
            return state;
    }

    return stateCopy;
};
