import React from 'react'
import { useSelector } from "react-redux";

import IngredientList from './IngredientList';
import { LoopCircleLoading as Loading } from "react-loadingg";
import { renderLoading } from "../common/common"

const SEARCH_STATE = {
    SUCCESS: 1,
    ERROR_NO_RESULTS: 2,
    ERROR_EMPTY_INPUT: 3,
    NO_SEARCH: 4,
    LOADING: 5,
    ERROR_FETCH: 6
};

export default function IngredientSearchResult(props) {
    const state = useSelector(state => state.ingredientSearch);
    const searchState = getSearchState(state);
    return render(searchState, state, props.listItemProps);
}

function getSearchState({ lastSearchName, result, loading, isConnectionError }) {
    if (loading) return SEARCH_STATE.LOADING;
    else {
        if (result !== null) {
            if (!lastSearchName) return SEARCH_STATE.ERROR_EMPTY_INPUT;
            if (isConnectionError) return SEARCH_STATE.ERROR_FETCH;
            if (result.length > 0) return SEARCH_STATE.SUCCESS;
            if (result.length === 0) return SEARCH_STATE.ERROR_NO_RESULTS;
        }
        return SEARCH_STATE.NO_SEARCH;
    }
}

function render(searchState, { lastSearchName, result }, listItemProps) {
    switch (searchState) {
        case SEARCH_STATE.ERROR_EMPTY_INPUT:
            return renderError(`Input name cannot be empty`);
        case SEARCH_STATE.ERROR_NO_RESULTS:
            return renderError(`No results for: '${lastSearchName}'`);
        case SEARCH_STATE.SUCCESS:
            return renderResults(lastSearchName, result, listItemProps);
        case SEARCH_STATE.NO_SEARCH:
            return <></>
        case SEARCH_STATE.LOADING:
            return renderLoading(Loading);
        case SEARCH_STATE.ERROR_FETCH:
            return renderError(`Ups...we cannot establish connection, please try again later =)`);
        default:
            throw new Error("Wrong search state");
    }
}


function renderError(errorMessage) {
    return <div className="alert alert-danger ml-2 mr-2 p-1">{errorMessage}</div>;
}

function renderResults(inputIngrName, results, listItemProps) {
    return (
        <>
            <div className="alert alert-success">Found {results.length} results for: '{inputIngrName}'</div>
            <IngredientList ingredients={results} listItemProps={listItemProps} />
        </>
    );
}