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
    private readonly squareKey = "sq-key";
    private readonly locKey = "loc-map";
    private readonly playerNameKey = "pl-name-map";
    private readonly whoseTurnKey = "turn-map";
    private readonly playerMoneyKey = "money-map";
    

    private playerNameMap: ISharedMap | undefined;;
    private domElement: HTMLElement | undefined;
    private clientPresence: ISharedMap | undefined;
    private boardMap: ISharedMap | undefined;
    private clientPlayerMap: ISharedMap | undefined;
    private SquareConfigData: ISharedMap | undefined;
    private whoseTurn: ISharedMap | undefined;
    private playerMoneyMap: ISharedMap | undefined;
    private playerLocMap: ISharedMap | undefined;

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
        const square =  SharedMap.create(this.runtime);
        const name_ = SharedMap.create(this.runtime);
        const turn_ = SharedMap.create(this.runtime);
        const money_ =  SharedMap.create(this.runtime);

        // Store the new map under the sudokuMapKey key in the root SharedDirectory
        this.root.set(this.monopolyMapKey, map.handle);
        this.root.set(this.boardMapKey, boardMap.handle);
        this.root.set(this.clientPlayerKey, player_.handle);
        this.root.set(this.squareKey, square.handle);
        this.root.set(this.playerNameKey, name_.handle);
        this.root.set(this.whoseTurnKey, turn_.handle);
        this.root.set(this.playerMoneyKey, money_.handle);
        this.root.set(this.locKey, loc.handle);

        // Create a SharedMap to store presence data
        const clientPresence = SharedMap.create(this.runtime);
        this.root.set(this.presenceMapKey, clientPresence.handle);

        this.whoseTurn = await this.root.get<IFluidHandle<ISharedMap>>(this.whoseTurnKey).get();
        this.playerLocMap = await this.root.get<IFluidHandle<ISharedMap>>(this.locKey).get();
        
        this.whoseTurn.set("whoseturn", 0);
        this.whoseTurn.set("number of current players", 0);
        this.whoseTurn.set("dice", false);
        this.whoseTurn.set("dice_char", "");
        this.whoseTurn.set("utility", false);
        this.whoseTurn.set("trigger_render", false);


        
    }

    /**
     * This method will be called whenever the component has initialized, be it the first time or subsequent times.
     */
     protected async hasInitialized() {


        this.boardMap = await this.root.get<IFluidHandle<ISharedMap>>(this.boardMapKey).get();
        this.clientPlayerMap = await this.root.get<IFluidHandle<ISharedMap>>(this.clientPlayerKey).get();
        this.SquareConfigData = await this.root.get<IFluidHandle<ISharedMap>>(this.squareKey).get();
        this.playerNameMap = await this.root.get<IFluidHandle<ISharedMap>>(this.playerNameKey).get();
        this.whoseTurn = await this.root.get<IFluidHandle<ISharedMap>>(this.whoseTurnKey).get();
        this.playerMoneyMap = await this.root.get<IFluidHandle<ISharedMap>>(this.playerMoneyKey).get();
       

        setPlayerProps(this.playerNameMap, this.clientPlayerMap, this.SquareConfigData, this.whoseTurn,
                       this.playerMoneyMap, this.playerLocMap);



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
                        playerMoneyMap = {this.playerMoneyMap}
                        playerLocMap = {this.playerLocMap}
                    />
                    
                );
            ReactDOM.render(view,
                this.domElement);
        }
    }
}

var constColorMap = new Map([
    [1, "green"],
    [2, "red"],
    [3, "yellow"]
]);

export function getColor(input: number): string{

    return constColorMap.get(input);
}


var twelve_color_array = ["#0048BA", "#D3212D", "#7FFFD4", "#F4C2C2", "#BFFF00", "#54626F", "#AF6E4D",
                            "#FFF600", "#800020", "#ACE1AF", "#F7E7CE", "#AA381E", "#B9D9EB"]

export function setPlayerProps(playerNameMap: ISharedMap, clientPlayerMap:ISharedMap, SquareConfigData: ISharedMap, whoseTurn: ISharedMap,
                                playerMoneyMap: ISharedMap, playerLocMap: ISharedMap){

    var playerName = window.prompt('Enter your user name')
    var status =clientPlayerMap.get(playerName);
    if(status==undefined)
    {
    //console.log("Current size of playerName map (before input): ", playerNameMap.size);
    if (playerName == undefined)
    {
        console.log("Yooooooo");
    }
    if (playerName!= undefined)
    {   
        var idx = whoseTurn.get("number of current players");
        //console.log("key_idx:", idx);
        playerNameMap.set(idx + "", playerName);

        var colour = twelve_color_array[whoseTurn.get("number of current players") +3 % 12];
        clientPlayerMap.set(playerName, new Player(playerName, colour, idx)); 
        playerMoneyMap.set(playerName, 10000);
        playerLocMap.set(playerName, 1);
        //console.log("Money init:");
        //console.log(playerMoneyMap.get(playerName));


        whoseTurn.set("number of current players", whoseTurn.get("number of current players") + 1);


        
        // console.log("Let's see what is set");
        // console.log(clientPlayerMap.get(playerName));

        ///////////////////////////////////////////////////////////////////////////////////////////////////////

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
        // console.log("Squareee");   
        // console.log(SquareConfigData.get(3 + ""));
        // console.log("End");
        // console.log("Size after new input:", playerNameMap.size);

    }

    }
    
}

