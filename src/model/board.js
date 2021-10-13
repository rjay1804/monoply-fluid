class Board {

    constructor() {
        board_ = new Array();
        for (var i = 0; i < 11; i++) {
            this.board_[i] = new Array();
            for (var j = 0; j < 11; j++) {
                this.board_[i][j] = new Cell(i, j);
            }
        }

        dice_ = new Dice(6);
        setSpecialCells();
    }
    setSpecialCells() {

    }

    addPlayer(player) {
        players_.push(player);
    }
    board_;
    dice_;
    players_;
}

