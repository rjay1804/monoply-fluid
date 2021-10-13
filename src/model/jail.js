import {Cell} from "./cell";

export class Jail extends Cell {

    constructor() {
        super("white", 0, "jail", "Jail");
    }

    enter(player) {
        
    }

    exit(player) {
        player.money -= 500;
    }
}