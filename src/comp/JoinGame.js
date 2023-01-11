import React, { useState } from "react";
import { useChatContext, Channel } from "stream-chat-react";
import Game from "./Game";
import './Style.css';

function JoinGame() {
    const [rivalUsername, setRivalUsername] = useState("");
    const [channel, setChannel] = useState(null);
    const {client} = useChatContext();
    const createChannel = async () => {
        const response = await client.queryUsers({name: { $eq: rivalUsername} });

        if(response.users.length === 0){
            alert("User Not Found");
            return;
        }

        const newChannel = await client.channel("messaging", {
            members: [client.userID, response.users[0].id],
        });

        await newChannel.watch();
        setChannel(newChannel);
    }
        
    
    return(
        
        <div className="JoinGame">
            
            
            {channel ? (
            <Channel channel={channel}>
                <Game channel={channel}/>
            </Channel>
            
            ) : (
                <>
                <div className="container1">
                    <h1 className="create">Create Game</h1>
                    <input id="mobile2" className="in1" placeholder="Username of Rival..." onChange={(event) => {setRivalUsername(event.target.value);}} />
                    <br/>
                    <button id="mobile3" className="btn" onClick={createChannel}>Join/Start Game</button>
                    
                </div>
                
                </>
            )}
        </div>
        
    );
}

export default JoinGame;
