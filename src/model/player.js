const { randomUUID } = require("crypto");

export class Player {
    
    id;
    name;
    colour;
    money;

    constructor(options) {
        this.id = new randomUUID;
        this.name = options.name;
        this.colour = options.colour;
        this.money = 10000;
        // status if required
    }
}