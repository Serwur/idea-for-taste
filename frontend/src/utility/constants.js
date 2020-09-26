export const DATABASE_URL = "http://192.168.1.5:5000";
export const DB_INGR_URL = `${DATABASE_URL}/ingredient`;

export const DB_INGR_FIND_BY_NAME_URL = `${DB_INGR_URL}/name`;
export const DB_INGR_CREATE_URL = DB_INGR_URL;
export const DB_INGR_UPDATE_URL = `${DB_INGR_URL}/`;

export const NAV_URLS = {
    HOME: "/",
    SIGN_IN: "/sign-in",
    REGISTER: "/register",
    FOUND_MEALS: "/found-meals/:ingrIds",
    MEAL_BY_INGREDIENT_SEARCH: "/meal-by-ingredients-search",
    CREATE_INGREDIENT: "/create-ingredient"
}