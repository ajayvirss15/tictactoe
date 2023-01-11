import React,{useState} from "react";
import Board from "./Board";
import "./Style.css";

function Game({channel}) {
    const [playersJoined, setPlayerJoined] = useState(channel.state.watcher_count === 2);

    const [result,setResult] = useState({Winner: "none", state: "none"});

    channel.on("user.watching.start", (event) =>{
        setPlayerJoined(event.watcher_count === 2);
    })
    if(!playersJoined){
        return (
            <>
            <div className="wait">
                Waiting for other Player to join...
            </div>
            <div>
                <img className="load-img" src="https://www.citypng.com/public/uploads/small/11665171831j6u0azazq6querpkxm18jd4kriq1djgmuwjxw2bgxlhiiaukuwee2foasaecyyupifdnn7fk7fn1ziofjyguq09ms70guuharqnh.png" alt="..." height="300" width="300"/>
            </div>
            </>
        );
    }
    return(
        <div className="Game">
            <Board result={result} setResult={setResult}/>
        </div>
    );
}

export default Game;