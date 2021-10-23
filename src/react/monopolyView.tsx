/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { ISharedMap } from "@fluidframework/map";
import React from "react";
//import ReactDOM from 'react-dom';
import App from "../view/App";
import { Board } from "../model/board";

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
    playerMoneyMap: ISharedMap;

}


export var props_global;

export function get_props()
{
    console.log("returning props");
    return props_global;
}


/**
 * Renders a Monopoly board and UI for resetting/loading puzzles and changing the theme.
 * @param props - Props for the component
 */
export function MonopolyView(props: IMonopolyViewProps): JSX.Element {

    var board__ = new Board();
    board__.setProps(props)


    props_global = props;
    return (

        <React.StrictMode>
            <App/>
        </React.StrictMode>
        
      
    );

}

