import React from "react";
import { connect } from 'react-redux';

import { LoopCircleLoading as Loading } from "react-loadingg";
import * as IngrUtils from "../../utility/ingredients-funs";
import { renderLoading } from "../common/common"
import IngredientSearchForm from "./IngredientSearchForm";
import IngredientList from "./IngredientList";
import { findIngredientsByName } from "../../services/ingredient.service";

const SEARCH_STATE = {
    SUCCESS: 1,
    ERROR_NO_RESULTS: 2,
    ERROR_EMPTY_INPUT: 3,
    NO_SEARCH: 4,
    LOADING: 5,
    ERROR_FETCH: 6
};

class IngredientSearch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            results: [],
            ingrName: "",
            loading: false,
            loaded: false,
            stayOnPage: true,
            prevEntry: "",
            isEmptyError: false,
            isFetchError: false,
            fetchErrorMsg: null
        };

        this.submitQuery = this.submitQuery.bind(this);
        this.changeSearch = this.changeSearch.bind(this);

        this.input = React.createRef();
    }

    componentDidMount() {
        this.input.current.focus();
    }

    changeSearch(event) {
        this.setState({ ingrName: event.target.value });
    }

    submitQuery(event) {
        if (this.state.ingrName) {
            this.setState(
                {
                    loaded: false,
                    loading: true,
                    results: [],
                    prevEntry: this.state.ingrName,
                    isEmptyError: false,
                    isFetchError: false,
                    fetchErrorMsg: null
                }
            );
            this.fetchIngredients(this.state.ingrName)
        } else {
            this.setState({ isEmptyError: true });
        }

        event.preventDefault();
    }

    fetchIngredients(searchInput) {
        this.props.findIngredientsByName(searchInput).then(
            res => {
                const foundIngredients = res.data;
                const sortedIngredients = IngrUtils.sortIngredientsByScore(foundIngredients, this.state.prevEntry);
                this.setState(
                    {
                        loading: false,
                        loaded: true,
                        results: sortedIngredients
                    });
            }
        ).catch(
            err => {
                this.setState(
                    {
                        isFetchError: true,
                        loading: false,
                        fetchErrorMsg: "Ups... some problem with connection has occured, don't panic =)"
                    }
                )
            }
        );
    }

    render() {
        const searchState = getSearchState({ ...this.state });

        return (
            <div className="ml-2 mr-2">
                <IngredientSearchForm
                    submitQuery={this.submitQuery}
                    changeTerm={this.changeSearch}
                    inputRef={this.input} />
                {
                    renderForSearchState(searchState, this.props.listItemProps, { ...this.state })
                }
            </div>
        );
    }
}

function getSearchState({ loaded, loading, results, isEmptyError, isFetchError }) {
    if (loading) return SEARCH_STATE.LOADING;
    if (loaded && !loading && results.length > 0) return SEARCH_STATE.SUCCESS;
    if (loaded && !loading && results.length === 0) return SEARCH_STATE.ERROR_NO_RESULTS;
    if (isEmptyError) return SEARCH_STATE.ERROR_EMPTY_INPUT;
    if (isFetchError && !loading) return SEARCH_STATE.ERROR_FETCH;
    return SEARCH_STATE.NO_SEARCH;
}

function renderForSearchState(searchState, listItemProps, { prevEntry, results, fetchErrorMsg }) {
    switch (searchState) {
        case SEARCH_STATE.ERROR_EMPTY_INPUT:
            return renderError(`Input name cannot be empty`);
        case SEARCH_STATE.ERROR_NO_RESULTS:
            return renderError(`No results for: '${prevEntry}'`);
        case SEARCH_STATE.SUCCESS:
            return renderResults(prevEntry, results, listItemProps);
        case SEARCH_STATE.NO_SEARCH:
            return <></>
        case SEARCH_STATE.LOADING:
            return renderLoading(Loading);
        case SEARCH_STATE.ERROR_FETCH:
            return renderError(`Server error: ${fetchErrorMsg}`);
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

export default connect(null, { findIngredientsByName })(IngredientSearch);