class Cell {
    
    id_ = 0;
    colour_ = "white"
    price_ = 0;
    owner_;
    row_ = -1;
    col_ = -1;

    constructor(row, col, colour, price) {
        this.row_ = row;
        this.col_ = col;
        this.colour_ = colour;
        this.price_ = price;
    }

    enter(player) {

    }

    exit(player) {

    }

    setId(id) {
        id_ = id;
    }

    rowId() {
        return this.row_;
    }
    
    colId() {
        return this.col_;
    }

    buy(player) {
        player.money -= this.price_;
        this.owner = player;
    }
    
}

module.export = Cell;
