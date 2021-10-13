class Dice {

    constructor(maxVal) {
        this.min_ = 1;
        this.max_ = maxVal;

    }
    
    rollDice() {

        return Math.floor(Math.random() * (+this.max_ - +this.min_) + +this.min_);
    }
    
}

module.export = Dice;