import palettes from '../../palettes.json';
import crypto from 'node:crypto';

export const setLocalStorageKey = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

export const getLocalStorageKey = key => {
    const value = localStorage.getItem(key);
    return JSON.parse(value);
}

export const setPalettes = newPalettes => {

}

export const getPalettes = () => {

}

export const initPalettesIfEmpty = () => {

}

export const addPalette = newPalette => {

}

export const removePalette = paletteUuid => {
    
}
