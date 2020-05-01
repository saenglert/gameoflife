import { GameError } from "./GameError";

export const output = (error: any): void => {
    console.log("Output called");
    const outputContainer = document.getElementById("output");

    if (!outputContainer) {
        throw new Error("Unable to select output container.")
    }

    if (typeof error === "string" || typeof error === "number" || typeof error === "boolean") {
        outputContainer.innerText = error.toString();
        return;
    }

    if (error.type && error.type === "custom") {
        const gameError: GameError = error as GameError;

        outputContainer.className = gameError.level;
        outputContainer.innerText = gameError.message;
        return;
    }

    outputContainer.className = "error";
    outputContainer.innerText = error.message;
}