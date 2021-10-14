// import { randomUUID } from "crypto";
// import { SquareType } from "../view/client/SquareType";
// import { BoardSection } from "../view/client/BoardSection";
import { SquareConfigData } from "../view/client/SquareData";

export class Cell {

    colour: string
    price: number
    name: string
    type: string
    index: number
    SquareConData: SquareConfigData

    constructor(colour, price, name, type, index) {
        this.colour = colour;
        this.price = price;
        this.type = type;
        this.name = name;
        this.index = index
        this.SquareConData = SquareConfigData.get(index);

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
