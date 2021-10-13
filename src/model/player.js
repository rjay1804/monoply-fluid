const { randomUUID } = require("crypto");

class Player {
    constructor(options) {
        id = new randomUUID;
        name = options.name;
        colour = options.colour;
        money = 10000;
        // status if required
    }
}

module.export = Player;