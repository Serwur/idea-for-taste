import React, { useState, useEffect, useLayoutEffect } from "react";
import { DATABASE_URL } from "../../../utility/constants";
import { useRouteMatch } from "react-router-dom";
import MealItem from "../common/MealItem";

export default function FoundMealsPage() {
    const parsedParams = useRouteMatch("/found-meals/:ingrIds");
    const ingrIds = parsedParams.params.ingrIds;
    const ownedIngrIds = new Set(ingrIds.split(",").map(ingrId => Number(ingrId)));

    const [fetchedData, setFetchedData] = useState({ results: new Map(), isLoading: true, error: null });
    const itemsPerRow = useItemsPerRows();

    useEffect(() => {
        if (fetchedData.isLoading) {
            const mealCompUrl = `${DATABASE_URL}/meal/ids?ingrIds=${ingrIds}`;
            fetch(mealCompUrl)
                .then(response => response.json())
                .then(data => {

                    const results = new Map();
                    data.forEach(meal => results.set(meal.id, meal));
                    setFetchedData({ isLoading: false, results: results });
                })
                .catch(err => {
                    setFetchedData({ error: "Ups... something went wrong", isLoading: false });
                });

        }
    }, [fetchedData, ingrIds]);

    if (fetchedData.isLoading) return <h3>Loading...</h3>;
    if (fetchedData.error) return <h1>{fetchedData.error}</h1>;
    if (fetchedData.results.size === 0) return <h2>Nothing found</h2>;

    return (
        <div className="container-fluid align-content-center">
            {renderMeals([...fetchedData.results].map(entry => entry[1]), ownedIngrIds, itemsPerRow)}
        </div>
    );
}

function useItemsPerRows() {
    const [itemsPerRow, setItemsPerRow] = useState(getRenderedItemsPerRow(window.innerWidth));
    useLayoutEffect(() => {
        const updateItemsPerRow = () => {
            setItemsPerRow(getRenderedItemsPerRow(window.innerWidth));
        }
        window.addEventListener("resize", updateItemsPerRow);  
        return () => window.removeEventListener("resize", getRenderedItemsPerRow);
    }, []);
    return itemsPerRow;
}

function getRenderedItemsPerRow(screenWidth) {
    if (screenWidth < 992) {
        return 2;
    } else if (screenWidth < 1200) {
        return 3;
    } else return 4;
}

function renderMeals(meals, ownedIngrIds, itemsPerRow = 3) {
    const mealItems = meals.map(meal => {
        return renderMeal(meal, ownedIngrIds);
    });

    const splittedItems = splitIntoArrays(mealItems, itemsPerRow);
    let keyCount = 0;
    return splittedItems.map(items => {
        let key = `meal-row-${keyCount++}`;
        return renderRow(items, key);
    });
}

function renderMeal(meal, ownedIngrIds) {
    const { meal_components } = meal;
    const requiredIngrIds = new Set(meal_components.map(component => component.ingredient_id));

    return <MealItem key={meal.id}
        meal={meal}
        requiredIngredientsIds={requiredIngrIds}
        ownedIngredientsIds={ownedIngrIds} />;
}

function renderRow(components, key) {
    const itemsCount = Math.round(12 / components.length);
    let keyCount = 0;
    return (
        <div key={key} className="row">
            {components.map(component => {
                return <div key={`meal-item-${keyCount++}`} className={`col-${itemsCount}`}>
                    {component}
                </div>
            })}
        </div>
    );
}

function splitIntoArrays(array, splitCount) {
    const splittedArrays = [];

    for (let startIndex = 0; startIndex < array.length; startIndex += splitCount) {
        let endIndex = startIndex + splitCount;
        endIndex = endIndex > array.length ? array.length : endIndex;
        splittedArrays.push(array.slice(startIndex, endIndex));
    }

    return splittedArrays;
}