import React,{useState} from 'react';
import Axios from "axios";
import Cookies from "universal-cookie";
import './Style.css';
function Login() {
  const cookies = new Cookies();
    const [user, setUser] = useState(null);
    
    const Login = ({setIsAuth}) => {
      Axios.post("http://localhost:3002/login", user).then((res) => {
        const {token, userId, username} = res.data;

        cookies.set("token", token);
        cookies.set("userId", userId);
        cookies.set("username", username);
        setIsAuth(true);
        
      });
      window.location.reload();
    }
   
      return (
        <div className="login">
          <label className="lab1">Login</label>
          <input className="in1" placeholder='Username' onChange={(event) => {setUser({ ...user, username: event.target.value});}} />
          <br/>
          <button className="btn" onClick={Login}>Start</button>
        </div>
      );
    
  }
  
  export default Login;