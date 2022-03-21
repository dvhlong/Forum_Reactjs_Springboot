// import '../CSS/Register.css';
import { useNavigate } from "react-router-dom";
import Keylogo from '../SVG/key.svg';
import Userlogo from '../SVG/user.svg';
import Emaillogo from '../SVG/email.svg';
import React,{useCallback, useEffect, useState} from 'react';
import accSV from '../Service/AccountService';
function Register() {
    let navigate=useNavigate();
    
    const[username,setUsername]=useState("");
    const[password,setPassword]=useState("");
    const[email,setEmail]=useState("");
    const[repass,setRepass]=useState("");
    const[error,setError]=useState("");
    const register=useCallback((e)=>{
        e.preventDefault();
        if (username==="")
            setError("Vui long nhap username !!!")
        else if(password==="")
            setError("Vui long nhap password !!!")
        else if(email==="")
            setError("Vui long nhap email !!!")
        else if(repass==="")
            setError("Vui long xac nhan lai password !!!")
        else if(password===repass){
            let acc={
                username:username,
                password:password,
                email:email,
            }
            accSV.createAccount(acc).then(res=>{
                if(res.data.status!=="Fail"){
                    alert("Dang ky thanh cong !!!");
                    navigate("/");
                } else {
                    setError(res.data.message);
                }
            });
        } else {
            setError("Xac nhan password ko phu hop !!!")
        }
    },[username, password, email, repass]);
    const back=useCallback(()=>navigate('/'),[navigate]);
    const enterUsername=(e)=>{
        setUsername(e.target.value);
    }
    const enterPassword=(e)=>{
        setPassword(e.target.value)
    }
    const enterEmail=(e)=>{
        setEmail(e.target.value)
    }
    const enterRepass=(e)=>{
        setRepass(e.target.value)
    }
    return(
        <div className="Container"> 
            <div class="system-name">FORUM</div>
            <div class="flex col-auto row" id="form">
            <div class="col flex column center">   
            <div class="col-spacer">
            <div class="form-header"><i class="fas fa-lock icon txtglow"></i><span>SIGN-UP</span></div>
            <label style={{color:"orange",textAlign:"center"}}>{error}</label>
                </div>
                <div class="input-wrap">
                <div class="input-icon">
                    <div class="icon"><img src={Userlogo} alt="logo" /></div>
                    <input type="text" placeholder="Username" value={username} onChange={enterUsername}/>
                </div>
                </div>
                <div class="input-wrap"> 
                <div class="input-icon">
                    <div class="icon"><img src={Keylogo} alt="logo" /></div>
                    <input type="password" placeholder="Password" value={password} onChange={enterPassword}/>
                </div>
                </div>
                <div class="input-wrap"> 
                <div class="input-icon">
                    <div class="icon"><img src={Emaillogo} alt="logo" /></div>
                    <input type="text" placeholder="Email" value={email} onChange={enterEmail}/>
                </div>
                </div>
                <div class="input-wrap"> 
                <div class="input-icon">
                    <div class="icon"><img src={Keylogo} alt="logo" /></div>
                    <input type="password" placeholder="Re-type Password" value={repass} onChange={enterRepass}/>
                </div>
                </div>
                <div class="mt-5">
                <button class="pri big btnn" onClick={register}>REGISTER</button>
                <button class="pri big btnn" onClick={back}>BACK</button>
                </div>
            </div>
            </div>
        </div>
    );
}
export default Register;