const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mysql = require("mysql");
const bodyParser = require("body-parser");

dotenv.config();
const app = createExpressApp();
const port = createPort(5000);

applyRoute(app, "../routes/ingredient.route", "/ingredient");
applyRoute(app, "../routes/meal_components.route.js", "/mealComponents")
applyRoute(app, "../routes/meal.route.js", "/meal");
startAppListen(app, port);

function createPort(portNumber) {
    return process.env.PORT || portNumber;
}

function createExpressApp() {
    const app = express();
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
    app.use(bodyParser.text({ type: 'text/html' }));
    return app;
}

function startAppListen(app, port) {
    app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
    });
}

function applyRoute(app, routeDiskLocation, path) {
    app.use(path, require(routeDiskLocation));
}