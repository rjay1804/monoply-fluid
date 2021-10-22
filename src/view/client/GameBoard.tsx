import React from "react";
import { GameSquare } from "./GameSquare";
//import { IMonopolyViewProps } from "../../react/monopolyView";
import { get_props } from "../../react/monopolyView";
//import { playerName } from "../../helpers/puzzles";
//import { PropertyDisplay } from "./squares/PropertyDisplay";
//import  {props.clientPlayerMap} from "../../react/monopolyView";

export default function GameBoard() {
 const num_squares: Array<number> = Array.from(Array(40));
  var props = get_props();
  var size_ = props.playerNameMap.size;
  console.log("Size: ");
  console.log(size_);
  //var key_list = get_keys();
  console.log(props);
  console.log(props.playerNameMap);
  console.log("All names");
  // var keys_ = props.playerNameMap.keys()
  // console.log(keys_);
  // console.log(playerNames);
  var playerNames = new Array<String>();
  console.log("Checking...");
  var idx = 0;
  for(idx = 0; idx <size_; idx++){
    //console.log("hey");
    console.log(props.playerNameMap.get((idx + 1) + ""));
    //console.log(idx + "");
    playerNames.push(props.playerNameMap.get((idx + 1) + ""));
  }
  console.log(playerNames);

  for(idx = 1; idx <size_; idx++){
    //console.log("hey");
    console.log(props.clientPlayerMap.get(playerNames[idx]).changeScore(idx));
  }

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
          <table border = "1">
          <tbody>
            <tr border = "1">
              <th> Player Name </th>
              <th> Cash Available </th>
              </tr >
              
              
              
              <tr border = "1">
            <td>
             {playerNames.map(name__ => (  
                <tr>{name__}</tr>
                ))}  
              
              {/* <td>Ashish</td>
              <td>Vineet</td> */}
            </td>
            <td>
            {playerNames.map(name__ => (  
                <tr>{props.clientPlayerMap.get(name__)}</tr>
                ))}
            </td>
            </tr>
            </tbody>
          </table >
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