class Cell {
    
    // colour_ = "white"
    // price_ = 0;
    // owner_;
    // // row_ = -1;
    // // col_ = -1;
    // type;
    // name;

    constructor(colour, price, type, name) {
        this.colour_ = colour;
        this.price_ = price;
        this.type = type;
        this.name = name;
        this.id_ = 0;
    }

    enter(player) {

    }

    exit(player) {

    }

    setId(id) {
        this.id_ = id;
    }

    rowId() {
        return this.row_;
    }
    
    colId() {
        return this.col_;
    }

    buy(player) {
    
    }
    
}

module.export = Cell;
