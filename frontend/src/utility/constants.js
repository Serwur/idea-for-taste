export const DATABASE_URL = "http://localhost:5000";
export const DB_INGR_URL = `${DATABASE_URL}/ingredient`;

export const DB_INGR_FIND_BY_NAME_URL = `${DB_INGR_URL}/name`;
export const DB_INGR_CREATE_URL = DB_INGR_URL;
export const DB_INGR_UPDATE_URL = `${DB_INGR_URL}/`;

export const DB_MEAL_URL = `${DATABASE_URL}/meal`;
export const DB_MEAL_FIND_BY_ID = `${DB_MEAL_URL}/id`;

export const NAV_URLS = {
    HOME: "/",
    SIGN_IN: "/sign-in",
    REGISTER: "/register",
    FOUND_MEALS: "/found-meals",
    MEAL_BY_INGREDIENT_SEARCH: "/meal-by-ingredients-search",
    CREATE_INGREDIENT: "/create-ingredient",
    MEAL: "/meal",
    INGREDIENT: "/ingredient"
};

export const BOOTSTRAP_SIZE_NAMES = ["", "sm", "md", "lg", "xl"];
export const BOOTSTRAP_DASH_SIZE_NAMES = ["", "-sm", "-md", "-lg", "-xl"];