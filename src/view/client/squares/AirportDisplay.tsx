import React from "react";
import { NyThemeData } from "../NyTheme";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlane } from '@fortawesome/free-solid-svg-icons'

interface Props {
    id: number;
}

export const AirportDisplay: React.FC<Props> = ({ id }) => {

    const txt: string | undefined = NyThemeData.get(id)?.name;
    const rent: number | undefined = NyThemeData.get(id)?.rent;

    return (
        <React.Fragment>
            <div className="blank"></div>
            <div className="icon">
                <FontAwesomeIcon icon={faPlane} size="3x" />
            </div>
            <div className="square-name"> {txt} <br></br><b>Rent: {rent} </b></div>
        </React.Fragment>
    );

};