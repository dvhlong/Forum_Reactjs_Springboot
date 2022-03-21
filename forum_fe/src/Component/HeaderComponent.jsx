import React, { useCallback } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import searchIcon from '../SVG/search.svg';
import accIcon from '../SVG/acc.svg';
import Dropdown from 'react-bootstrap/Dropdown';
function HeaderComponent(){
    let navigate=useNavigate;
    const logout=()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("accid");
        localStorage.removeItem("username");
        // navigate("/");
    };
    return(
            <div>
                <header style={{width:"1920px"}}>
                    <nav className='navbar navbar-dark bg-primary nojt'>
                    <div style={{width:"auto"}}>
                    <button className="navbar-brand btn btn-secondary" style={{marginLeft:"50px"}}>Home</button>
                    <button className="navbar-brand btn btn-secondary">Posts</button>
                    <button className="navbar-brand btn btn-secondary">Approve</button>
                    <button className="navbar-brand btn btn-danger" style={{marginLeft:"50px"}}>Create your post</button>
                    </div>
                    <div class="row" style={{marginLeft:"20px"}}>
                        <div class="col-auto">
                            <input type="text" className="form-control" id="inputPassword2" placeholder="Search"/>
                        </div>
                        <div class="col-auto">
                            <button className="btn btn-dark" ><img src={searchIcon} alt="logo"/></button>
                        </div>
                    </div>
                    <div style={{marginRight:"30px"}}>
                    <Dropdown>
                        <Dropdown.Toggle variant="warning">
                        <label><img src={accIcon} alt="logo"/> {localStorage.getItem("username")}</label>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                        <Dropdown.Item href="#">
                            <button onClick={logout} style={{border:"none",background:"none"}}><Link style={{"text-decoration":"none"}} to="/pinfo">Personal Infomation</Link></button>
                        </Dropdown.Item>
                        <Dropdown.Item href="#">
                            <button onClick={logout} style={{border:"none",background:"none"}}><Link style={{"text-decoration":"none"}} to="/changePass">Change Password</Link></button>
                        </Dropdown.Item>
                        <Dropdown.Item href="#">
                            <button onClick={logout} style={{border:"none",background:"none"}}><Link style={{"text-decoration":"none"}} to="/">Logout</Link></button>
                        </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    </div>
                    </nav>
                </header>
            </div>
    );
} 

export default HeaderComponent;