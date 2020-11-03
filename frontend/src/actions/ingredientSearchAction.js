import { INGREDIENT_SEARCH } from "./types";

/**
 * @typedef {Object} IngredientSearchResult 
 * @property {[]} result 
 * @property {Boolean} loading 
 * @property {String} lastSearchName 
 * @property {Boolean} isConnectionError 
 */

/**
 * @param {IngredientSearchResult} searchResult
 */
export function setLastSearchResult(searchResult) {
    return {
        type: INGREDIENT_SEARCH.SET_LAST_SEARCH_RESULT,
        ...searchResult
    };
}

export function setLastClickedIngredient(lastClickedIngredient) {
    return {
        type: INGREDIENT_SEARCH.SET_LAST_CLICKED,
        lastClickedIngredient
    }
}

export function setLastSearchName(lastSearchName) {
    return {
        type: INGREDIENT_SEARCH.SET_LAST_SEARCH_NAME,
        lastSearchName
    }
}