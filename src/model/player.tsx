//const { randomUUID } = require("crypto");
import { NyThemeData } from "../view/client/NyTheme";
import {SquareThemeData} from "../view/client/NyTheme"
import { get_props } from "../react/monopolyView";

export class Player {
    
    id: number;
    name: string;
    colour: string;
    money: number;
    loc: number ;
    properties: Array<SquareThemeData>;

    constructor(_name, _colour, _id) {
//        this.id = new randomUUID;
        this.name = _name;
        this.money = 10000;
        this.loc = 5;
        this.colour = _colour;
        //console.log("Colour", this.colour);
        this.id = _id;
        this.properties = new  Array<SquareThemeData>();
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

    changeLoc(die: number)
    {
        //this.loc += new_loc;
        var props = get_props();
        var new_loc = (props.playerLocMap.get(this.name) + die) % 41;
        if (new_loc == 0)
        {
            new_loc = 1;
        }
        props.playerLocMap.set(this.name, new_loc);
        //console.log("new Location:", props.playerLocMap.get(this.name));
    }

    Buy()
    {
        //console.log("Calling Buy...")
        var cost = NyThemeData.get(this.loc).price;
        //console.log("Cost:", cost);
        //console.log("Money before buying", this.money);
        var props = get_props();
        //console.log("ID:", this.id);
        //console.log("Log something else:", props.playerNameMap);
        //console.log("Money:", props.playerMoneyMap);
        this.money = props.playerMoneyMap.get(this.name);
        this.money-=cost;

        
        props.playerMoneyMap.set(this.name, this.money);
        //console.log("Money after buying", this.money);
        //console.log(NyThemeData.get(this.loc));
        this.properties.push(NyThemeData.get(this.loc));
    }

    Sell(loc)
    {
        //console.log("Before:", this.properties);
        var place = NyThemeData.get(loc)
        var cost = place.price;
        this.money+=cost;
        //console.log("Sold!");
        var index = this.properties.indexOf(place);
        this.properties.splice(index, 1);
        //console.log("After:", this.properties);

    }

    Pay_Rent()
    {
        var rent = 10;
        //var cost = NyThemeData.get(this.loc).rent;
        //console.log("Rent:", rent);
        this.money-=rent;
    }

}