import { GameSquare } from "./GameSquare";
import { get_props } from "../../react/monopolyView";
import {Dice} from "../../model/Dice";

import React from "react";
import styled from "styled-components";
//mport { Avatar } from "@material-ui/core";
//import { Avatar } from 'react-native-paper'; 
//const MyComponent = () => ( <Avatar src={require('../../images/Die_4.png')} /> );

var die = new Dice(6);
var set_die_image = 0;
var props_g;
var diceChar;
var size_g;
// var set_die_image_path = "../../images/Die_1.png";;

// const image_1 = require('../../images/Die_1.png');
// const image_2 = require('../../images/Die_2.png');
// const image_3 = require('../../images/Die_3.png');
// const image_4 = require('../../images/Die_4.png');
// const image_5 = require('../../images/Die_5.png');
// const image_6 = require('../../images/Die_6.png');

//var img_load;

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
  console.log("Die roll:");
  console.log(set_die_image);
  alert(set_die_image);
  console.log("Intial: ", props_g.whoseTurn.get("whoseturn"));
  var current_turn = props_g.whoseTurn.get("whoseturn");
  var next = (current_turn + 1) % (size_g + 1)
  if(next == 0)
  {
    next+=1;
  }
  props_g.whoseTurn.set("whoseturn", next); 
  console.log("Number of players:", size_g);
  console.log("After move:", props_g.whoseTurn.get("whoseturn"));
  diceChar = String.fromCodePoint(0x267F+ set_die_image);
  //props, currentplayer
  //Get new square
  //Pass new square to change loc

  //set_image(set_die_image);
  //set_die_image_path = "../../images/Die_4.png";

}

// function set_image(idx)
// {
//   if (idx == 1)
//   {
//     return image_1;
//   }
//   if (idx == 2)
//   {
//     img_load =  image_2;
//   }
//   if (idx == 3)
//   {
//     img_load =  image_3;
//   }
//   if (idx == 4)
//   {
//     img_load = image_4;
//   }
//   if (idx == 5)
//   {
//     img_load =  image_5;
//   }
//   if (idx == 6)
//   {
//     img_load =  image_6;
//   }
//   console.log(img_load);
//   console.log(idx);
// }



export default function GameBoard() {
  const num_squares: Array<number> = Array.from(Array(40));
  
  var props = get_props();
  props_g = props;
  var size_ = props.playerNameMap.size;
  size_g = size_;
  console.log("Size inside game board: ");
  console.log(size_);
  //var key_list = get_keys();
  // console.log(props);
  //console.log("See the props playerNames before setting array");
  // console.log(props.playerNameMap);
  // console.log("All names");
  // var keys_ = props.playerNameMap.keys()
  // console.log(keys_);
  // console.log(playerNames);
  var playerNames = new Array<String>();
  var idx = 0;
  for(idx = 0; idx <size_; idx++){
    //console.log("hey");
    console.log(props.playerNameMap.get(idx + ""));
    //console.log(idx + "");
    playerNames.push(props.playerNameMap.get(idx + ""));
  }

  console.log("these are the player names");
  console.log(playerNames);
  //console.log(props.clientPlayerMap.get(playerNames[0]));
  // for(idx = 1; idx <size_; idx++){
  //   //console.log("hey");
  //   console.log(props.clientPlayerMap.get(playerNames[idx]).changeScore(idx));
  // }

  //var die = 1;
  //var path_ = "C:\\Users\\hrangarajan\\Desktop\\Work\\Hackathon\\monopoly-fluid\\src\\images\\Die_1.png";

  //console.log(key_list);
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
           <table >
          <tbody>
            <tr>
              <th> Player Name </th>
              <th> Cash Available </th>
              </tr >
              
              
              
              <tr >
            <td>
             {playerNames.map(name__ => (  
                <tr>{name__}</tr>
                ))}  
              
              {/* <td>Ashish</td>
              <td>Vineet</td> */}
            </td>
            <td>
            {playerNames.map(name__ => (  
                <tr>{props.clientPlayerMap.get(name__).money}</tr>
                ))}
            </td>
            </tr>
            </tbody>
          </table >
            <div>
              <Button onClick={clickMe}>Roll</Button>
              <span style={{fontSize: 50 }}>{diceChar}</span>
            </div>
              
            
            

            <a href="https://fluidframework.com/docs/">Powered by Fluid</a>
           
            {/* <img src="https://imgsv.imaging.nikon.com/lineup/dslr/df/img/sample/img_02_l.jpg"> </img> */}
           </div>
        </div> 
      </div>
      
    </React.Fragment>
    
  );
}


// this.map.forEach((value: string, key: string) => {
//   console.log(key, value);
// });


// {playerNames.map(name => (  
//   <li>  
//     {name}  
//   </li>  
// ))}  


