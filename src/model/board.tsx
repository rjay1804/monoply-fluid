import {Cell} from "./cell";
import {Dice} from "./Dice";
//import {Place} from "./place";
import {Jail} from "./jail";
import {CommunityChest} from "./communitychest";
import {Chance} from "./chance";
import {Player} from "./player";
import { IMonopolyViewProps } from "../react/monopolyView";

export class Board {

    colours: Array<String>
    placeNames: Array<String>
    board: Array<Cell>
    dice: Dice
    players: Player

    constructor() {
        this.colours = ["red", "yellow", "blue", "green"]
        this.placeNames = ["Adhra", "Arunachal", "Assam", "Bihar", "Chattisgarh", "Goa", "Gujarat",
                          "Haryana", "Himachal", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
                           "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
                            "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "West Bengal"];
        
        this.board = new Array();
        
        for (var i = 1; i < 41; i++) {
            this.board.splice(i, 0, new Cell("white", 0, "cell", "", i));
        }

        this.dice = new Dice(6);
        this.setSpecialCells();
    }

    setProps(props: IMonopolyViewProps){
        for (var i = 1; i < 41; i++) {
            props.boardMap.set(i + "", this.board[i]);
        }
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


// import { SquareType } from "./SquareType";
// import { BoardSection } from "./BoardSection";

// interface SquareConfigData {
//   readonly type: SquareType;
//   readonly section: BoardSection;
//   readonly groupId?: number;
// }

// const squareGroupColorMap = new Map<number, string>([
//   [1, "dark-purple"], [2, "light-blue"], [3, "purple"], [4, "orange"], [5, "red"], [6, "yellow"], [7, "green"], [8, "dark-blue"],
//   [15, "island-color"]
// ]);



// const SquareConfigData = new Map<number, SquareConfigData>();
// SquareConfigData.set(1, { type: SquareType.Go, section: BoardSection.Bottom });
// SquareConfigData.set(2, { type: SquareType.Property, section: BoardSection.Bottom, groupId: 1 });
// SquareConfigData.set(3, { type: SquareType.Chance, section: BoardSection.Bottom });
// SquareConfigData.set(4, { type: SquareType.Property, section: BoardSection.Bottom, groupId: 1 });
// SquareConfigData.set(5, { type: SquareType.Property, section: BoardSection.Bottom, groupId: 15 });

// SquareConfigData.set(6, { type: SquareType.Airport, section: BoardSection.Bottom, groupId: 10 });

// SquareConfigData.set(7, { type: SquareType.Property, section: BoardSection.Bottom, groupId: 2 });
// SquareConfigData.set(8, { type: SquareType.Chance, section: BoardSection.Bottom });
// SquareConfigData.set(9, { type: SquareType.Property, section: BoardSection.Bottom, groupId: 2 });
// SquareConfigData.set(10, { type: SquareType.Property, section: BoardSection.Bottom, groupId: 2 });

// SquareConfigData.set(11, { type: SquareType.Jail, section: BoardSection.Bottom });

// SquareConfigData.set(12, { type: SquareType.Property, section: BoardSection.Left, groupId: 3 });
// SquareConfigData.set(13, { type: SquareType.Chance, section: BoardSection.Left });
// SquareConfigData.set(14, { type: SquareType.Property, section: BoardSection.Left, groupId: 3 });
// SquareConfigData.set(15, { type: SquareType.Property, section: BoardSection.Left, groupId: 3 });

// SquareConfigData.set(16, { type: SquareType.Airport, section: BoardSection.Left, groupId: 10 });

// SquareConfigData.set(17, { type: SquareType.Property, section: BoardSection.Left, groupId: 4 });
// SquareConfigData.set(18, { type: SquareType.Utility, section: BoardSection.Left });
// SquareConfigData.set(19, { type: SquareType.Property, section: BoardSection.Left, groupId: 4 });
// SquareConfigData.set(20, { type: SquareType.Property, section: BoardSection.Left, groupId: 4 });

// SquareConfigData.set(21, { type: SquareType.CentralPark, section: BoardSection.Top });

// SquareConfigData.set(22, { type: SquareType.Property, section: BoardSection.Top, groupId: 5 });
// SquareConfigData.set(23, { type: SquareType.Chance, section: BoardSection.Top });
// SquareConfigData.set(24, { type: SquareType.Property, section: BoardSection.Top, groupId: 5 });
// SquareConfigData.set(25, { type: SquareType.Property, section: BoardSection.Top, groupId: 5 });

// SquareConfigData.set(26, { type: SquareType.Airport, section: BoardSection.Top, groupId: 10 });

// SquareConfigData.set(27, { type: SquareType.Property, section: BoardSection.Top, groupId: 6 });
// SquareConfigData.set(28, { type: SquareType.Chance, section: BoardSection.Top });
// SquareConfigData.set(29, { type: SquareType.Property, section: BoardSection.Top, groupId: 6 });
// SquareConfigData.set(30, { type: SquareType.Property, section: BoardSection.Top, groupId: 6 });

// SquareConfigData.set(31, { type: SquareType.GoToJail, section: BoardSection.Top });

// SquareConfigData.set(32, { type: SquareType.Property, section: BoardSection.Right, groupId: 7 });
// SquareConfigData.set(33, { type: SquareType.Chance, section: BoardSection.Right });
// SquareConfigData.set(34, { type: SquareType.Property, section: BoardSection.Right, groupId: 7 });
// SquareConfigData.set(35, { type: SquareType.Property, section: BoardSection.Right, groupId: 7 });

// SquareConfigData.set(36, { type: SquareType.Airport, section: BoardSection.Right, groupId: 10 });

// SquareConfigData.set(37, { type: SquareType.Utility, section: BoardSection.Right });

// SquareConfigData.set(38, { type: SquareType.Property, section: BoardSection.Right, groupId: 8 });
// SquareConfigData.set(39, { type: SquareType.Chance, section: BoardSection.Right });
// SquareConfigData.set(40, { type: SquareType.Property, section: BoardSection.Right, groupId: 8 });

// export { SquareConfigData, squareGroupColorMap };