import React from "react";

import IngredientSearch from "../../ingredient/search/IngredientSearch"
import ChoosenIngredientsList from "../../ingredient/lists/ChoosenIngredientsList";
import IngrListItemAdd from "../../ingredient/lists/listItems/IngrListItemAdd"

export default class MealByIngredientSearchPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ingredients: new Map()
        };

        this.addIngredientToList = this.addIngredientToList.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.isIngredientChoosen = this.isIngredientChoosen.bind(this);
    }

    addIngredientToList(ingredient) {
        const currIngrMap = this.state.ingredients;
        if (!currIngrMap.has(ingredient.id)) {
            currIngrMap.set(ingredient.id, ingredient);
            this.setState({ ingredients: currIngrMap });
        }
    }

    removeItem(ingrId) {
        const currIngrMap = this.state.ingredients;
        currIngrMap.delete(ingrId);
        this.setState({ ingredients: currIngrMap });
    }

    isIngredientChoosen(id) {
        return this.state.ingredients.has(id);
    }

    render() {
        return (
            <div className="row">
                <div id="choosen-ingr-list" className="col-12 col-sm-5 col-md-4 col-lg-4">
                    <ChoosenIngredientsList
                        ingredients={[...this.state.ingredients.values()]}
                        removeItem={this.removeItem} />
                </div>

                <div className="col-12 col-sm-7 col-md-8 col-lg-8">
                    <IngredientSearch listItemProps={
                        {
                            ItemComponent: IngrListItemAdd,
                            itemProps: {
                                addIngredientToList: this.addIngredientToList,
                                isIngredientChoosen: this.isIngredientChoosen
                            }
                        }
                    } />
                </div>
            </div>
        );
    }
}