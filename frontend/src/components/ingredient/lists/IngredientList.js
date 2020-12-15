import React from "react";
import PropTypes from "prop-types";

export default class IngredientList extends React.Component {
    render() {
        const { ItemComponent, itemProps } = this.props.listItemProps;
        let ingredients = [];

        if (this.props.location) {
            ingredients = this.props.location.state.ingredients;
        } else {
            ingredients = this.props.ingredients;
        }

        return (
            <div className="container container-md">
                <div className="row align-content">
                    {ingredients.map((ingr) => (
                        <div className="col-xl-4 col-md-6 col-12" key={ingr.id}>
                            <ItemComponent
                                ingredient={ingr}
                                props={itemProps}
                            />
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

IngredientList.propTypes = {
    listItemProps: PropTypes.object.isRequired,
};
