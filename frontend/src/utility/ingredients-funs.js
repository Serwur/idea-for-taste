import longestCommonSubstring from "./longest-common-substr";

export function sortIngredientsByScore(ingredients, searchNameParam) {
    const scores = new Map();
    const mappedIngredients = new Map();

    ingredients.forEach(ingr => {
        mappedIngredients.set(ingr.id, ingr);
        scores.set(ingr.id, countScore(ingr.name, searchNameParam));
    })

    // [1] index is value (score)
    const sortedScores = new Map([...scores.entries()].sort((score1, score2) => {
        return score2[1] - score1[1];
    }));

    const sortedIngredients = [];
    sortedScores.forEach((score, ingrId) => sortedIngredients.push(mappedIngredients.get(ingrId)));

    return sortedIngredients;
}

export function countScore(ingrName, searchNameParam) {
    const ingrNameUpper = ingrName.toUpperCase();
    const nameParamUpper = searchNameParam.toUpperCase();

    if (ingrNameUpper === nameParamUpper) return Number.MAX_VALUE;

    let score = 0;
    score += getScoreForContainsPhrase(ingrNameUpper, nameParamUpper);
    score += getScoreForLongestPrefixInWords(ingrNameUpper, nameParamUpper);
    score += getScoreForLongestCommonSubstr(ingrNameUpper, nameParamUpper);
    return score;
}

export function getScoreForContainsPhrase(str, phrase) {
    return str.indexOf(phrase) !== -1 ? 100000 : 0;
}

export function getScoreForLongestCommonSubstr(str1, str2) {
    let lenOfCommonSubstr = longestCommonSubstring(str1, str2).length;
    return (lenOfCommonSubstr * lenOfCommonSubstr) * 50;
}

export function getScoreForLongestPrefixInWords(str, prefix) {
    const longestWordPrefix = getLongestPrefixFromWords(str, prefix);
    return (getMultiplierForWordNo(longestWordPrefix.wordNo) * longestWordPrefix.length) * 1000;
}

export function getLongestPrefixFromWords(str, prefix) {
    const words = str.split(" ");
    let longest = 0;
    let longestWordNo = 0;

    let i = 0;
    words.forEach(word => {
        const lenOfPrefix = getLongestPrefixLength(word, prefix);
        if (lenOfPrefix > longest) {
            longest = lenOfPrefix;
            longestWordNo = i;
        }
        i++;
    })

    return {
        length: longest,
        wordNo: longestWordNo
    };
}

export function getMultiplierForWordNo(wordNo) {
    return wordNo === 0 ? 4 : 1.5;
}

export function getLongestPrefixLength(str, prefix) {
    let len = 0;
    const loopCount = str.length > prefix.length ? prefix.length : str.length;
    for (let i = 0; i < loopCount; i++) {
        if (str.charAt(i) !== prefix.charAt(i)) {
            return len;
        }
        len++;
    }
    return len;
}

export function createEmptyIngredientObject() {
    return createIngredient(null, {});
}

export function createIngredient(id, {name, carbohydrate, fat, organic_acid, protein, roughage, salt, sugar, alcohol, water}) {
    return {
        id: id ? id : null,
        name: emptyIfUndefinedOrNull(name),
        carbohydrate: zeroIfUndefinedOrNull(carbohydrate),
        fat: zeroIfUndefinedOrNull(fat),
        organic_acid: zeroIfUndefinedOrNull(organic_acid),
        protein: zeroIfUndefinedOrNull(protein),
        roughage: zeroIfUndefinedOrNull(roughage),
        salt: zeroIfUndefinedOrNull(salt),
        sugar: zeroIfUndefinedOrNull(sugar),
        alcohol: zeroIfUndefinedOrNull(alcohol),
        water: zeroIfUndefinedOrNull(water)
    };
}

function zeroIfUndefinedOrNull(value) {
    return value ? value : "0";
}

function emptyIfUndefinedOrNull(value) {
    return value ? value : "";
}