import React from "react";
import "./Style.css";

function Square({chooseSquare, val,color}) {
    if(color)
    {
        return(
            <div className="square-red" id="boxx" onClick={chooseSquare}>
                {val}
            </div>
        );
    }
    else
    {
        return(
            <div className="square-blue" id="boxx" onClick={chooseSquare}>
                {val}
            </div>
        );
    }
    
}

export default Square;