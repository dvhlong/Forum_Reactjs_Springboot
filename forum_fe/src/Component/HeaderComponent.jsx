import React, { useEffect, useState } from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import searchIcon from '../SVG/search.svg';
import Dropdown from 'react-bootstrap/Dropdown';
import HomeIcon from '../SVG/home.svg';
import Bell from '../SVG/bell.svg'
import '../CSS/HeaderComponent.css';
import Button from 'react-bootstrap/esm/Button';
import {over} from 'stompjs';
import SockJS from 'sockjs-client';
import ClockComponent from './ClockComponent';

var stompClient =null;
function HeaderComponent(){

    let navigate=useNavigate();

    const [key,setKey]=useState("");
    
    const changeKeyWord=(e)=>{
        setKey(e.target.value)
    }

    const logout=()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("accid");
        localStorage.removeItem("username");
        localStorage.removeItem("avatar");
        navigate("/");
    };
    
    // useEffect(()=>{
    //     let Sock = new SockJS('http://localhost:8080/ws');
    //     stompClient = over(Sock);
    //     stompClient.connect({
    //         "Authorization": `Bearer ${localStorage.getItem("token")}`,
    //         "Access-Control-Allow-Credentials":true,
    //     },onConnected, onError);
    // },[])

    // const checkWebSocket=()=>{
    //     // stompClient.send("/notify/private-notification", {}, localStorage.getItem("username"));
    // }

    // const onPrivateMessage = (payload)=>{
    //     console.log(payload);
    // }

    // const onConnected = () => {
    //     stompClient.subscribe('/user/'+localStorage.getItem("username")+'/private', onPrivateMessage);
    // }

    // const onError = (err) => {
    //     console.log(err);
    // }

    return(
            <div className='forum-container'>
                <header style={{width:"100%"}}>
                    <nav className='navbar navbar-dark bg-secondary nojt'>
                    <div style={{width:"auto"}}>
                    <button className="navbar-brand btn btn-secondary" style={{marginLeft:"50px"}} onClick={()=>navigate("/topic")}><img src={HomeIcon} alt=''></img></button>
                    <button className="navbar-brand btn btn-secondary" onClick={()=>navigate("/posts/all")}>Posts</button>
                    {(localStorage.getItem("role")!=="user")?(<button className="navbar-brand btn btn-secondary" onClick={()=>navigate("/approve")}>Approve Post</button>):<></>}
                    {(localStorage.getItem("role")==="admin")?(<button className="navbar-brand btn btn-secondary" onClick={()=>navigate("/manageacc")}>Manage Account</button>):<></>}
                    <button className="navbar-brand btn btn-danger" style={{marginLeft:"50px"}} onClick={()=>navigate("/createpost")}>Create new post</button>
                    {/* <button className="navbar-brand btn btn-danger" style={{marginLeft:"50px"}} onClick={checkWebSocket}>Check Web Socket</button> */}
                    </div>
                    <div class="row" style={{marginLeft:"20px"}}>
                        <div class="col-auto">
                            <input type="text" value={key} className="form-control" onChange={changeKeyWord} id="inputPassword2" placeholder="Search Post"/>
                        </div>
                        <div class="col-auto">
                            <button className="btn btn-dark" onClick={()=>navigate(`/posts/key=${key}`)} ><img src={searchIcon} alt="logo"/></button>
                        </div>
                    </div>
                    <ClockComponent/>
                    <div>
                        <Button onClick={()=>navigate("/notifications")} variant='secondary'><img src={Bell} alt=''></img></Button>
                    </div>
                    <div style={{marginRight:"30px"}}>
                    <Dropdown>
                        <Dropdown.Toggle variant="secondary">
                        <label>
                                <img style={{width:"30px",height:"30px",borderRadius:"50%"}} src={localStorage.getItem("avatar")} alt=''></img> {localStorage.getItem("username")}</label>
                        </Dropdown.Toggle>
                        <Dropdown.Menu variant='light' align="end">
                        <Dropdown.Item href="#" onClick={()=>navigate('/changeinfo')} style={{textAlign:"center"}}>
                            Personal                          
                        </Dropdown.Item>
                        <Dropdown.Item href="#" onClick={logout} style={{textAlign:"center"}}>
                            Logout
                        </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    </div>
                    </nav>
                </header>
                <Outlet/>
                <footer className='footer' style={{textAlign:"center",color:"grey",marginTop:"30px"}}>
                    <span className='text'>@FORUM Created by Doan Van Hoang Long</span>
                </footer>
            </div>
    );
} 

export default HeaderComponent;





















// eslint-disable-next-line no-lone-blocks
                    {/* <Dropdown>
                        <Dropdown.Toggle variant="secondary">
                            <img src={Bell} alt=''></img>
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{width:"400px"}} className='notification-menu' align="end">
                            <Dropdown.Header style={{fontSize:"20px"}}>
                                NOTIFICATION
                            </Dropdown.Header>
                            <Dropdown.Divider/>
                                <div className='notifications-drop'>
                                    <div className='notification-drop' onClick={()=>navigate("/postDetail/6")}>
                                        <div className='notification-drop-avatar'>
                                            <img style={{width:"50px",height:"50px",borderRadius:"50%"}} src='https://www.w3schools.com/howto/img_avatar.png' alt=''></img>
                                        </div>
                                        <div className='notification-drop-content'>
                                            <div className='notification-drop-text'>
                                                <label><b>@dvhl</b> commented to your post</label>
                                            </div>
                                            <div className='notification-drop-time'>
                                                2 days ago
                                            </div>
                                        </div>
                                        <div className='notification-drop-mark'>
                                        </div>
                                    </div>
                                </div>
                            <Dropdown.Divider/>
                            <Dropdown.Header style={{textAlign:"center"}}>
                                <Link to='/notifications' style={{margin:"center"}}>View All</Link>
                            </Dropdown.Header>              
                        </Dropdown.Menu>
                    </Dropdown> */}