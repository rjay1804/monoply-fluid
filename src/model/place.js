import {Cell} from "./cell";

class Place extends Cell {

    constructor() {
        super("white", 50, "place", "try")
    }

    enter(player) {
        if(this.owner == null) {
            // ask to buy?
            buy(player);
        } else if(this.owner == player) {
            // already owns the property
            // ask to build property?
            
        } else {
            // check for rental
        }
    }

    exit(player) {
        // nothing here.
    }

    buy(player) {
        player.money -= this.price_;
        this.owner_ = player;
    }

}

module.export = Place;