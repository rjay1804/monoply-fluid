/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { DataObject, DataObjectFactory } from "@fluidframework/aqueduct";
import { IFluidHandle } from "@fluidframework/core-interfaces";
import { ISharedMap, SharedMap } from "@fluidframework/map";
import { IFluidHTMLView } from "@fluidframework/view-interfaces";
import React from "react";
//import React from "react";
import ReactDOM from "react-dom";
import { MonopolyView}  from "../src/react/monopolyView";

import '../src/view/index.css';
import {Player} from "../src/model/player";
import { SquareType } from "../src/view/client/SquareType";
import { BoardSection } from "../src/view/client/BoardSection";
//import { SquareConfigData_ } from "../src/view/client/SquareData";


//import App from './App';
//import * as serviceWorker from '../src/view/serviceWorker';
//import {Board} from "../src/model/board";

/**
 * A collaborative Sudoku component built on the Fluid Framework.
 */
export class FluidMonopoly extends DataObject implements IFluidHTMLView {
    
    public get IFluidHTMLView() {
        return this;
    }

    public static ObjectIdentifier: string = "FluidMonopoly";

    /**
     * This is where you define all which Distributed Data Structures your component will use
     */
    private static readonly factory = new DataObjectFactory(
        FluidMonopoly.ObjectIdentifier,
        FluidMonopoly,
        [SharedMap.getFactory()],
        {}
    );

    public static getFactory() {
        return FluidMonopoly.factory;
    }

    private readonly monopolyMapKey = "monopoly-map";
    private readonly presenceMapKey = "clientPresence";
    private readonly clientPlayerKey = "player-map";
    private readonly boardMapKey = "boardMap";
    private readonly locKey = "loc-map";
    private readonly playerNameKey = "pl-name-map";
    private readonly whoseTurnKey = "turn-map";
    

    private playerNameMap: ISharedMap | undefined;;
    private domElement: HTMLElement | undefined;
    private clientPresence: ISharedMap | undefined;
    private boardMap: ISharedMap | undefined;
    private clientPlayerMap: ISharedMap | undefined;
    private SquareConfigData: ISharedMap | undefined;
    private whoseTurn: ISharedMap | undefined;

    /**
     * ComponentInitializingFirstTime is where you do setup for your component. This is only called once the first time
     * your component is created. Anything that happens in initializingFirstTime will happen before any other
     * user will see the component.
     */
     protected async initializingFirstTime() {
        // Create a new map for our Sudoku data
        const map = SharedMap.create(this.runtime);
        const boardMap = SharedMap.create(this.runtime);
        const player_ = SharedMap.create(this.runtime);
        const loc =  SharedMap.create(this.runtime);
        const name_ = SharedMap.create(this.runtime);
        const turn_ = SharedMap.create(this.runtime);

        // Store the new map under the sudokuMapKey key in the root SharedDirectory
        this.root.set(this.monopolyMapKey, map.handle);
        this.root.set(this.boardMapKey, boardMap.handle);
        this.root.set(this.clientPlayerKey, player_.handle);
        this.root.set(this.locKey, loc.handle);
        this.root.set(this.playerNameKey, name_.handle);
        this.root.set(this.whoseTurnKey, turn_.handle);

        // Create a SharedMap to store presence data
        const clientPresence = SharedMap.create(this.runtime);
        this.root.set(this.presenceMapKey, clientPresence.handle);

        this.whoseTurn = await this.root.get<IFluidHandle<ISharedMap>>(this.whoseTurnKey).get();
        
        this.whoseTurn.set("whoseturn", 1);
        this.whoseTurn.set("number of current players", 0);

        // console.log("Check player Map");
        // console.log(this.clientPlayerMap);
        // console.log("Is that object defined?");

        // console.log("Check boardMap:");
        // console.log(this.boardMap);

        
    }

