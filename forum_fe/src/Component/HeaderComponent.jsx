import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import searchIcon from '../SVG/search.svg';
import Dropdown from 'react-bootstrap/Dropdown';
import HomeIcon from '../SVG/home.svg';
import Bell from '../SVG/bell.svg'
import '../CSS/HeaderComponent.css';
import Button from 'react-bootstrap/esm/Button';
function HeaderComponent(){   
    const logout=()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("accid");
        localStorage.removeItem("username");
    };
    return(
            <div className='forum-container'>
                <header style={{width:"100%"}}>
                    <nav className='navbar navbar-dark bg-secondary nojt'>
                    <div style={{width:"auto"}}>
                    <Link style={{"text-decoration":"none",color:"white"}} to="/topic"><button className="navbar-brand btn btn-secondary" style={{marginLeft:"50px"}}><img src={HomeIcon} alt=''></img></button></Link>
                    <Link style={{"text-decoration":"none",color:"white"}} to="/posts"><button className="navbar-brand btn btn-secondary">Posts</button></Link>
                    {(localStorage.getItem("role")!=="user")?(<Link style={{"text-decoration":"none",color:"white"}} to="/approve"><button className="navbar-brand btn btn-secondary">Approve</button></Link>):<></>}
                    {(localStorage.getItem("role")==="admin")?(<Link style={{"text-decoration":"none",color:"white"}} to="/manageacc"><button className="navbar-brand btn btn-secondary">Manage Acc</button></Link>):<></>}
                    <Link style={{"text-decoration":"none",color:"white"}} to="/createpost"><button className="navbar-brand btn btn-danger" style={{marginLeft:"50px"}}>Create your post</button></Link>
                    </div>
                    <div class="row" style={{marginLeft:"20px"}}>
                        <div class="col-auto">
                            <input type="text" className="form-control" id="inputPassword2" placeholder="Search Post"/>
                        </div>
                        <div class="col-auto">
                            <button className="btn btn-dark" ><img src={searchIcon} alt="logo"/></button>
                        </div>
                    </div>
                    <div>
                    <Dropdown align="end">
                        <Dropdown.Toggle variant="secondary">
                            <img src={Bell} alt=''></img>
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{width:"400px"}} className='notification-menu'>
                            <Dropdown.Header style={{fontSize:"20px"}}>
                                NOTIFICATION
                            </Dropdown.Header>
                            <Dropdown.Divider/>
                                <div className='notifications-drop'>
                                    <Link style={{textDecoration:"none",width:"100%",color:'black'}} to="/postDetail/6">
                                    <div className='notification-drop'>
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
                                    </Link>
                                    <Link style={{textDecoration:"none",width:"100%",color:'black'}} to="/postDetail/7">
                                    <div className='notification-drop'>
                                        <div className='notification-drop-avatar'>
                                            <img style={{width:"50px",height:"50px",borderRadius:"50%"}} src='https://www.w3schools.com/howto/img_avatar.png' alt=''></img>
                                        </div>
                                        <div className='notification-drop-content'>
                                            <div className='notification-drop-text'>
                                                <label><b>@admin</b> replied your comment</label>
                                            </div>
                                            <div className='notification-drop-time'>
                                                1 months ago
                                            </div>
                                        </div>
                                        <div className='notification-drop-mark'>
                                        </div>
                                    </div>
                                    </Link>
                                </div>
                            <Dropdown.Divider/>
                            <Dropdown.Header style={{textAlign:"center"}}>
                                <Link to='/notifications' style={{margin:"center"}}>View All</Link>
                            </Dropdown.Header>              
                        </Dropdown.Menu>
                    </Dropdown>
                    </div>
                    <div style={{marginRight:"30px"}}>
                    <Dropdown>
                        <Dropdown.Toggle variant="secondary">
                        <label><img style={{width:"30px",height:"30px",borderRadius:"50%"}} src='https://www.w3schools.com/howto/img_avatar.png' alt=''></img> {localStorage.getItem("username")}</label>
                        </Dropdown.Toggle>
                        <Dropdown.Menu variant='light'>
                        <Dropdown.Item href="#">
                            <Link style={{"text-decoration":"none"}} to="/changeInfo"><Button style={{width:"100%"}} variant='light'>Personal</Button></Link>                          
                        </Dropdown.Item>
                        <Dropdown.Item href="/" onClick={logout}>
                            <Link style={{"text-decoration":"none"}} to="/"><Button style={{width:"100%"}} variant='light'>Logout</Button></Link>
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