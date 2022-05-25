import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Keylogo from '../SVG/key.svg';
import Userlogo from '../SVG/user.svg';
import accSV from '../Service/AccountService';
import { GoogleLogin } from 'react-google-login';

function Login() {

    let navigate = useNavigate();

    const responseGoogle = (res) => {
        console.log("error code: " + res.error)
        console.log("error details: " + res.details);
    }

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    useEffect(() => {
        if (localStorage.getItem("token") !== null)
            accSV.checkToken().then(res => {

                if (res.data.status === "200") {
                    navigate("/topic")
                }
            })
    }, [])

    const login = (e) => {
        e.preventDefault();
        let acc = {
            username: username,
            password: password
        }
        // console.log(JSON.stringify(acc));
        if (username === "")
            setError("Please type username !!!")
        else if (password === "")
            setError("Please type password !!!")
        else {
            try {
                accSV.checklogin(acc).then(res => {
                    console.log(res);
                    if (res.data.status !== 401) {
                        localStorage.setItem("token", res.data.token);
                        localStorage.setItem("accid", res.data.acc.id);
                        localStorage.setItem("username", res.data.acc.username);
                        localStorage.setItem("role", res.data.acc.authorities[0].authority)
                        localStorage.setItem("avatar", "http://" + window.location.hostname + ":8080/files/" + res.data.acc.avatar)
                        navigate('/topic');
                    } else if (res.data.message === "User account is locked") {
                        setError("Username is blocked !!!!");
                    } else {
                        setError("Username or password is incorrect !!!!");
                    }
                });
            }
            catch {
                console.log("fail");
            }
        }
    };

    const enterUsername = (e) => {
        setUsername(e.target.value);
    }

    const enterPassword = (e) => {
        setPassword(e.target.value);
    }

    const register = () => navigate('/register');

    return (
        <div className="Container" style={{ margin: "auto", width: "60%" }}>
            <div className="system-name">FORUM</div>
            <div className="flex col-auto row" style={{ background: "#201D1D" }} id="form">
                <div className="col flex column center">
                    <div classNane="col-spacer">
                        <div className="form-header"><span className='system-name'>LOGIN</span></div>
                        <label style={{ color: "orange", textAlign: "center" }}>{error}</label>
                    </div>
                    <div className="input-wrap">
                        <div className="input-icon">
                            <div className="icon"><img src={Userlogo} alt="logo" /></div>
                            <input type="text" placeholder="Username" value={username} onChange={enterUsername} maxLength={250} />
                        </div>
                    </div>
                    <div className="input-wrap">
                        <div className="input-icon">
                            <div className="icon"><img src={Keylogo} alt="logo" /></div>
                            <input type="password" placeholder="Password" value={password} onChange={enterPassword} maxLength={250} />
                        </div>
                    </div>
                    {/* <GoogleLogin
                    clientId='792414514880-ebhfenibc2r1v9501o8e8vt4p0dggi2s.apps.googleusercontent.com'
                    buttonText='Login with Google'
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                ></GoogleLogin> */}
                    <div className="mt-5">
                        <button className="pri big btnn" onClick={login}>LOGIN</button>
                        <button className="pri big btnn" onClick={register}>REGISTER</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Login;