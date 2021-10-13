/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { ISharedMap } from "@fluidframework/map";
//import sudoku from "sudokus";
import { Coordinate } from "./coordinate";
import { SudokuCell } from "./sudokuCell";

import {wordfind} from '../../public/wordfind'
//import {cli_browser} from '../../public/cli-browser'
//import {monopoly} from '../../public/monopoly';
//import {wordfindgame} from '../../public/wordfindgame'

//declare var WordFindGame: any;

const { objFillDefaults } = require('../../public/helper');
const { EventEmitter } = require('events');

const Team = require('../../public/Team');
class Monopoly extends EventEmitter {

    constructor(options = {}) {
      super();
  
      //const self = this;
      console.log("Random check");
      const opts = objFillDefaults(options, {
        board: {},
        teams: 2,
        wallet: 5000
      });
  
  
      opts.board.pieces = opts.teams;
      this.board = new Monopoly.MonopolyBoard(opts.board);
  
      this.teams = new Array(opts.teams).fill(true).map((value, index) => {
        return new Team(this, index, opts.wallet);
      });
  
      this.currentAction = null;
  
  
    }
    payment(payingTeam, targetTeam, amount) {
      payingTeam.wallet -= amount;
      targetTeam.wallet += amount;
  
      return {};
    }
    action(actionRecord, team) {
      return this.board.actions.methods[actionRecord.type](team, actionRecord.fields);
    }
    // Firing all related eventsto next actions
    nextActions(actions) {
      for (let actionName in actions) {
        if (actions.hasOwnProperty(actionName)) {
          // If current action is valid
          if (actions[actionName]) {
            // Emit the action related event from its name with the action specific data
            this.emit("payment", actions[actionName]);
          }
        }
      }
    }
  }


/**
 * An array of numbers 0-10 for convenient looping when building Sudoku grids.
 */
export const PUZZLE_INDEXES = Array.from(Array(11).keys());

export const PUZZLES = [
    [
        [0, 0, 2, 0, 6, 8, 0, 9, 7, 1],
        [4, 0, 6, 3, 0, 9, 0, 0, 0, 1],
        [0, 0, 0, 2, 0, 0, 0, 3, 5, 1],
        [0, 0, 7, 0, 0, 0, 0, 5, 8, 1],
        [6, 0, 8, 0, 0, 0, 7, 0, 4, 1],
        [5, 2, 0, 0, 0, 0, 9, 0, 0, 1],
        [1, 9, 0, 0, 0, 3, 0, 0, 0, 1],
        [0, 0, 0, 7, 0, 4, 8, 0, 9, 1],
        [8, 7, 0, 1, 9, 0, 3, 0, 0, 1],
    ],
    [
        [0, 0, 2, 0, 6, 8, 0, 9, 7, 1],
        [4, 0, 6, 3, 0, 9, 0, 0, 0, 1],
        [0, 0, 0, 2, 0, 0, 0, 3, 5, 1],
        [0, 0, 7, 0, 0, 0, 0, 5, 8, 1],
        [6, 0, 8, 0, 0, 0, 7, 0, 4, 1],
        [5, 2, 0, 0, 0, 0, 9, 0, 0, 1],
        [1, 9, 0, 0, 0, 3, 0, 0, 0, 1],
        [0, 0, 0, 7, 0, 4, 8, 0, 9, 1],
        [8, 7, 0, 1, 9, 0, 3, 0, 0, 1],
    ],
];

var constColorMap = new Map([
    [1, "green"],
    [2, "red"],
    [3, "yellow"]
]);

export var playerName = "";

export function setPlayerName(input: string, clientColorMap: ISharedMap, counterMap: ISharedMap){

    playerName = input;
    if(clientColorMap.get(playerName) == undefined){

        var count = counterMap.get<number>("current");
        count += 1;
        var color = getColor(count);
        clientColorMap.set(playerName, color);      
        counterMap.set("current", count);        
    }
}

/**
 * Loads a puzzle into an ISharedMap.
 *
 * @param index - The index of the puzzle to load.
 * @param puzzleMap - The shared map that stores puzzle data.
 * @returns The solved puzzle as a 2-dimensional array.
 */

export function checkUserInput(input: string, puzzleMap: ISharedMap, solutionMap: ISharedMap): boolean{

    if(solutionMap.get(input) != undefined){

        return true;
    }
    return false;
}

export function getColor(input: number): string{

    return constColorMap.get(input);
}

export function loadPuzzle(index: number, puzzleMap: ISharedMap, solutionMap: ISharedMap, clientColorMap: ISharedMap, counterMap: ISharedMap): number[][] {
    //const puzzleInput = PUZZLES[index];
    //const solution = sudoku.solve(puzzleInput);

    playerName = window.prompt('Enter your user name')
    setPlayerName(playerName, clientColorMap, counterMap);

    var words = ['cow','rat','horse','dog','tiger', 'lion', 'goat'];

            // Start a basic word game without customization !
            const puzzleInput = wordfind.newPuzzle(words, {
                // Set dimensions of the puzzle
                height: 11,
                width:  11,
                // or enable all with => orientations: wordfind.validOrientations,
                orientations: ['horizontal', 'vertical'],
                // Set a random character the empty spaces
                fillBlanks: true,
                preferOverlap: false
            });

            console.log(puzzleInput);
            var solution = wordfind.solve(puzzleInput, words);
            console.log(solution);


    console.log(solution.found);
    


    Monopoly.MonopolyBoard = require('../monopoly-board');

    // if (typeof window !== 'undefined') {
    //   window.Monopoly = Monopoly;
    // }

    console.log("Check 180");
    
    
    //module.exports = Monopoly;
    console.log("Try to create Monopoly board");
    var newGame = new Monopoly;
    console.log(newGame);

    var i:number; 

    for (i = 0; i<solution.found.length;i++) {
        const key = Coordinate.asString(solution.found[i].y, solution.found[i].x);
        var value;

        if(solution.found[i].orientation == "vertical"){
            value = Coordinate.asString(solution.found[i].y+solution.found[i].overlap-1, solution.found[i].x);
        }
        else{
            value = Coordinate.asString(solution.found[i].y, solution.found[i].x+solution.found[i].overlap-1); 
        }
        console.log(key);
        console.log(value);
        solutionMap.set(key+":"+value, true);
        console.log(solutionMap);
    }

    for (const row of PUZZLE_INDEXES) {
        for (const col of PUZZLE_INDEXES) {
            const key = Coordinate.asString(row, col);
            const cell = new SudokuCell(puzzleInput[row][col], key, "open");
            puzzleMap.set(key, cell);
        }
    }
    return solution;
}