    /**
     * This method will be called whenever the component has initialized, be it the first time or subsequent times.
     */
     protected async hasInitialized() {
        // Shared objects that are stored within other Shared objects (e.g. a SharedMap within the root, which is a
        // SharedDirectory) must be retrieved asynchronously. We do that here, in this async function, then store a
        // local reference to the object so we can easily use it in synchronous code.
        //
        // Our "puzzle" SharedMap is stored as a handle on the "root" SharedDirectory. To get it we must make a
        // synchronous call to get the IFluidHandle, then an asynchronous call to get the ISharedMap from the
        // handle.
        // this.puzzle = await this.root.get<IFluidHandle<ISharedMap>>(this.sudokuMapKey).get();
        // this.solution = await this.root.get<IFluidHandle<ISharedMap>>(this.solMapKey).get();
        // this.colorMap = await this.root.get<IFluidHandle<ISharedMap>>(this.colorMapKey).get();
        // this.counter = await this.root.get<IFluidHandle<ISharedMap>>(this.counterKey).get();
        // this.clientPlayerMap = await this.root.get<IFluidHandle<ISharedMap>>(this.clientScoreKey).get();

        // Since we're using a Fluid distributed data structure to store our Sudoku data, we need to render whenever a
        // value in our map changes. Recall that distributed data structures can be changed by both local and remote
        // clients, so if we don't call render here, then our UI will not update when remote clients change data.
        // this.puzzle.on("valueChanged", (changed, local, op) => {
        //     this.render();
        // });

        this.boardMap = await this.root.get<IFluidHandle<ISharedMap>>(this.boardMapKey).get();
        this.clientPlayerMap = await this.root.get<IFluidHandle<ISharedMap>>(this.clientPlayerKey).get();
        this.SquareConfigData = await this.root.get<IFluidHandle<ISharedMap>>(this.locKey).get();
        this.playerNameMap = await this.root.get<IFluidHandle<ISharedMap>>(this.playerNameKey).get();
        this.whoseTurn = await this.root.get<IFluidHandle<ISharedMap>>(this.whoseTurnKey).get();
       

        setPlayerName(this.playerNameMap, this.clientPlayerMap, this.SquareConfigData, this.whoseTurn);



        this.clientPlayerMap.on("valueChanged", (changed, local, op) => {
            this.render();
        });

        this.whoseTurn.on("valueChanged", (changed, local, op) => {
            this.render();
        });
        
        this.clientPresence = await this.root
            .get<IFluidHandle<ISharedMap>>(this.presenceMapKey)
            .get();

        this.clientPresence.on("valueChanged", (changed, local, op) => {
            this.render();
        });
    }

    public render(element?: HTMLElement): void {
        if (element) {
            this.domElement = element;
        }
        if (this.domElement) {
            let view: JSX.Element;
                view = (
                    <MonopolyView
                        clientPresence={this.clientPresence}
                        clientId={this.runtime.clientId ?? "not connected"}
                        playerNameMap = {this.playerNameMap}
                        boardMap={this.boardMap}
                        clientPlayerMap={this.clientPlayerMap}
                        SquareConfigData={this.SquareConfigData}
                        whoseTurn={this.whoseTurn}
                    />
                    
                );
            ReactDOM.render(view,
                this.domElement);
        }
    }
}

// var perf =require('./template.html');

// class Index extends React.Component {
//    render(){
//       return (
//          <iframe src={perf }></iframe>   /* like this */
//       );
//    }
// }
// export default Index;

var constColorMap = new Map([
    [1, "green"],
    [2, "red"],
    [3, "yellow"]
]);

export function getColor(input: number): string{

    return constColorMap.get(input);
}

