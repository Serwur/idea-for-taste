import axios from "axios";

import { DATABASE_URL, DB_INGR_CREATE_URL, DB_INGR_UPDATE_URL } from "../utility/constants";
import { addWildcardsToInput } from "../utility/db-helpers";

export function findIngredientsByName(name) {
    return async dispatch => {
        const searchUrl = `${DATABASE_URL}/ingredient/name?name=${encodeURI(addWildcardsToInput(name))}`;
        return axios.get(searchUrl);
    }
}

export function updateIngredient(ingredient) {
    const ingredientToSave = {
        name: ingredient.name,
        protein: ingredient.protein,
        carbohydrate: ingredient.carbohydrate,
        fat: ingredient.fat,
        alcohol: ingredient.alcohol,
        organic_acid: ingredient.organic_acid,
        roughage: ingredient.roughage,
        salt: ingredient.salt,
        sugar: ingredient.sugar,
        water: ingredient.water
    };
    const updateUrl = `${DB_INGR_UPDATE_URL}${ingredient.id}`;
    return axios.put(updateUrl, ingredientToSave);
}

export function createIngredient(ingredient) {
    const createUrl = DB_INGR_CREATE_URL;
    return axios.post(createUrl, ingredient);
}