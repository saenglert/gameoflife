import { GameError } from "./GameError";
import { output } from "./utils";

export class Game {
    size: number;
    state: number[][];
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;

    constructor(size: number = 16) {
        this.size = size;
        this.state = this.setInitialState(size);
        this.canvas = this.getCanvas();
        this.context = this.getContext();

        this.init();
    }

    getCanvas = (): HTMLCanvasElement => {
        if (!this.canvas) {

            const canvas = document.getElementById("board")

            if (!canvas) {
                throw new GameError("error", "Unable to select board.");
            }
            this.canvas = canvas as HTMLCanvasElement;
        }

        return this.canvas;
    }

    getContext = (): CanvasRenderingContext2D => {
       if (!this.context) {
           const context  = this.getCanvas().getContext("2d");
           if (!context) {
               throw new GameError("error", "Unable the get context.")
           }
           this.context = context;
       }

       return this.context;
    }

    setInitialState = (size: number): number[][] => {
        const state: number[][] = [];
        for (let x = 0; x < size; x++) {
            state[x] = [];
            for (let y = 0; y < size; y++) {
                state[x][y] = Math.round(Math.random() * 0.6);
            }
        }

        return state;
    }

    init = () => {
        const canvas = this.getCanvas();
        this.context = this.getContext();
        canvas.width = 512;
        canvas.height = 512;

        this.draw();
    }

    start = () => {setInterval(this.update.bind(this), 1000)}

    update = () => {
        this.step();
        this.draw();
    }

    step = () => {
        const newState = this.setInitialState(this.size);
        for (let x = 0; x < this.size; x++) {
            for (let y = 0; y < this.size; y++) {
                const currentCell = this.state[x][y];
                const neighbors = this.getNeighbors(x,y);

                // if cell is alive
                if (currentCell) {
                    // and has less than two neighbors
                    if (neighbors < 2) {
                        // it dies
                        newState[x][y] = 0;
                        continue;
                    }

                    // and has more than 3 neighbors
                    if (neighbors > 3) {
                        // it dies
                        newState[x][y] = 0;
                        continue;
                    }

                    // and has 2 or 3 neighbors it lives on
                    newState[x][y] = 1;
                } else {
                    // if the cell is dead and has exactly 3 neighbors
                    if (neighbors === 3) {
                        // it becomes alive
                        newState[x][y] = 1;
                    }
                }
            }
        }

        this.state = newState;
    }

    getNeighbors = (x: number, y: number): number => {
        let neighbors = 0;
        for (let i = x - 1; i <= x + 1; i++) {
            /**
             * Border condition:
             * if X is smaller than 0 take the opposing border block (size - 1)
             * if X is bigger or equal to size take the opposing border block
             */
            const targetX = i < 0 ? this.size - 1 : i >=  this.size ? 0 : i;
            for (let j = y - 1; j <= y + 1; j++) {
                const targetY = j < 0 ? this.size - 1 : j >= this.size ? 0 : j;
                if (targetX === x && targetY === y) continue;
                
                if (this.state[targetX][targetY]) {
                    neighbors++;
                }
            }
        }

        return neighbors
    }

    draw = () => {
        const canvas = this.getCanvas();
        const context = this.getContext();

        const cellSize = canvas.width / this.size;

        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height);

        for (let x = 0; x < this.size; x++) {
            for (let y = 0; y < this.size; y++) {
                const cellState = this.state[x][y];
                context.fillStyle = cellState ? "black" : "white";
                context.fillRect(Math.round(x * cellSize), Math.round (y * cellSize), Math.round((x + 1) * cellSize), Math.round ((y + 1) * cellSize ));
            }
        }

    }
}