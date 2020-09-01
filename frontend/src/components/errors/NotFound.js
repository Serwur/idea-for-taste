import React from "react";

const NotFound = () => {
    return (
        <div className="row">
            <div className="col-8 offset-2">
                <h2>Ups...such page with url doesn't exists</h2>
                <p className="alert alert-danger">Status code 404</p>
            </div>
        </div>
    );
}

export default NotFound;