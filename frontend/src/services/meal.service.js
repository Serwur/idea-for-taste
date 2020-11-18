import axios from "axios";

import { DB_MEAL_FIND_BY_ID } from "../utility/constants";

export function getMealById(id) {
    return async dispatch => {
        const searchUrl = `${DB_MEAL_FIND_BY_ID}?id=${id}`;
        return axios.get(searchUrl);
    };
}