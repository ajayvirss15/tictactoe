import React, {useEffect, useState} from 'react';
import Square from './Square';
import "./Style.css";
import { useChannelStateContext, useChatContext } from 'stream-chat-react';
import { Patterns } from './Winning';

function Board({result, setResult}) {
    const [board,setBoard] = useState(["","","","","","","","",""]);
    const [player,setPlayer] = useState("X");
    const [turn,setTurn] = useState("X");
    const [over,setOver] = useState(true);
    const { channel } = useChannelStateContext(); 
    const { client } = useChatContext();
    useEffect(() => {
        checkWin();
        checkTie();
    }, // eslint-disable-next-line
     [board] );
    const chooseSquare = async (square) => {
        if(turn === player && board[square] === "" &&over){
            
            setTurn(player === "X" ? "O" : "X");
            
            await channel.sendEvent({
                type: "game-move", 
                data: { square, player },

            })
            setBoard(board.map((val ,idx) => {
                if(idx === square && val === ""){
                    return player;
                }
                return val;
            }));
        }
    };
    
    const checkWin = () => {
            Patterns.forEach((currPattern) => {
                const firstPlayer = board[currPattern[0]];
                if(firstPlayer === "") return;
                let foundWinningPattern = true ;
                currPattern.forEach((idx) =>{
                    if(board[idx] !== firstPlayer){
                        foundWinningPattern =false;
                    }
                });

                if(foundWinningPattern){
                    alert("Winner: "+ board[currPattern[0]]);
                    setResult({Winner: board[currPattern[0]], state: "won"});
                    setOver(false);
                }
            });
    };

    const checkTie = () => {
        let filled = true;
        board.forEach((square) => {
            if(square === ""){
                filled = false;
            }
        });

        if(filled){
            alert("Game Tied");
            setResult({Winner: "none", state: "draw"});
        }
    };
    channel.on((event) => {
        if(event.type === "game-move" && event.user.id !== client.userID) {
            const currentPlayer = event.data.player === "X" ? "O" : "X";
            setPlayer(currentPlayer);
            
            setTurn(currentPlayer);
            setBoard(board.map((val ,idx) => {
                if(idx === event.data.square && val === ""){
                    return event.data.player;
                }
                return val;
            }));
            
        }
    })

    
    return(
        <div className='board'>
            <div className='row'>
                <Square val={board[0]} chooseSquare={() =>{
                    chooseSquare(0);
                }} color={board[0]==="X"? true:false}/>
                <Square val={board[1]} chooseSquare={() =>{
                    chooseSquare(1);
                }} color={board[1]==="X"? true:false}/>
                <Square val={board[2]} chooseSquare={() =>{
                    chooseSquare(2);
                }} color={board[2]==="X"? true:false}/>
            </div>
            <div className='row'>
                <Square val={board[3]} chooseSquare={() =>{
                    chooseSquare(3);
                }} color={board[3]==="X"? true:false}/>
                <Square val={board[4]} chooseSquare={() =>{
                    chooseSquare(4);
                }} color={board[4]==="X"? true:false}/>
                <Square val={board[5]} chooseSquare={() =>{
                    chooseSquare(5);
                }} color={board[5]==="X"? true:false}/>
            </div>
            <div className='row'>
                <Square val={board[6]} chooseSquare={() =>{
                    chooseSquare(6);
                }} color={board[6]==="X"? true:false}/>
                <Square val={board[7]} chooseSquare={() =>{
                    chooseSquare(7);
                }} color={board[7]==="X"? true:false}/>
                <Square val={board[8]} chooseSquare={() =>{
                    chooseSquare(8);
                }} color={board[8]==="X"? true:false}/>
            </div>
        </div>
    );
}

export default Board;
