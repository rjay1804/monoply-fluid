/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { ISharedMap } from "@fluidframework/map";
import React from "react";
//import ReactDOM from 'react-dom';
import App from "../view/App";
import { Board } from "../model/board";
import {Player} from "../model/player";
import { SquareType } from "../view/client/SquareType";
import { BoardSection } from "../view/client/BoardSection";

// import GameBoard from "../view/client/GameBoard";
// import CssBaseline from "@material-ui/core/CssBaseline";

/**
 * Props for the SudokuView React component.
 */
export interface IMonopolyViewProps {
    clientId: string;
    clientPresence?: ISharedMap;
    playerNameMap: ISharedMap;
    boardMap: ISharedMap;
    clientPlayerMap: ISharedMap;
    SquareConfigData: ISharedMap;
    whoseTurn:ISharedMap;

}


export var props_global;

export function get_props()
{
    console.log("returning props");
    return props_global;
}

// export var playerNameList;
// export function get_keys()
// {
//     console.log("returning keys");
//     return playerNameList;
// }

// export function setSquareConfigData(props: IMonopolyViewProps)
// {
//     props.SquareConfigData.set(1 + "", new SquareConfigData_());
// }

export function setPlayerName(props: IMonopolyViewProps){

    var playerName = window.prompt('Enter your user name')
    props.playerNameMap.set((props.playerNameMap.size + 1) + "", playerName);
    props.clientPlayerMap.set(playerName, new Player(playerName)); 
    console.log("Let's see what is set");
    console.log(props.clientPlayerMap.get(playerName));

    props.SquareConfigData.set(1 + "", { type: SquareType.Go, section: BoardSection.Bottom });
    props.SquareConfigData.set(2 + "", { type: SquareType.Property, section: BoardSection.Bottom, groupId: 1 });
    props.SquareConfigData.set(3 + "", { type: SquareType.Chance, section: BoardSection.Bottom });
    props.SquareConfigData.set(4 + "", { type: SquareType.Property, section: BoardSection.Bottom, groupId: 1 });
    props.SquareConfigData.set(5 + "", { type: SquareType.Property, section: BoardSection.Bottom, groupId: 15 });

    props.SquareConfigData.set(6 + "", { type: SquareType.Airport, section: BoardSection.Bottom, groupId: 10 });

    props.SquareConfigData.set(7 + "", { type: SquareType.Property, section: BoardSection.Bottom, groupId: 2 });
    props.SquareConfigData.set(8 + "", { type: SquareType.Chance, section: BoardSection.Bottom });
    props.SquareConfigData.set(9 + "", { type: SquareType.Property, section: BoardSection.Bottom, groupId: 2 });
    props.SquareConfigData.set(10 + "", { type: SquareType.Property, section: BoardSection.Bottom, groupId: 2 });

    props.SquareConfigData.set(11 + "", { type: SquareType.Jail, section: BoardSection.Bottom });

    props.SquareConfigData.set(12 + "", { type: SquareType.Property, section: BoardSection.Left, groupId: 3 });
    props.SquareConfigData.set(13 + "", { type: SquareType.Chance, section: BoardSection.Left });
    props.SquareConfigData.set(14 + "", { type: SquareType.Property, section: BoardSection.Left, groupId: 3 });
    props.SquareConfigData.set(15 + "", { type: SquareType.Property, section: BoardSection.Left, groupId: 3 });

    props.SquareConfigData.set(16 + "", { type: SquareType.Airport, section: BoardSection.Left, groupId: 10 });

    props.SquareConfigData.set(17 + "", { type: SquareType.Property, section: BoardSection.Left, groupId: 4 });
    props.SquareConfigData.set(18 + "", { type: SquareType.Utility, section: BoardSection.Left });
    props.SquareConfigData.set(19+ "", { type: SquareType.Property, section: BoardSection.Left, groupId: 4 });
    props.SquareConfigData.set(20+ "", { type: SquareType.Property, section: BoardSection.Left, groupId: 4 });

    props.SquareConfigData.set(21+ "", { type: SquareType.CentralPark, section: BoardSection.Top });

    props.SquareConfigData.set(22+ "", { type: SquareType.Property, section: BoardSection.Top, groupId: 5 });
    props.SquareConfigData.set(23+ "", { type: SquareType.Chance, section: BoardSection.Top });
    props.SquareConfigData.set(24+ "", { type: SquareType.Property, section: BoardSection.Top, groupId: 5 });
    props.SquareConfigData.set(25+ "", { type: SquareType.Property, section: BoardSection.Top, groupId: 5 });

    props.SquareConfigData.set(26+ "", { type: SquareType.Airport, section: BoardSection.Top, groupId: 10 });

    props.SquareConfigData.set(27+ "", { type: SquareType.Property, section: BoardSection.Top, groupId: 6 });
    props.SquareConfigData.set(28+ "", { type: SquareType.Chance, section: BoardSection.Top });
    props.SquareConfigData.set(29+ "", { type: SquareType.Property, section: BoardSection.Top, groupId: 6 });
    props.SquareConfigData.set(30+ "", { type: SquareType.Property, section: BoardSection.Top, groupId: 6 });

    props.SquareConfigData.set(31+ "", { type: SquareType.GoToJail, section: BoardSection.Top });

    props.SquareConfigData.set(32+ "", { type: SquareType.Property, section: BoardSection.Right, groupId: 7 });
    props.SquareConfigData.set(33+ "", { type: SquareType.Chance, section: BoardSection.Right });
    props.SquareConfigData.set(34+ "", { type: SquareType.Property, section: BoardSection.Right, groupId: 7 });
    props.SquareConfigData.set(35+ "", { type: SquareType.Property, section: BoardSection.Right, groupId: 7 });

    props.SquareConfigData.set(36+ "", { type: SquareType.Airport, section: BoardSection.Right, groupId: 10 });

    props.SquareConfigData.set(37+ "", { type: SquareType.Utility, section: BoardSection.Right });

    props.SquareConfigData.set(38 + "", { type: SquareType.Property, section: BoardSection.Right, groupId: 8 });
    props.SquareConfigData.set(39 + "", { type: SquareType.Chance, section: BoardSection.Right });
    props.SquareConfigData.set(40 + "", { type: SquareType.Property, section: BoardSection.Right, groupId: 8 });
    //playerNameList.push(playerName);  
    console.log("Squareee");   
    console.log(props.SquareConfigData.get(3 + ""));
    console.log("End");

    
}

/**
 * Renders a Sudoku grid and UI for resetting/loading puzzles and changing the theme.
 * @param props - Props for the component
 */
export function MonopolyView(props: IMonopolyViewProps): JSX.Element {

    console.log("Inside MonopolyView");
    var board__ = new Board();
    board__.setProps(props)
    console.log("Board created?")
    console.log(board__);
    setPlayerName(props);
    props_global = props;
    //var game = require('./index.html');
    return (
    //    App()
    //game
    // <div>
    //     What does this do?
    // </div>
    // <React.Fragment>
    //     <CssBaseline />
  
    //     <GameBoard />
    // </React.Fragment>

        <React.StrictMode>
            <App/>
        </React.StrictMode>
        
      
    );

}

