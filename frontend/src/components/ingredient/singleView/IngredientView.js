import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { round, toInteger } from "lodash";
import { useRouteMatch } from "react-router-dom";
import ReactPlaceHolder from "react-placeholder";
import "react-placeholder/lib/reactPlaceholder.css";

import ingrImg from "./../../../img/ingredient.jpg";
import { createIngredient } from "../../../utility/ingredients-funs";
import history from "../../../history";
import { NAV_URLS } from "../../../utility/constants";
import ImageView from "../../common/singleView/ImageView";
import TitleView from "../../common/singleView/TitleView";
import { getIngredientById } from "../../../services/ingredient.service";

const IngredientView = () => {
    const parsedParams = useRouteMatch("/ingredient/:id");
    const [ingredient, setIngredient] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    let ingredientId = null;

    if (parsedParams) ingredientId = parsedParams.params.id;
    else history.push("/not-found-404");

    useEffect(() => {
        getIngredientById(ingredientId)
            .then((res) => {
                setIngredient(res.data);
                setIsLoading(false);
            })
            .catch(() => {
                history.push("/not-found-404");
            });
    }, [setIsLoading, setIngredient]);

    const viewId = `ingredient-view-${ingredientId}`;

    const showMeals = (ingrId) => {
        history.push(`${NAV_URLS.FOUND_MEALS}/${ingrId}`);
    };

    return (
        <div className="container ingredient single-view">
            <ReactPlaceHolder
                className="mb-3"
                type="text"
                rows={1}
                ready={!isLoading}
            >
                <TitleView viewId={viewId} title={ingredient.name} />
            </ReactPlaceHolder>
            <div className="row pb-2">
                <ReactPlaceHolder
                    className="m-auto"
                    type="rect"
                    style={{ width: 280, height: 200 }}
                    ready={!isLoading}
                >
                    <ImageView
                        className="col text-center"
                        viewId={viewId}
                        imgSrc={ingrImg}
                        alt={`${ingredient.name}`}
                        imgSizeClass="ingredient-img"
                        title={ingredient.name}
                    />
                </ReactPlaceHolder>
            </div>
            <div className="row">
                <button
                    className="col btn btn-outline-primary p-1 m-1"
                    onClick={() => showMeals(ingredientId)}
                >
                    Meals{" "}
                    <span role="img" aria-label="meals-icon">
                        🥘
                    </span>
                </button>
                <button className="col btn btn-outline-primary p-1 m-1">
                    Add to list{" "}
                    <span role="img" aria-label="add-to-list-icon">
                        ➕
                    </span>
                </button>
            </div>
            <div className="row">
                <div className="col-xl-9 col-md-8 col-sm-7 col-12 p-sm-1 p-0">
                    <h4>Description</h4>
                    <ReactPlaceHolder type="text" rows={8} ready={!isLoading}>
                        <p className="description">{ingredient.description}</p>
                    </ReactPlaceHolder>
                </div>
                <div className="col-xl-3 col-md-4 col-sm-5 col-12 p-sm-1 p-0">
                    <IngredientNutritionalValues
                        ingredient={ingredient}
                        isLoading={isLoading}
                    />
                </div>
            </div>
        </div>
    );
};

/**
 * @param {Object} props
 * @param {Ingredient} props.ingredient
 * @param {Ingredient} props.isLoading
 */
const IngredientNutritionalValues = ({ ingredient, isLoading }) => {
    return (
        <div className="text-sm-right">
            <h4>Nutritional values</h4>
            <div className="list-group pb-2 text-sm-right">
                <ReactPlaceHolder type="text" rows={9} ready={!isLoading}>
                    <NutritionalValue
                        name="Protein"
                        value={ingredient.protein}
                    />
                    <NutritionalValue name="Fat" value={ingredient.fat} />
                    <NutritionalValue
                        name="Carbohydrate"
                        value={ingredient.carbohydrate}
                    />
                    <NutritionalValue
                        name="Organic Acid"
                        value={ingredient.organic_acid}
                    />
                    <NutritionalValue
                        name="Roughage"
                        value={ingredient.roughage}
                    />
                    <NutritionalValue name="Salt" value={ingredient.salt} />
                    <NutritionalValue name="Sugar" value={ingredient.sugar} />
                    <NutritionalValue name="Water" value={ingredient.water} />
                    <NutritionalValue
                        name="Alcohol"
                        value={ingredient.alcohol}
                    />
                </ReactPlaceHolder>
            </div>
            <h5>Total calories</h5>
            <ReactPlaceHolder type="text" ready={!isLoading}>
                <p>{ingredient.kcal} / 100g</p>
            </ReactPlaceHolder>
        </div>
    );
};

IngredientNutritionalValues.propTypes = {
    ingredient: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
};

const NutritionalValue = ({ name, value }) => {
    return (
        <div className="list-group-item">
            {name}: {value}g / 100g
        </div>
    );
};

NutritionalValue.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.number,
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
        water: round(Math.random() * 13, 2),
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
