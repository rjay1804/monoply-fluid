import {Cell} from "./cell";
import {Dice} from "./Dice";
import {Place} from "./place";
import {Jail} from "./jail";
import {CommunityChest} from "./communitychest";
import {Chance} from "./chance";

export class Board {

    constructor() {
        this.colours = ["red", "yellow", "blue", "green"]
        
        this.board = new Array();
        
        for (var i = 0; i < 11; i++) {
            this.board[i] = new Array();
            for (var j = 0; j < 11; j++) {
                if(i == 0 || i == 10 || j == 0 || j == 10) {
                    this.board[i][j] = new Place(this.colours[(i+j)%this.colours.length], 100);
                }
                else {
                    this.board[i][j] = new Cell("white", 0, "cell", "");
                } 
            }
        }

        console.log("before special cells are set");
        console.log(this.board);

        this.dice = new Dice(6);
        this.setSpecialCells();
    }

    setSpecialCells() {
        this.setJail()
        this.setCommunityChest()
        this.setChance();
    }

    setJail() {
        this.board[0][10] = new Jail();
    }

    setCommunityChest() {
        this.board[0][2] = new CommunityChest();
        this.board[7][0] = new CommunityChest();
        this.board[7][10] = new CommunityChest();
    }

    setChance() {
        this.board[0][7] = new Chance();
        this.board[10][8] = new Chance();
        this.board[4][0] = new Chance();
    }

    addPlayer(player) {
        this.players.push(player);
    }
    
}
