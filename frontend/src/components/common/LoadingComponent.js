import React from "react";

export default function LoadingComponent(Component) {
    return function ({ isLoading, ingredient, error, errorMessage }) {
        if (error) {
            return <h2>{errorMessage}</h2>
        }
        else if (!isLoading) {
            return <Component {...ingredient} />
        } else {
            return <h2 color="red">Hold on, loading some data...</h2>
        }
    }
}