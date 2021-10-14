/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { ISharedMap } from "@fluidframework/map";
import React from "react";
//import ReactDOM from 'react-dom';
import App from "../view/App";
// import GameBoard from "../view/client/GameBoard";
// import CssBaseline from "@material-ui/core/CssBaseline";

/**
 * Props for the SudokuView React component.
 */
export interface IMonopolyViewProps {
    clientId: string;
    clientPresence?: ISharedMap;
    playerName: String;
    startCoord: String;
    endCoord: String;
}


/**
 * Renders a Sudoku grid and UI for resetting/loading puzzles and changing the theme.
 * @param props - Props for the component
 */
export function MonopolyView(props: IMonopolyViewProps): JSX.Element {

    console.log("Inside MonopolyView");
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
          <App />
        </React.StrictMode>
        
      
    );

}

