//const { randomUUID } = require("crypto");
import { NyThemeData } from "../view/client/NyTheme";

export class Player {
    
    id: number;
    name: string;
    colour: string;
    money: number;
    loc: number ;

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
        var cost = NyThemeData.get(this.loc).price;
        console.log("Cost:", cost);
        console.log("Money before buying", this.money);
        this.money-=cost;
        console.log("Money after buying", this.money);
    }

}