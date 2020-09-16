import { SET_INGREDIENT } from "./types";

export function setIngredientToEdit(ingredient) {
    return {
        type: SET_INGREDIENT,
        ingredient
    };
}