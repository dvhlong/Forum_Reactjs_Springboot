// import '../CSS/Register.css';
import { useNavigate } from "react-router-dom";
import Keylogo from '../SVG/key.svg';
import Userlogo from '../SVG/user.svg';
import Emaillogo from '../SVG/email.svg';
import React,{useCallback, useEffect, useState} from 'react';

function Register() {
    let navigate=useNavigate();
    const back=useCallback(()=>navigate('/'),[navigate]);
    return(
        <div className="Container"> 
            <div class="system-name">FORUM</div>
            <div class="flex col-auto row" id="form">
            <div class="col flex column center">   
            <div class="col-spacer">
            <div class="form-header"><i class="fas fa-lock icon txtglow"></i><span>SIGN-UP</span></div>
                </div>
                <div class="input-wrap">
                <div class="input-icon">
                    <div class="icon"><img src={Userlogo} alt="logo" /></div>
                    <input type="text" placeholder="Username"/>
                </div>
                </div>
                <div class="input-wrap"> 
                <div class="input-icon">
                    <div class="icon"><img src={Keylogo} alt="logo" /></div>
                    <input type="password" placeholder="Password"/>
                </div>
                </div>
                <div class="input-wrap"> 
                <div class="input-icon">
                    <div class="icon"><img src={Emaillogo} alt="logo" /></div>
                    <input type="text" placeholder="Email"/>
                </div>
                </div>
                <div class="input-wrap"> 
                <div class="input-icon">
                    <div class="icon"><img src={Keylogo} alt="logo" /></div>
                    <input type="password" placeholder="Re-type Password"/>
                </div>
                </div>
                <div class="mt-5">
                <button class="pri big btnn">REGISTER</button>
                <button class="pri big btnn" onClick={back}>BACK</button>
                </div>
            </div>
            </div>
        </div>
    );
}
export default Register;