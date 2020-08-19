import React from "react";

export function renderLoading(LoadingComponent) {
    return <div className="loading-block"><LoadingComponent color="#6495ed" /></div>
}