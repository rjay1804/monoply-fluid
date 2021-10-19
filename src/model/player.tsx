//const { randomUUID } = require("crypto");

export class Player {
    
    id: number;
    name: string;
    colour: string;
    money: number;

    constructor(_name) {
//        this.id = new randomUUID;
        this.name = _name;
        //this.colour = color;
        this.money = 10000;
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
}