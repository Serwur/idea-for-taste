import React from "react";

export default function IngredientSearchForm({ submitQuery, changeTerm, inputRef }) {
    return (
        <form onSubmit={submitQuery} className="col-sm offset-sm-0 col-md-8 offset-md-2 col-xl-6 offset-xl-3 pt-4 pb-4">
            <div className="form-group">
                <label htmlFor="ingredient-name">Ingredient name</label>
                <input onChange={changeTerm}
                    id="ingredient-name"
                    name="name"
                    placeholder="E.g. milk"
                    className="form-control"
                    ref={inputRef} />
            </div>
            <button type="submit"
                value="Search"
                className="btn btn-outline-primary">
                Search
                </button>
        </form>
    );
}