import React, { useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import searchIcon from '../SVG/search.svg';
import Dropdown from 'react-bootstrap/Dropdown';
import HomeIcon from '../SVG/home.svg';
import Bell from '../SVG/bell.svg';
import Button from 'react-bootstrap/esm/Button';
import ClockComponent from './ClockComponent';

import '../App.css';

function HeaderComponent() {

    let navigate = useNavigate();

    const [reloadPageNavigated, setReloadPageNavigated] = useState(false);

    function changereload() {
        setReloadPageNavigated(!reloadPageNavigated);
        navigate("/posts/all")
    }

    const [key, setKey] = useState("");

    const changeKeyWord = (e) => {
        setKey(e.target.value)
    }

    const searchPostsByKeyword = () => {
        if (key !== "")
            navigate(`/posts/key=${key}`)
        else
            navigate(`/posts/all`)
    }

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("accid");
        localStorage.removeItem("username");
        localStorage.removeItem("avatar");
        navigate("/");
    };

    return (
        <div className='forum-container'>
            <header style={{ width: "100%", position: "sticky", top: "0", zIndex: "2" }}>
                <nav className='navbar navbar-dark bg-dark nojt'>
                    <div style={{ width: "auto" }}>
                        <button className="navbar-brand btn btn-dark" style={{ marginLeft: "50px" }} onClick={() => navigate("/topic")}><img src={HomeIcon} alt=''></img></button>
                        <button className="navbar-brand btn btn-dark" onClick={changereload}>Posts</button>
                        {(localStorage.getItem("role") !== "user") ? (<button className="navbar-brand btn btn-dark" onClick={() => navigate("/approve")}>Approve Post</button>) : <></>}
                        {(localStorage.getItem("role") === "admin") ? (<button className="navbar-brand btn btn-dark" onClick={() => navigate("/manageacc")}>Manage Account</button>) : <></>}
                        <button className="navbar-brand btn btn-danger" style={{ marginLeft: "50px" }} onClick={() => navigate("/createpost")}>Create new post</button>
                    </div>
                    <div class="row" style={{ marginLeft: "20px" }}>
                        <div class="col-auto">
                            <input type="text" value={key} className="form-control" onChange={changeKeyWord} id="inputPassword2" placeholder="Search Post" />
                        </div>
                        <div class="col-auto">
                            <button className="btn btn-secondary" onClick={searchPostsByKeyword} ><img src={searchIcon} alt="logo" /></button>
                        </div>
                    </div>
                    <ClockComponent />
                    <div>
                        <Button onClick={() => navigate("/notifications")} variant='dark'><img src={Bell} alt=''></img></Button>
                    </div>
                    <div style={{ marginRight: "30px" }}>
                        <Dropdown>
                            <Dropdown.Toggle variant="dark">
                                <label>
                                    <img style={{ width: "30px", height: "30px", borderRadius: "50%" }} src={localStorage.getItem("avatar")} alt=''></img> {localStorage.getItem("username")}
                                </label>
                            </Dropdown.Toggle>
                            <Dropdown.Menu variant='light' align="end">
                                <Dropdown.Item href="#" onClick={() => navigate('/changeinfo')} style={{ textAlign: "center" }}>
                                    Personal
                                </Dropdown.Item>
                                <Dropdown.Item href="#" onClick={logout} style={{ textAlign: "center" }}>
                                    Logout
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </nav>
            </header>
            <div className='forum-body'>
                <Outlet context={[reloadPageNavigated, setReloadPageNavigated]} />
            </div>
            <footer className='forum-footer'>
                <p className='text'>&copy;FORUM, Đoàn Văn Hoàng Long </p>
                <p className='text'>Email: long59915@gmail.com </p>
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