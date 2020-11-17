import React from 'react';
import PropTypes from "prop-types";

export default class IngredientList extends React.Component {
    render() {
        const {ItemComponent, itemProps} = this.props.listItemProps;
        let ingredients = [];

        if (this.props.location) {
            ingredients = this.props.location.state.ingredients;
        } else {
            ingredients = this.props.ingredients;
        }

        return (
            <div className="container">
                <div className="row align-content list-group">
                    {
                        ingredients.map(ingr =>
                            <ItemComponent
                                key={ingr.id}
                                ingredient={ingr}
                                props={itemProps} />)
                    }
                </div>
            </div>
        );
    }
}

IngredientList.propTypes = {
    listItemProps: PropTypes.object.isRequired
}