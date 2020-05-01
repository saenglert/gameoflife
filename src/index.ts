import { Game } from "./Game";
import { output } from "./utils";
import { GameError } from "./GameError";

window.onload = () => init();

const init = () => {
    try {
        const game = initGame(16, 25)
        initButtons(game);
        
    } catch (error) {
        output(error);
    }
}

const initGame = (size?: number, seeds?: number): Game => {
    return  new Game(size, seeds);
}

const initButtons = (game: Game) => {
    const next = document.getElementById("next");
    if (!next) {
        throw new GameError("error", "Can't select next button.")
    }

    next.onclick = game.update;

    const reset = document.getElementById("reset");
    if (!reset) {
        throw new GameError("error", "Can't select reset button.")
    }

    reset.onclick = init;
}

