import {Cell} from "./cell";

export class Place extends Cell {

    
    constructor(colour, price, placeName) {
        super(colour, price, placeName, "place");
    }

    enter(player) {
        if(this.owner == null) {
            // ask to buy?
            this.buy(player);
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
