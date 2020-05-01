export class GameError {
    type = "custom";
    level: "error" | "warning";
    message: string;

    constructor(level: "error" | "warning", message: string) {
        this.level = level;
        this.message = message;                                         
    }
}