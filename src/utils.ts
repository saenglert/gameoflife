import { GameError } from "./GameError";

export const output = (content: any): void => {
    console.log("Output called");
    const outputContainer = document.getElementById("output");

    if (!outputContainer) {
        throw new Error("Unable to select output container.")
    }

    if (typeof content === "string" || typeof content === "number" || typeof content === "boolean") {
        outputContainer.innerText = content.toString();
        return;
    }

    if (content.type && content.type === "custom") {
        const gameError: GameError = content as GameError;

        outputContainer.className = gameError.level;
        outputContainer.innerText = gameError.message;
        return;
    }

    throw content;
}