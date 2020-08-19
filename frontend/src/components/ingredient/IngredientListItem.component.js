import React from "./node_modules/react";

export default function StandardIngredietListItem({ ingredient }) {
    const { name, alcohol, carbohydrate, fat, organic_acid, protein, roughage, salt, sugar, water } = ingredient;
    return (
        <div className="container m-4">
            {createTableRowData("Name", name)}
            {createTableRowData("Alcohol", alcohol)}
            {createTableRowData("Carbohydrate", carbohydrate)}
            {createTableRowData("Fat", fat)}
            {createTableRowData("Organic acid", organic_acid)}
            {createTableRowData("Protein", protein)}
            {createTableRowData("Roughage", roughage)}
            {createTableRowData("Salt", salt)}
            {createTableRowData("Sugar", sugar)}
            {createTableRowData("Water", water)}
        </div>
    );
}

function createTableRowData(valueName, value) {
    return (
        <div className="row ingr-item">
            <div className="col-4">{valueName}</div>
            <div className="col-8">{value}</div>
        </div>
    );
}
