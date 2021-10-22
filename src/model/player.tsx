//const { randomUUID } = require("crypto");
import { SquareConfigData } from "../view/client/SquareData";

export class Player {
    
    id: number;
    name: string;
    colour: string;
    money: number;
    loc: SquareConfigData;

    constructor(_name) {
//        this.id = new randomUUID;
        this.name = _name;
        //this.colour = color;
        this.money = 10000;
        this.loc = SquareConfigData.get(0);
        // status if required
    }

    changeScore(ind){
        if (ind==1){
            this.money+=1035;
        }
        if (ind==2){
            this.money-=1035;
        }
        if (ind==3){
            this.money-=100;
        }
    }

    changeLoc(new_square: SquareConfigData)
    {
        this.loc = new_square;
    }
}