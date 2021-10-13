class Cell {
    constructor(row, col) {
        this.row_ = row;
        this.col_ = col;
    }

    enter(player) {

    }
    exit(player) {

    }
    setColor(color) {
        color_ = color;
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

    id_ = 0;
    color_ = "white"
    price_ = 0;
    owner_ = "bank";
    row_ = -1;
    col_ = -1;
}

module.export = Cell;
