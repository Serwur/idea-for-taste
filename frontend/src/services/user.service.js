import axios from "axios";
import jwt from "jsonwebtoken";

import setAuthorizationToken from "../utility/setAuthorizationToken";

import { DATABASE_URL } from "../utility/constants";
import { SET_CURRENT_USER } from "../actions/types";

const URL = `${DATABASE_URL}/user`;

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    };
}

export function signInRequest(data) {
    return async dispatch => {
        const res = await axios.post(`${URL}/sign-in`, data);
        const token = res.data.token;
        localStorage.setItem("jwtToken", token);
        setAuthorizationToken(token);
        dispatch(setCurrentUser(jwt.decode(token)));
    }
}

export function logout() {
    return async dispatch => {
        localStorage.removeItem("jwtToken");
        setAuthorizationToken(false);
        dispatch(setCurrentUser({}));
    };
}

export function registerRequest(data) {
    return dispatch => {
        return axios.post(`${URL}/register`, data);
    }
}