import palettes from '../../palettes.json';

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
 * Sets value of `palettes` key in local storage to JSON object of palettes
 * @param {object} newPalettes object of palettes
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
    return storedPalettes || {};
}

/**
 * Sets value of `palettes` key in local storage to an empty object if key does not exist
*/
export const initPalettesIfEmpty = () => {
    const storedPalettes = getPalettes();
    if (!storedPalettes || Object.keys(storedPalettes).length === 0) {
        setPalettes(storedPalettes);
    }
}

/**
 * Adds palette of inputted title with random UUID to `storedPalettes`
 * @param {string} title name of new palette
 * @returns {object} object representing the palette of the inputted title
*/
export const addPalette = title => {
    // creates object to represent new palette with values of `title` and `uuid`
    const newPalette = {
        title,
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
 * Removes palette of inputted UUID from `palettes` in local storage
 * @param {number} paletteUuid
*/
export const removePalette = paletteUuid => {
    // retrieves palettes currently stored in local storage
    const storedPalettes = getPalettes();
    // deletes palette of UUID from object of stored palettes
    delete storedPalettes[uuid];
    // updates `palettes` key in local storage's value with object excluding palette of inputted UUID
    setPalettes(storedPalettes);
}
