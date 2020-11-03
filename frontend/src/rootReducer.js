import { combineReducers } from "redux";

import flashMessages from "./reducers/flashMessages"
import auth from "./reducers/auth";
import ingredientEdit from "./reducers/ingredientEdit";
import ingredientSearch from "./reducers/ingredientSearch";

export default combineReducers({
    flashMessages,
    auth,
    ingredientEdit,
    ingredientSearch
});