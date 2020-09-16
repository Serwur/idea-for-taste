import React, { useState, useEffect } from 'react';

import { useParams } from "react-router-dom";
import LoadingComponent from "./loading.component";
import IngredientListItem from './ingredient-list-item.component';

export default function IngredientPage() {
    const IngredientItem = LoadingComponent(IngredientListItem);
    const [appState, setAppState] = useState({
        loading: false,
        ingredient: null,
        error: false,
        errorMessage: "Unknown error"
    });

    const { id } = useParams();
    useEffect(() => {
        setAppState({ loading: true });
        fetch(`http://localhost:5000/ingredient?id=${id}`)
            .then(response => response.json())
            .then(data => {
                setAppState({ loading: false, ingredient: data });
            }).catch(err => {
                setAppState({ loading: false, error: true, errorMessage: `Cannot find such ingredient` });
            });
    }, []);

    return <IngredientItem isLoading={appState.loading}
        ingredient={appState.ingredient}
        error={appState.error}
        errorMessage={appState.errorMessage} />;
}