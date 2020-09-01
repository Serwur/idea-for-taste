import axios from "axios";

import { DATABASE_URL } from "../utility/constants";

const URL = `${DATABASE_URL}/user`;

export function signInRequest(data) {
    return dispatch => {
        return axios.post(`${URL}/sign-in`, data);
    }
}

export function registerRequest(data) {
    return dispatch => {
        return axios.post(`${URL}/register`, data);
    }
}