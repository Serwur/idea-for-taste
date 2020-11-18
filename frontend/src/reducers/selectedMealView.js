import { SELECTED_MEAL_VIEW } from "../actions/types";

export default (state = null, action) => {
    switch (action.type) {
        case SELECTED_MEAL_VIEW.SET:
            return action.meal;
        default:
            return state;
    }
};