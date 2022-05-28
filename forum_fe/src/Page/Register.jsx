import { useNavigate } from "react-router-dom";
import Keylogo from '../SVG/key.svg';
import Userlogo from '../SVG/user.svg';
import Emaillogo from '../SVG/email.svg';
import React, { useState } from 'react';
import accSV from '../Service/AccountService';
import Swal from 'sweetalert2'

function Register() {

    let navigate = useNavigate();

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const [email, setEmail] = useState("");

    const [repass, setRepass] = useState("");

    const [error, setError] = useState("");

    const register = (e) => {
        e.preventDefault();
        if (username === "")
            setError("Please type username !!!")
        else if (password === "")
            setError("Please type password !!!")
        else if (email === "")
            setError("Please type email !!!")
        else if (repass === "")
            setError("Please re-type password !!!")
        else if (password === repass) {
            let acc = {
                username: username,
                password: password,
                email: email,
            }
            accSV.createAccount(acc).then(res => {
                if (res.data.status !== "Fail") {
                    Swal.fire({
                        icon: 'success',
                        title: 'Sign up successful !!!!',
                    })
                    navigate("/");
                } else {
                    setError(res.data.message);
                }
            });
        } else {
            setError("password does not match !!!")
        }
    };

    const back = () => navigate('/');

    const enterUsername = (e) => {
        setUsername(e.target.value);
    }

    const enterPassword = (e) => {
        setPassword(e.target.value)
    }

    const enterEmail = (e) => {
        setEmail(e.target.value)
    }

    const enterRepass = (e) => {
        setRepass(e.target.value)
    }

    return (
        <div className="Container" style={{ margin: "auto", width: "60%" }}>
            <div class="system-name">FORUM</div>
            <div class="flex col-auto row" style={{ background: "#201D1D" }} id="form">
                <div class="col flex column center">
                    <div class="col-spacer">
                        <div class="form-header"><i class="fas fa-lock icon txtglow"></i><span className='system-name'>SIGN-UP</span></div>
                        <label style={{ color: "orange", textAlign: "center" }}>{error}</label>
                    </div>
                    <div class="input-wrap">
                        <div class="input-icon">
                            <div class="icon"><img src={Userlogo} alt="logo" /></div>
                            <input type="text" placeholder="Username" value={username} onChange={enterUsername} maxLength={255} />
                        </div>
                    </div>
                    <div class="input-wrap">
                        <div class="input-icon">
                            <div class="icon"><img src={Keylogo} alt="logo" /></div>
                            <input type="password" placeholder="Password" value={password} onChange={enterPassword} maxLength={255} />
                        </div>
                    </div>
                    <div class="input-wrap">
                        <div class="input-icon">
                            <div class="icon"><img src={Emaillogo} alt="logo" /></div>
                            <input type="text" placeholder="Email" value={email} onChange={enterEmail} maxLength={255} />
                        </div>
                    </div>
                    <div class="input-wrap">
                        <div class="input-icon">
                            <div class="icon"><img src={Keylogo} alt="logo" /></div>
                            <input type="password" placeholder="Re-type Password" value={repass} onChange={enterRepass} maxLength={255} />
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