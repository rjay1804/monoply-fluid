class Jail extends Cell {

    constructor() {
        super("white", 0, "jail");
    }

    enter(player) {
        
    }

    exit(player) {
        player.money -= 500;
    }
}

module.export = Jail;