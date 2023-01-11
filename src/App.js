import './App.css';
import Login from './comp/login';
import { StreamChat } from "stream-chat";
import Cookies from "universal-cookie";
import React,{useState} from 'react';
import {Chat} from "stream-chat-react";
import JoinGame from "./comp/JoinGame";

function App() {
  const api_key="c6yd7x9c2fq6";
  const cookies = new Cookies();
  const token = cookies.get("token");
  const client = StreamChat.getInstance(api_key);
  const [isAuth, setIsAuth] = useState(false);
  const logOut = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("username");
    client.disconnectUser();
    setIsAuth(false);
  }
  if(token){
    client.connectUser({
        id: cookies.get("userId"),
        name: cookies.get("username"),

      },
     token
    ).then((user) => {
      setIsAuth(true);
    });
  }

  return (
    <div className="App">

      {isAuth ? (
        <Chat client={client}>
          <JoinGame/>
          <div className='bottom'>
            <button className="btn" onClick={logOut}>Log Out</button>
          </div>
          
        </Chat> 
      ) : (
        <>
          <div className='heading' id="the-top">
            <div className='left-top'>
              <h2 className='h2top'>
                TIC TAC TOE
              </h2>
            </div>
            <div className='right-top'>
              <div className='heading-list'>
              <a href='#the-top' className='header-link'>Standings</a>
              </div>
              <div className='heading-list'>
              <a href='#the-top' className='header-link'>Online-Users</a>
              </div>
            </div>
          </div>
          <div className="top">
            <Login setIsAuth={setIsAuth}/>
          </div>
          <div className="mid">
            <img className="image1" src='https://cdn-icons-png.flaticon.com/512/1021/1021264.png' alt="tic-tac-toe" height="150px" width="150"/>
          </div>
          <div className="bottom1">
          <p className="footer-text">© 2023 Ajayvir Sandhu.</p>
          </div>
        </>
      )}
     </div> 
  );
}

export default App;
