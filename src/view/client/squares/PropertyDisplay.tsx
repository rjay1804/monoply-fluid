import React from "react";
import { NyThemeData } from "../NyTheme";
import { ColorBar } from "./ColorBar";

interface Props {
    id: number;
}

export const PropertyDisplay: React.FC<Props> = ({ id }) => {

    const txt: string | undefined = NyThemeData.get(id)?.name;
    const price: number | undefined = NyThemeData.get(id)?.price;

    return (
        <React.Fragment>
            <ColorBar id={id} />
            <div className="square-name">{txt} <br></br><b> {price}</b></div>
        </React.Fragment>
    );

};