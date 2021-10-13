class Board {

    board_;
    dice_;
    players_;

    colours = ["red", "yellow", "blue", "green"]

    constructor() {
        board_ = new Array();
        for (var i = 0; i < 11; i++) {
            this.board_[i] = new Array();
            for (var j = 0; j < 11; j++) {
                if(i == 0 || i == 10 || j == 0 || j == 10) {
                    this.board_[i][j] = new Place(this.colours[(i+j)%this.colours.length], 1000);
                }
                else {
                    this.board_[i][j] = new Cell("white", 0, "cell", "");
                } 
            }
        }

        dice_ = new Dice(6);
        this.setSpecialCells();
    }

    setSpecialCells() {
        this.setJail()
        this.setCommunityChest()
        this.setChance();
    }

    setJail() {
        this.board_[0, 10] = new Jail();
    }

    setCommunityChest() {
        this.board_[0,2] = new CommunityChest();
        this.board_[7,0] = new CommunityChest();
        this.board_[7,10] = new CommunityChest();
    }

    setChance() {
        this.board_[0,7] = new Chance();
        this.board_[10,8] = new Chance();
        this.board_[4,0] = new Chance();
    }

    addPlayer(player) {
        players_.push(player);
    }
    
}

module.export = Board;