export function addWildcardsToInput(input) {
    return [...(input.replace(/\s/g, ""))].join("%")
}