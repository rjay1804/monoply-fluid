/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { ISharedMap } from "@fluidframework/map";
import React from "react";
//import ReactDOM from 'react-dom';
import App from "../view/App";
import { Board } from "../model/board";
import {Player} from "../model/player"


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
    playerLocMap: ISharedMap;
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

export function setPlayerName(props: IMonopolyViewProps){

    var playerName = window.prompt('Enter your user name')
    props.playerNameMap.set((props.playerNameMap.size + 1) + "", playerName);
    props.clientPlayerMap.set(playerName, new Player(playerName)); 
    console.log("Let's see what is set");
    console.log(props.clientPlayerMap.get(playerName));
    //playerNameList.push(playerName);  
    //console.log(props.clientPlayerMap.size);   
    
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

