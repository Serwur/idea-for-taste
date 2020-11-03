import React from 'react';
import PropTypes from "prop-types";

import IngredientCreationForm from './IngredientCreationForm';

export default class IngredientCreationPage extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-4 col-md-5 col-sm-4 border-right">
                    
                </div>
                <IngredientCreationForm className="col-6 col-md-7 col-sm-8 pt-4"/>
            </div>
        );
    }
}

// TODO
/*
Create multi page ingredient creation
page1 - name, type, image, description
page2 - nutritional values + kcal
page3 - optional, can skip: measures
*/

/*
 those page will be used later for edition with view like tabs
 +extra page to: delete, make public, private ingredient for searching
*/