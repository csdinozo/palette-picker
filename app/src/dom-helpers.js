import {
    removePalette
} from './local-storage.js';

const temperatures = {
    neutral: "gray",
    warm: "red",
    cool: "blue"
}

/**
 * Displays inputted palette on webpage
 * @param paletteObj {object}
 */
export const displayPalette = (paletteObj) => {
    const palette = document.createElement("li");
    const palettesList = document.querySelector("ul#palettes-list");
    palettesList.append(palette);

    // UUID
    const uuid = paletteObj.uuid;
    palette.uuid = uuid;
    palette.className = "palettes";

    // title of palette
    const paletteTitle = document.createElement("h3");
    paletteTitle.innerText = paletteObj.title;
    paletteTitle.style.backgroundColor = "gray";
    palette.appendChild(paletteTitle);

    // colors of palette
    paletteObj.colors.forEach(color => {
        // div for elements relating to `color`
        const paletteColor = document.createElement("div");
        paletteColor.className = "palette-colors";

        const paletteColorContainer = document.createElement("div");
        paletteColorContainer.style.backgroundColor = color;

        const textExampleText = document.createElement("span");
        textExampleText.classList.add("text-examples");
        textExampleText.textContent = "Text ";
        textExampleText.style.color = "white";
        textExampleText.style.backgroundColor = color;
        paletteColorContainer.appendChild(textExampleText);

        const textExampleExample = document.createElement("span");
        textExampleExample.classList.add("text-examples");
        textExampleExample.textContent = "Example";
        textExampleExample.style.color = "black";
        textExampleExample.style.backgroundColor = color;
        paletteColorContainer.appendChild(textExampleExample);

        paletteColor.appendChild(paletteColorContainer);

        const copyButton = document.createElement("button");
        copyButton.className = "color-copy-buttons";
        const defaultCopyButtonText = `Copy ${color}`;
        copyButton.textContent = defaultCopyButtonText;
        copyButton.setAttribute("aria-label", `copy ${color} to clipboard`);
        copyButton.style.backgroundColor = "lightgray";

        copyButton.addEventListener("click", () => {
            // copies `color` to clipboard
            navigator.clipboard.writeText(color);
            // temporarily changes `copyButton` to indicate `color` has been copied
            copyButton.textContent = "Copied hex!";
            // returns `copyButton` to default text after one second
            setTimeout(() => {
                copyButton.textContent = defaultCopyButtonText;
            }, 1000);
        });

        paletteColor.appendChild(copyButton);
        palette.appendChild(paletteColor);
    });

    // remove palette
    const removePaletteButton = document.createElement("button");
    removePaletteButton.className = "delete-palette-buttons";
    removePaletteButton.textContent = "Delete Palette";
    removePaletteButton.setAttribute("aria-label", `remove palette of UUID ${uuid}`);

    removePaletteButton.addEventListener("click", () => {
        // removes palette from local storage
        removePalette(uuid);
        // removes palette from the DOM
        palette.remove();
    });
    palette.appendChild(removePaletteButton);

    // temperature of palette
    const paletteTemperature = document.createElement("p");
    const temperature = paletteObj.temperature;
    paletteTemperature.textContent = temperature;
    paletteTemperature.style.backgroundColor = temperatures[temperature];
    palette.appendChild(paletteTemperature);
}

/**
 * Displays all palettes in `palettes`
 * @param palettes {object}
 */
export const displayPalettes = palettes => {
    Object.values(palettes).forEach(palette => displayPalette(palette));
}
