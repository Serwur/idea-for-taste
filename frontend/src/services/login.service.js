import axios from "axios";
import redux from "redux";

import { DATABASE_URL } from "../utility/constants";

export function login(data) {
    return dispatch => {
        return axios.post(DATABASE_URL, data);
    }
}