import React from "react";
import IngredientSearch from "../components/IngredientSearch.component";
import ChoosenIngredientsList from "../components/search-meal-by-ingredients/ChoosenIngredientsList.component";
import IngrListItemAdd from "../components/search-meal-by-ingredients/IngrListItemAdd.component"

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
            <div className="container-fluid mb-2">
                <div className="row">
                    <div id="choosen-ingr-list" className="col-5 col-md-4 col-lg-4 border-right border-bottom">
                        <ChoosenIngredientsList
                            ingredients={[...this.state.ingredients.values()]}
                            removeItem={this.removeItem} />
                    </div>

                    <div className="col-7 col-md-8 col-lg-8">
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
            </div>
        );
    }
}