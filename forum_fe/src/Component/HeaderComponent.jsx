import React from 'react';
import searchIcon from '../SVG/search.svg';
function HeaderComponent(){
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
                    <button className='btn btn-warning'>
                        Logout
                    </button>
                    </div>
                    </nav>
                </header>
            </div>
    );
} 

export default HeaderComponent;