const { randomUUID } = require("crypto");

class Player {
    
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

module.export = Player;