import { BOOTSTRAP_DASH_SIZE_NAMES } from "./constants";

/**
 * @param {String} className 
 */
export const combineAllBootstrapSizes = (className) => BOOTSTRAP_DASH_SIZE_NAMES.map(size => className + size);