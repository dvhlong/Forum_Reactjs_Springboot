import React, { useCallback,useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import searchIcon from '../SVG/search.svg';
import accIcon from '../SVG/acc.svg';
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect } from 'react';
import TopicService from '../Service/TopicService';
import PostService from '../Service/PostService';
function HeaderComponent(){
    const [showAddPost, setShowAddPost] = useState(false);
    const[topicList,setTopicList]=useState([]);
    const [newTitle,setNewTitle]=useState("");
    const [newContent,setNewContent]=useState("");
    const [error,setError]=useState("");
    const handleCloseAddPost = () => setShowAddPost(false);
    const handleShowAddPost = () => {setError("");setShowAddPost(true);}
    const [topicId,setTopicId]=useState("0");
    let navigate=useNavigate;
    const enterContent=(e)=>{
        setNewContent(e.target.value)
    }
    const enterTitle=(e)=>{
        setNewTitle(e.target.value)
    }
    const chooseTopic=(e)=>{
        setTopicId(e.target.value);
    }
    
    const logout=()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("accid");
        localStorage.removeItem("username");
        // navigate("/");
    };
    useEffect(()=>{
        TopicService.getTopicList().then(res=>{
            setTopicList(res.data);
        })
    },[]);
    const createPost=()=>{
        let newPost={
            title:newTitle,
            content:newContent
        }
        if(topicId==="0"){
            setError("Please choose Topic !!!")
        } else if(newTitle==="")
            setError("Please enter title !!!")
        else if(newContent==="")
            setError("Please enter content !!!")
        else{
            console.log(JSON.stringify(newPost))
            PostService.createPost(Number(topicId),newPost).then(res=>{
                console.log(res.data);
            })
            handleCloseAddPost();
        }
        
    }
    return(
            <div>
                <header style={{width:"1920px"}}>
                    <nav className='navbar navbar-dark bg-primary nojt'>
                    <div style={{width:"auto"}}>
                    <button className="navbar-brand btn btn-secondary" style={{marginLeft:"50px"}}><Link style={{"text-decoration":"none",color:"white"}} to="/home">Home</Link></button>
                    <button className="navbar-brand btn btn-secondary"><Link style={{"text-decoration":"none",color:"white"}} to="/posts">Posts</Link></button>
                    {(localStorage.getItem("role")!=="user")?(<button className="navbar-brand btn btn-secondary"><Link style={{"text-decoration":"none",color:"white"}} to="/approve">Approve</Link></button>):<></>}
                    {(localStorage.getItem("role")==="admin")?(<button className="navbar-brand btn btn-secondary">Manage Account</button>):<></>}
                    <button className="navbar-brand btn btn-danger" onClick={handleShowAddPost} style={{marginLeft:"50px"}}>Create your post</button>
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
                <Modal
                        show={showAddPost}
                        onHide={handleCloseAddPost}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                        <Modal.Title>Create New Post</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p style={{color:"red"}}>{error}</p>
                            <p>Topic :</p>
                            <Form.Select aria-label="Default select example" onChange={chooseTopic} value={topicId}>
                                <option value="0"> Select Topic</option>
                                {
                                    topicList.map(
                                        topic=>
                                        <option key={topic.id} value={topic.id}>{topic.topicname}</option>
                                    )
                                }
                            </Form.Select> 
                            <p>Title :</p>
                            <input style={{width:"100%"}} value={newTitle} onChange={enterTitle}/>
                            <p>Content :</p>
                            <textarea name="" id="" cols="60" rows="10" value={newContent} onChange={enterContent}></textarea>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseAddPost}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={createPost}>Create</Button>
                        </Modal.Footer>
                </Modal>
            </div>
    );
} 

export default HeaderComponent;