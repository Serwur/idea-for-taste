import axios from "axios";
import { readyException } from "jquery";

import {
    DATABASE_URL,
    DB_INGR_CREATE_URL,
    DB_INGR_UPDATE_URL,
} from "../utility/constants";
import { addWildcardsToInput } from "../utility/db-helpers";

export function getIngredientById(id) {
    const searchUrl = `${DATABASE_URL}/ingredient?id=${id}`;
    return axios.get(searchUrl);
}

export function findIngredientsByName(name) {
    return async (dispatch) => {
        const searchUrl = `${DATABASE_URL}/ingredient/name?name=${encodeURI(
            addWildcardsToInput(name)
        )}`;
        return axios.get(searchUrl);
    };
}

/**
 * @param {Ingredient} ingredient
 */
export function updateIngredient(ingredient) {
    if (ingredient.id === -1) {
        throw new Error("Ingredient is not yet saved in db");
    }
    const updateUrl = `${DB_INGR_UPDATE_URL}${ingredient.id}`;
    return axios.put(updateUrl, ingredient);
}

export function createIngredient(ingredient) {
    const createUrl = DB_INGR_CREATE_URL;
    return axios.post(createUrl, ingredient);
}
