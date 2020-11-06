import React, { useState } from 'react';
import PropTypes from "prop-types";

import IngredientCreationForm from './IngredientCreationForm';

export default class IngredientCreationPage extends React.Component {
    render() {
        return (
            <>
                <div className="row page-title p-0 m-0">
                    <span className="m-2">Create ingredient</span>
                </div>
                
                <ul className="nav nav-pills justify-content-center">
                    <li><a data-toggle="tab" href="#main" className="active">Main informations</a></li>
                    <li><a data-toggle="tab" href="#values">Nutritional values</a></li>
                    <li><a data-toggle="tab" href="#finish">Measures</a></li>
                </ul>
                <div className="tab-content">
                    <div id="main" className="tab-pane fade in active show">
                        <IngredientCreationForm className="row m-1 d-flex"/>
                    </div>
                    <div id="values" className="tab-pane fade">

                    </div>
                    <div id="finish" className="tab-pane fade">

                    </div>
                </div>
            </>
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