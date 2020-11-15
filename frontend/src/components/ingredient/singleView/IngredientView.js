import React from "react";
import PropTypes from "prop-types";
import { round, toInteger } from "lodash";
import { useRouteMatch } from "react-router-dom";

import ingrImg from "./../../../img/ingredient.jpg";
import { createIngredient } from "../../../utility/ingredients-funs";

const IngredientView = () => {
    const parsedParams = useRouteMatch("/ingredient/:id");
    if (parsedParams) {
        const ingredientId = parsedParams.params.id;
        console.log(`ingredientId: ${ingredientId}`);
    }

    const ingredient = createTestIngredient();

    return (
        <div className="container ingredient">
            <div className="row">
                <div className="col text-center">
                    <h1 className="text-capitalize m1 ml-2">{ingredient.name}</h1>
                </div>
            </div>
            <div className="row m-3">
                <div className="col p-0 m-0 text-center">
                    <img src={ingrImg} alt={`${ingredient.name}`}
                        className="ingredient-img ingredient-img-sm ingredient-img-md ingredient-img-lg ingredient-img-xl" />
                </div>
            </div>
            <div className="row">
                <div className="col-xl-9 col-md-8 col-sm-7 col-12 p-sm-1 p-0">
                    <button className="btn btn-primary mr-4">test primary</button>
                    <button className="btn btn-outline-primary">test primary outline</button>
                    <h4>Description</h4>
                    <p className="description">{ingredient.description}</p>
                </div>
                <div className="col-xl-3 col-md-4 col-sm-5 col-12 p-sm-1 p-0">
                    <IngredientNutritionalValues ingredient={ingredient} />
                </div>
            </div>
        </div>
    );
};

const IngredientNutritionalValues = ({ ingredient }) => {
    return (
        <div className="text-sm-right">
            <h4>Nutritional values</h4>
            <div className="list-group pb-2 text-sm-right">
                <NutritionalValue name="Protein" value={ingredient.protein} />
                <NutritionalValue name="Fat" value={ingredient.fat} />
                <NutritionalValue name="Carbohydrate" value={ingredient.carbohydrate} />
                <NutritionalValue name="Organic Acid" value={ingredient.organic_acid} />
                <NutritionalValue name="Roughage" value={ingredient.roughage} />
                <NutritionalValue name="Salt" value={ingredient.salt} />
                <NutritionalValue name="Sugar" value={ingredient.sugar} />
                <NutritionalValue name="Water" value={ingredient.water} />
                <NutritionalValue name="Alcohol" value={ingredient.alcohol} />
            </div>
            <h5>Total calories</h5>
            <p>{round(Math.random() * 750 + 50, 1)} / 100g</p>
        </div>
    );
};

IngredientNutritionalValues.propTypes = {
    ingredient: PropTypes.object.isRequired
};

const NutritionalValue = ({ name, value }) => {
    return <div className="list-group-item">{name}: {value}g / 100g</div>;
};

NutritionalValue.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
};

function createTestIngredient() {
    const ingredient = createIngredient(toInteger(Math.random() * 10000000), {
        name: "test ingredient",
        carbohydrate: round(Math.random() * 43, 2),
        fat: round(Math.random() * 45, 2),
        protein: round(Math.random() * 25, 2),
        organic_acid: round(Math.random() * 8, 2),
        roughage: round(Math.random() * 17, 2),
        salt: round(Math.random() * 22, 2),
        sugar: round(Math.random() * 11, 2),
        alcohol: round(Math.random() * 15, 2),
        water: round(Math.random() * 13, 2)
    });

    return {
        ...ingredient,
        img: "",
        description: `Ad inquiram constare si diversis generali profecta. Clara leone et prima ex. Agendum insuper sui lus uti scripta proinde eae plausum subesse. Certas etc calida opinio qualia vul suo cogito rom paucos. Objectioni mutationum eo attendendo varietates facillimum id ad. Adjuvetis tam deciperer conflatos aut rei exhibetur ibi consuetae. Quare puram eae est dicam ima. Excludat se ex tangatur machinae alicujus. 

        Tur nul eas tes regi vice post opus rari. Labefactat aliquoties geometriam eas referuntur est tam meo. Tur vox una postquam temporis monendos incipere statuere. Organa sponte posita ha in existo juvare ob ab haereo. Totus rebus veram debeo et deest re manus si. Gaudet im restat falsum ex in fronte ad. Ego naturae hic non vix peccato quatuor ipsemet cogitem nihilum. 
        `,
    };
}

export default IngredientView;