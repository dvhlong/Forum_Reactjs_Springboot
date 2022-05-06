import React,{useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import Keylogo from '../SVG/key.svg';
import Userlogo from '../SVG/user.svg';
import accSV from '../Service/AccountService';
function Login() {
    let navigate=useNavigate();
    const[username,setUsername]=useState("");
    const[password,setPassword]=useState("");
    const[error,setError]=useState("");
    useEffect(()=>{
        if(localStorage.getItem("token")!==null)
            accSV.checkToken().then(res=>{
                
                if(res.data.status==="200"){
                    navigate("/topic")
                }
            })
    },[])
    const login=(e)=>{
        e.preventDefault();
        let acc={
            username:username,
            password:password
        }
        // console.log(JSON.stringify(acc));
        if(username==="")
            setError("Please type username !!!")
        else if(password==="")
            setError("Please type password !!!")
        else {
            try{
            accSV.checklogin(acc).then(res=>{

                if(res.data.status!==401){
                    localStorage.setItem("token",res.data.token);
                    localStorage.setItem("accid",res.data.acc.id);
                    localStorage.setItem("username",res.data.acc.username);
                    localStorage.setItem("role",res.data.acc.authorities[0].authority)
                    localStorage.setItem("avatar",res.data.acc.avatar)
                    navigate('/topic');
                } else if(res.data.message==="User account is locked"){
                    setError("Username is blocked !!!!");
                } else {
                    setError("Username or password is incorrect !!!!");
                }
            });
        }
        catch{
            console.log("fail");
        }
        }
    
    };
    const enterUsername=(e)=>{
        setUsername(e.target.value);
    }
    const enterPassword=(e)=>{
        setPassword(e.target.value);
    }
    const register=()=>navigate('/register');
    return(
        <div className="Container" style={{margin:"auto",width:"60%"}}>
            <div class="system-name">FORUM</div>
            <div class="flex col-auto row" style={{background:"#201D1D"}} id="form">
            <div class="col flex column center">
            <div class="col-spacer">
            <div class="form-header"><span>LOGIN</span></div>
                <label style={{color:"orange",textAlign:"center"}}>{error}</label>
                </div>
                <div class="input-wrap">
                <div class="input-icon">
                    <div class="icon"><img src={Userlogo} alt="logo"/></div>
                    <input type="text" placeholder="Username" value={username} onChange={enterUsername}/>
                </div>
                </div>
                <div class="input-wrap"> 
                <div class="input-icon">
                    <div class="icon"><img src={Keylogo} alt="logo"/></div>
                    <input type="password" placeholder="Password" value={password} onChange={enterPassword}/>
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