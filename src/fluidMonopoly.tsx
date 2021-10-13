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

    private domElement: HTMLElement | undefined;
    private clientPresence: ISharedMap | undefined;

    /**
     * ComponentInitializingFirstTime is where you do setup for your component. This is only called once the first time
     * your component is created. Anything that happens in initializingFirstTime will happen before any other
     * user will see the component.
     */
     protected async initializingFirstTime() {
        // Create a new map for our Sudoku data
        const map = SharedMap.create(this.runtime);

        // Store the new map under the sudokuMapKey key in the root SharedDirectory
        this.root.set(this.monopolyMapKey, map.handle);

        // Create a SharedMap to store presence data
        const clientPresence = SharedMap.create(this.runtime);
        this.root.set(this.presenceMapKey, clientPresence.handle);
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
        // this.clientScoreMap = await this.root.get<IFluidHandle<ISharedMap>>(this.clientScoreKey).get();

        // Since we're using a Fluid distributed data structure to store our Sudoku data, we need to render whenever a
        // value in our map changes. Recall that distributed data structures can be changed by both local and remote
        // clients, so if we don't call render here, then our UI will not update when remote clients change data.
        // this.puzzle.on("valueChanged", (changed, local, op) => {
        //     this.render();
        // });
        
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
                        playerName = ""
                        startCoord = ""
                        endCoord = ""
                    />
                );
            ReactDOM.render(view, this.domElement);
        }
    }
}
