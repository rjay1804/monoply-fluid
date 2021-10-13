import { randomUUID } from "crypto";

export class Cell {

    constructor(colour, price, type, name) {
        this.colour = colour;
        this.price = price;
        this.type = type;
        this.name = name;
        //this.id = new randomUUID;
    }

    enter(player) {

    }

    exit(player) {

    }

    // rowId() {
    //     return this.row_;
    // }
    
    // colId() {
    //     return this.col_;
    // }

    buy(player) {
        // no implementation here
    }
    
}
