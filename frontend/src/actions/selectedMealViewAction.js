import { SELECTED_MEAL_VIEW } from "./types";

export function setSelectedMealView(meal) {
    return {
        type: SELECTED_MEAL_VIEW.SET,
        meal
    };
}