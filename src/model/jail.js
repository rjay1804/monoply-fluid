class Jail extends Cell {

    constructor() {

    }

    enter(player) {
        
    }

    exit(player) {
        player.money -= 500;
    }
}

module.export = Jail;