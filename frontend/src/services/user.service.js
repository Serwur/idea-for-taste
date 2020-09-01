import axios from "axios";

import { DATABASE_URL } from "../utility/constants";

const URL = `${DATABASE_URL}/user`;

export function loginRequest(data) {
    return dispatch => {
        return axios.post(`${URL}/login`, data);
    }
}

export function registerRequest(data) {
    return dispatch => {
        return axios.post(`${URL}/register`, data);
    }
}