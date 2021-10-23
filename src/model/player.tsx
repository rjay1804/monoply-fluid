//const { randomUUID } = require("crypto");
import { NyThemeData } from "../view/client/NyTheme";
import {SquareThemeData} from "../view/client/NyTheme"

export class Player {
    
    id: number;
    name: string;
    colour: string;
    money: number;
    loc: number ;
    properties: Array<SquareThemeData>

    constructor(_name, _colour, _id) {
//        this.id = new randomUUID;
        this.name = _name;
        this.money = 10000;
        this.loc = 5;
        this.colour = _colour;
        console.log("Colour", this.colour);
        this.id = _id;
        // status if required
    }

    changeScore(ind){
    
    console.log("Inside change score");
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

    changeLoc(new_loc: number)
    {
        this.loc = new_loc;
    }

    Buy()
    {
        console.log("Calling Buy...")
        var cost = NyThemeData.get(this.loc).price;
        console.log("Cost:", cost);
        console.log("Money before buying", this.money);
        this.money-=cost;
        console.log("Money after buying", this.money);
        this.properties.push(NyThemeData.get(this.loc));
    }

    Sell(loc)
    {
        var cost = NyThemeData.get(loc).price;
        this.money+=cost;
        console.log("Sold!");

    }

}