import { GameSquare } from "./GameSquare";
import { get_props } from "../../react/monopolyView";
import {Dice} from "../../model/Dice";
import  "./tab.css";

import React from "react";
import styled from "styled-components";
// import { Hidden, useIsFocusVisible } from "@material-ui/core";

// const Icon = (props) => {
//   const { src } = props;

//   return (
//       <img src={src} width="5%" height="5%" />
//   );
// };

{/* <Icon src={set_image(set_die_image)} /> */}

var die = new Dice(6);
var set_die_image = 2;
var props_g;
var size_g;
var diceChar;

function Get_Just_Played(){

    var just_played = props_g.whoseTurn.get("whoseturn") - 1;
    if (just_played == -1)
    {
      just_played = props_g.playerNameMap.size - 1;
    }
    return just_played;
}

function Buy_()
{
  var props_1 = props_g;
  var just_played = Get_Just_Played();
  var name = props_1.playerNameMap.get(just_played + "");

  console.log("Get name", name);
  console.log("Log Just Played", just_played);
  console.log(props_1.playerNameMap.keys())
  props_1.clientPlayerMap.get(name).Buy();
}

const theme = {
  blue: {
    default: "#3f51b5",
    hover: "#283593"
  },
  pink: {
    default: "#e91e63",
    hover: "#ad1457"
  }
};



const Button = styled.button`
  background-color: ${(props) => theme[props.theme].default};
  color: white;
  padding: 5px 15px;
  border-radius: 5px;
  outline: 0;
  text-transform: uppercase;
  margin: 10px 0px;
  cursor: pointer;
  box-shadow: 0px 2px 2px lightgray;
  transition: ease background-color 250ms;
  &:hover {
    background-color: ${(props) => theme[props.theme].hover};
  }
  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
`;

Button.defaultProps = {
  theme: "blue"
};

function clickMe() {
  alert("Rolling...");
  set_die_image = die.rollDice();
  diceChar = String.fromCodePoint(0x267F+ set_die_image);
  console.log("Die roll:");
  console.log(set_die_image);
  alert(set_die_image);
  console.log("Intial: ", props_g.whoseTurn.get("whoseturn"));
  var current_turn = props_g.whoseTurn.get("whoseturn");
  var next = (current_turn + 1) % (size_g)
  props_g.whoseTurn.set("whoseturn", next); 
  console.log("Number of players:", size_g);
  console.log("After move:", props_g.whoseTurn.get("whoseturn"));
  
  var chance  = props_g.whoseTurn.get("dice");
  props_g.whoseTurn.set("dice", !chance);
  props_g.whoseTurn.set("dice_char", diceChar)
  
}



function get_vis(props, name)
{
  var just_played = Get_Just_Played();
  if(just_played!= props.clientPlayerMap.get(name).id)
  {
    return "hidden";
  }
  return "visible";
}

export default function GameBoard() {
  const num_squares: Array<number> = Array.from(Array(40));
  
  var props = get_props();
  props_g = props;
  var size_ = props.whoseTurn.get("number of current players");
  size_g = size_;
  console.log("Size inside game board: ");
  console.log(size_);
  var playerNames = new Array<String>();
  var idx = 0;
  for(idx = 0; idx <size_; idx++){

    console.log(props.playerNameMap.get(idx + ""));
    playerNames.push(props.playerNameMap.get(idx + ""));
  }

  console.log("these are the player names");
  console.log(playerNames);
  return (
    <React.Fragment> 
      <div className="board">
        {num_squares.map((n, index) => {
          const id: number = index + 1;
          return ( <GameSquare
            id={id}
            key={id}
          />)
        })}
           

        <div className="center-square square">
        
           <div className="center-txt">  
           
           {/* <span style={{fontSize: 50 }}>{props.whoseTurn.get("dice_char")}</span>  */}
           <table >
           
          <tbody>
         
            <tr>
            <div className="divTable">
               <div className="divTableBody">
               <div className="divTableRow" style={{"color": "black", "backgroundColor": "cyan", width: 100, height: 10}}>
               <div className="divTableCell">&nbsp; Player</div> <div className="divTableCell">&nbsp; Cash  </div> 
               <div className="divTableCell">&nbsp; Take Action </div> <div className="divTableCell">&nbsp; Roll Dice </div>
               </div>
               </div>
               </div>
              </tr >
              
              
              
              <tr >
            <td>
             {playerNames.map(name__ => (  
               <div className="divTable">
               <div className="divTableBody">
               <div className="divTableRow" style={{"color": "black", "backgroundColor": props.clientPlayerMap.get(name__).colour}}>
               <div className="divTableCell">&nbsp; {name__}</div> 
               <div className="divTableCell">&nbsp; {props.clientPlayerMap.get(name__).money}</div>

              
               <div className="divTableCell">&nbsp; 
               <Button disabled = {props.whoseTurn.get("whoseturn") != props.clientPlayerMap.get(name__).id} onClick={Buy_}>Buy</Button> &nbsp;
              
               <Button  disabled = {props.whoseTurn.get("whoseturn") != props.clientPlayerMap.get(name__).id} onClick={clickMe}>Pay rent </Button>  &nbsp;
               <Button disabled = {props.whoseTurn.get("whoseturn") != props.clientPlayerMap.get(name__).id} onClick={clickMe}>Sell  </Button>
               </div>
               <div className="divTableCell">&nbsp; <Button disabled = {props.whoseTurn.get("whoseturn") != props.clientPlayerMap.get(name__).id} onClick={clickMe}>Roll</Button></div>
               <div className="divTableCell" style={{"fontSize": 50,    visibility: get_vis(props, name__)}}  >&nbsp;     {props.whoseTurn.get("dice_char")} </div>
               
               </div>   
               </div>
               </div>
                ))}  
            </td>

            </tr>

            <td>
            <tr>

            </tr>
            </td>

            </tbody>
          </table >
            <div>
             
               
            </div>

            <div className="center-square square">


              
              </div>
            
            

            <a href="https://fluidframework.com/docs/">Powered by Fluid</a>
           </div>
        </div> 
      </div>
      
    </React.Fragment>
    
  );
}


