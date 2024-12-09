import {
    initPalettesIfEmpty,
    addPalette
} from './local-storage.js';  

import {
    displayPalette,
    displayPalettes
} from './dom-helpers.js';

const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    console.log(data);

    // data retrieval
    const {
        paletteTitle,
        firstColor,
        secondColor,
        thirdColor,
        temperatureInput
    } = Object.fromEntries(data);

    const colors = [firstColor, secondColor, thirdColor];
    console.log(colors)

    // adds palette to localStorage
    const addedPalette = addPalette(paletteTitle, colors, temperatureInput);

    // displays palettes
    displayPalette(addedPalette);

    // clears form
    e.target.reset();
}

const main = () => {
    document.querySelector("#picker-form").addEventListener("submit", handleSubmit);

    const palettes = initPalettesIfEmpty();

    // display all palettes
    displayPalettes(palettes);
}

main();