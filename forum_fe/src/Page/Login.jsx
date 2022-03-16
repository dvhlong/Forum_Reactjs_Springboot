import React,{useCallback, useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import Keylogo from '../SVG/key.svg';
import Userlogo from '../SVG/user.svg';
function Login() {
    let navigate=useNavigate();
    const[account,setAccount]=useState([]);
    const login=useCallback(()=>{
        navigate('/home')
    },[navigate]);
    const register=useCallback(()=>navigate('/register'),[navigate]);
    return(
        <div className="Container">
            <div class="system-name">FORUM</div>
            <div class="flex col-auto row" id="form">
            <div class="col flex column center">
            <div class="col-spacer">
            <div class="form-header"><span>LOGIN</span></div>
                </div>
                <div class="input-wrap">
                <div class="input-icon">
                    <div class="icon"><img src={Userlogo} alt="logo"/></div>
                    <input type="text" placeholder="Username"/>
                </div>
                </div>
                <div class="input-wrap"> 
                <div class="input-icon">
                    <div class="icon"><img src={Keylogo} alt="logo"/></div>
                    <input type="password" placeholder="Password"/>
                </div>
                </div>
                <div class="mt-5">
                <button class="pri big btnn" onClick={login}>LOGIN</button>
                <button class="pri big btnn" onClick={register}>REGISTER</button>
                </div>
            </div>
            </div>
        </div>
    );
}
export default Login;