export function setPlayerName(playerNameMap: ISharedMap, clientPlayerMap:ISharedMap, SquareConfigData: ISharedMap, whoseTurn: ISharedMap){

    var playerName = window.prompt('Enter your user name')
    console.log("Current size of playerName map (before input): ", playerNameMap.size);
    if (playerName == undefined)
    {
        console.log("Yooooooo");
    }
    if (playerName!= undefined)
    {   
        var idx = whoseTurn.get("number of current players");
        console.log("key_idx:", idx);
        playerNameMap.set(idx + "", playerName);
        whoseTurn.set("number of current players", whoseTurn.get("number of current players") + 1);
        clientPlayerMap.set(playerName, new Player(playerName)); 
        console.log("Let's see what is set");
        console.log(clientPlayerMap.get(playerName));

        SquareConfigData.set(1 + "", { type: SquareType.Go, section: BoardSection.Bottom });
        SquareConfigData.set(2 + "", { type: SquareType.Property, section: BoardSection.Bottom, groupId: 1 });
        SquareConfigData.set(3 + "", { type: SquareType.Chance, section: BoardSection.Bottom });
        SquareConfigData.set(4 + "", { type: SquareType.Property, section: BoardSection.Bottom, groupId: 1 });
        SquareConfigData.set(5 + "", { type: SquareType.Property, section: BoardSection.Bottom, groupId: 15 });

        SquareConfigData.set(6 + "", { type: SquareType.Airport, section: BoardSection.Bottom, groupId: 10 });

        SquareConfigData.set(7 + "", { type: SquareType.Property, section: BoardSection.Bottom, groupId: 2 });
        SquareConfigData.set(8 + "", { type: SquareType.Chance, section: BoardSection.Bottom });
        SquareConfigData.set(9 + "", { type: SquareType.Property, section: BoardSection.Bottom, groupId: 2 });
        SquareConfigData.set(10 + "", { type: SquareType.Property, section: BoardSection.Bottom, groupId: 2 });

        SquareConfigData.set(11 + "", { type: SquareType.Jail, section: BoardSection.Bottom });

        SquareConfigData.set(12 + "", { type: SquareType.Property, section: BoardSection.Left, groupId: 3 });
        SquareConfigData.set(13 + "", { type: SquareType.Chance, section: BoardSection.Left });
        SquareConfigData.set(14 + "", { type: SquareType.Property, section: BoardSection.Left, groupId: 3 });
        SquareConfigData.set(15 + "", { type: SquareType.Property, section: BoardSection.Left, groupId: 3 });

        SquareConfigData.set(16 + "", { type: SquareType.Airport, section: BoardSection.Left, groupId: 10 });

        SquareConfigData.set(17 + "", { type: SquareType.Property, section: BoardSection.Left, groupId: 4 });
        SquareConfigData.set(18 + "", { type: SquareType.Utility, section: BoardSection.Left });
        SquareConfigData.set(19+ "", { type: SquareType.Property, section: BoardSection.Left, groupId: 4 });
        SquareConfigData.set(20+ "", { type: SquareType.Property, section: BoardSection.Left, groupId: 4 });

        SquareConfigData.set(21+ "", { type: SquareType.CentralPark, section: BoardSection.Top });

        SquareConfigData.set(22+ "", { type: SquareType.Property, section: BoardSection.Top, groupId: 5 });
        SquareConfigData.set(23+ "", { type: SquareType.Chance, section: BoardSection.Top });
        SquareConfigData.set(24+ "", { type: SquareType.Property, section: BoardSection.Top, groupId: 5 });
        SquareConfigData.set(25+ "", { type: SquareType.Property, section: BoardSection.Top, groupId: 5 });

        SquareConfigData.set(26+ "", { type: SquareType.Airport, section: BoardSection.Top, groupId: 10 });

        SquareConfigData.set(27+ "", { type: SquareType.Property, section: BoardSection.Top, groupId: 6 });
        SquareConfigData.set(28+ "", { type: SquareType.Chance, section: BoardSection.Top });
        SquareConfigData.set(29+ "", { type: SquareType.Property, section: BoardSection.Top, groupId: 6 });
        SquareConfigData.set(30+ "", { type: SquareType.Property, section: BoardSection.Top, groupId: 6 });

        SquareConfigData.set(31+ "", { type: SquareType.GoToJail, section: BoardSection.Top });

        SquareConfigData.set(32+ "", { type: SquareType.Property, section: BoardSection.Right, groupId: 7 });
        SquareConfigData.set(33+ "", { type: SquareType.Chance, section: BoardSection.Right });
        SquareConfigData.set(34+ "", { type: SquareType.Property, section: BoardSection.Right, groupId: 7 });
        SquareConfigData.set(35+ "", { type: SquareType.Property, section: BoardSection.Right, groupId: 7 });

        SquareConfigData.set(36+ "", { type: SquareType.Airport, section: BoardSection.Right, groupId: 10 });

        SquareConfigData.set(37+ "", { type: SquareType.Utility, section: BoardSection.Right });

        SquareConfigData.set(38 + "", { type: SquareType.Property, section: BoardSection.Right, groupId: 8 });
        SquareConfigData.set(39 + "", { type: SquareType.Chance, section: BoardSection.Right });
        SquareConfigData.set(40 + "", { type: SquareType.Property, section: BoardSection.Right, groupId: 8 });
        //playerNameList.push(playerName);  
        console.log("Squareee");   
        console.log(SquareConfigData.get(3 + ""));
        console.log("End");
        console.log("Size after new input:", playerNameMap.size);
    }
    
}

