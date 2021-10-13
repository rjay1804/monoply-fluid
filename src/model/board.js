class Board {

    board_;
    dice_;
    players_;

    constructor() {
        board_ = new Array();
        for (var i = 0; i < 11; i++) {
            this.board_[i] = new Array();
            for (var j = 0; j < 11; j++) {
                this.board_[i][j] = new Cell(i, j);
            }
        }

        dice_ = new Dice(6);
        this.setPlaces();
        this.setSpecialCells();
    }

    setSpecialCells() {
        this.setJail()
        this.setCommunityChest()
        this.setChance();
    }

    setJail() {

    }

    setCommunityChest() {

    }

    setChance() {

    }

    setPlaces() {

    }

    addPlayer(player) {
        players_.push(player);
    }
    
}

module.export = Board;