import React from "react";
import { GameSquare } from "./GameSquare";
//import { IMonopolyViewProps } from "../../react/monopolyView";
import { get_props, get_keys } from "../../react/monopolyView";
//import { PropertyDisplay } from "./squares/PropertyDisplay";
//import  {props.clientPlayerMap} from "../../react/monopolyView";

export default function GameBoard() {
  const num_squares: Array<number> = Array.from(Array(40));
  var props = get_props();
  var key_list = get_keys();
  console.log(props);
  console.log(key_list);
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
            <div data-include="../../../public/index.html"></div>
            <div className="iterate-object">
                {
                <ul>
              
                <li>
                {key_list.map((key_list) =>  <li>{key_list}
                {console.log(props.clientPlayerMap.get(key_list))}
                </li>)}
                </li>
                
                </ul>
                }
                </div>
            <a href="https://fluidframework.com/docs/">Powered by Fluid</a>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

// this.map.forEach((value: string, key: string) => {
//   console.log(key, value);
// });

// <ul>
// <li *ngFor="let recipient of map | keyvalue">
// {{recipient.key}} --> {{recipient.value}}
// </li>
// </ul>


