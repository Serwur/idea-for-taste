import React from "react";
import { connect } from 'react-redux';

import * as IngrUtils from "../../utility/ingredients-funs";
import IngredientSearchForm from "./IngredientSearchForm";
import { findIngredientsByName } from "../../services/ingredient.service";
import { setLastSearchName, setLastSearchResult } from "../../actions/ingredientSearchAction";
import IngredientSearchResult from "./IngredientSearchResult";

class IngredientSearch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            prevEntry: "",
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
        event.preventDefault();
        if (this.state.ingrName) {
            this.setState({ prevEntry: this.state.ingrName });
            this.fetchIngredients(this.state.ingrName)
        }
    }

    fetchIngredients(searchInput) {
        this.props.setLastSearchResult({
            lastSearchName: searchInput,
            result: [],
            loading: true,
            isConnectionError: false
        });

        this.props.findIngredientsByName(searchInput).then(
            res => {
                const foundIngredients = res.data;
                const sortedIngredients = IngrUtils.sortIngredientsByScore(foundIngredients, this.state.prevEntry);
                this.props.setLastSearchResult({
                    lastSearchName: searchInput,
                    result: sortedIngredients,
                    loading: false,
                    isConnectionError: false
                });
            }
        ).catch(
            () => {
                this.props.setLastSearchResult({
                    lastSearchName: searchInput,
                    result: [],
                    loading: false,
                    isConnectionError: true
                });
            }
        );
    }

    render() {
        console.log("Render...");

        return (
            <div className="m-2 pt-1">
                <IngredientSearchForm
                    submitQuery={this.submitQuery}
                    changeTerm={this.changeSearch}
                    inputRef={this.input}
                />
                <IngredientSearchResult listItemProps={this.props.listItemProps} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { result, lastSearchName } = state;
    return {
        lastSearchName: lastSearchName,
        result: result
    };
}

export default connect(mapStateToProps, { findIngredientsByName, setLastSearchResult, setLastSearchName })(IngredientSearch);