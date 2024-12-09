import initialPalettes from '../../palettes.json';

/**
 * Creates a key in local storage
 * @param {*} key 
 * @param {*} value 
*/
export const setLocalStorageKey = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Retrieves the value of a given key in local storage
 * @param {*} key
 * @returns {object} parsed value of inputted key
*/
export const getLocalStorageKey = key => {
    return JSON.parse(localStorage.getItem(key));
}

/**
 * Sets `palettes` key in local storage to the inputted object
 * @param {object} newPalettes object representing the updated palettes
*/
export const setPalettes = newPalettes => {
    setLocalStorageKey('palettes', newPalettes);
}

/**
 * Retrieves palettes stored in local storage
 * @returns {object}
*/
export const getPalettes = () => {
    const storedPalettes = getLocalStorageKey('palettes');
    return storedPalettes === null ? {} : storedPalettes;
}

/**
 * Sets value of `palettes` key in local storage to initial palettes from JSON file if key does not exist
 * @returns value of `palettes` key
*/
export const initPalettesIfEmpty = () => {
    const storedPalettes = getPalettes();
    if (!storedPalettes || Object.keys(storedPalettes).length === 0) {
        setPalettes(initialPalettes);
        return initialPalettes;
    }
    return storedPalettes;
}

/**
 * Adds palette of inputted title with random UUID to `storedPalettes`
 * @param {string} title name of new palette
 * @param {array of strings} colors array of RGB values
 * @param {string} temperature temperature input
 * @returns {object} object representing the palette of the inputted title
*/
export const addPalette = (title, colors, temperature) => {
    // creates object to represent new palette with values of `title`, `colors`, `temperature`, and `uuid`
    const newPalette = {
        title,
        colors,
        temperature,
        uuid: crypto.randomUUID()
    }
    // retrieves palettes currently stored in local storage
    const storedPalettes = getPalettes();
    // updates `storedPalettes` with key of `newPalette`'s UUID and value of `newPalette`
    storedPalettes[newPalette.uuid] = newPalette;
    // updates `palettes` key in local storage with new value of `storedPalettes`
    setPalettes(storedPalettes);
    return newPalette;
}

/**
 * Removes palette by UUID from stored palettes
 * @param {string} paletteUuid
 * @returns {object} removed palette
 * 
*/
export const removePalette = paletteUuid => {
    // retrieves palettes currently stored in local storage
    const storedPalettes = getPalettes();
    // deletes palette of UUID from object of stored palettes
    const removed = storedPalettes[paletteUuid];
    delete storedPalettes[paletteUuid];
    // updates `palettes` key in local storage's value with object excluding palette of inputted UUID
    setPalettes(storedPalettes);
    // returns deleted palette
    return removed;
}
