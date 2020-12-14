import { INGREDIENT_LIST } from "./types";

export function addIngredient(ingredient) {
    return {
        type: INGREDIENT_LIST.ADD_INGREDIENT,
        ingredient,
    };
}

export function removeIngredient(ingredient) {
    return {
        type: INGREDIENT_LIST.REMOVE_INGREDIENT,
        ingredient,
    };
}
