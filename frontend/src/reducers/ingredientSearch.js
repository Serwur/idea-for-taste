import { INGREDIENT_SEARCH } from "../actions/types";

/**
 * @param {Object} state
 * @param {[]} state.result 
 * @param {Boolean} state.loading 
 * @param {String} state.lastSearchName 
 * @param {Boolean} state.isConnectionError 
 * @param {Object} state.lastClickedIngredient
 * 
 * @param {Object} action
 * @param {String} action.type
 * @param {[]} action.result 
 * @param {Boolean} action.loading 
 * @param {String} action.lastSearchName 
 * @param {Boolean} action.isConnectionError 
 * @param {Object} action.lastClickedIngredient
 */
export default (state = {
    loading: false,
    isConnectionError: false,
    lastSearchName: "",
    result: null
}, action = {}) => {
    switch (action.type) {
        case INGREDIENT_SEARCH.SET_LAST_SEARCH_NAME:
            return {
                ...state,
                lastSearchName: action.lastSearchName
            };
        case INGREDIENT_SEARCH.SET_LAST_CLICKED:
            return {
                ...state,
                lastClickedIngredient: action.lastClickedIngredient
            };
        case INGREDIENT_SEARCH.SET_LAST_SEARCH_RESULT:
            const { result, loading, isConnectionError, lastSearchName } = action;
            return {
                ...state,
                result,
                loading,
                isConnectionError,
                lastSearchName
            };
        default:
            return state;
    }
}