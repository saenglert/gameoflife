import { Game } from "./Game";
import { output } from "./utils";

window.onload = () => {
    try {
        const game: Game = init();
        game.start();
    } catch (error) {
        output(error);
    }
}

const init = (size?: number): Game => {
    return new Game(size);
}

