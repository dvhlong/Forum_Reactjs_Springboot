import React from 'react';
import Header from '../Component/HeaderComponent';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import TopicService from '../Service/TopicService';
import { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import moreIcon from '../SVG/more.svg';

function Topic() {
    const[result,setResult]=useState([]);
    const[page,setPage]=useState(1);
    const[pages,setPages]=useState(0);
    const[error,setError]=useState("");

    const[newTopicName,setNewTopicName]=useState("");
    // const[editTopicid,setEditTopicId]=useState(0)
    // const[editTopicName,setEditTopicName]=useState("")
    const[deleteTopicid,setDeleteTopicId]=useState(0);

    const[canAddTopic,setCanAddTopic]=useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);
    const [showAdd, setShowAdd] = useState(false);
    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);
    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = (id) => {
        setDeleteTopicId(id);
        setShowDelete(true);
    }
    const enterNewTopicName=(e)=>{
        setNewTopicName(e.target.value)
    }

    const addTopic=()=>{
        if(newTopicName==="")
            setError("Please enter topic name !!!")
        else {
            let newtopic={
                topicname:newTopicName
            }
            TopicService.addTopic(newtopic).then(res=>{
                console.log(res.data.message)
            });
            setShowAdd(false);
        }   
    }
    const deleteTopic=()=>{

    }
    const changePage=(e)=>{
        if(e.target.valueAsNumber>=1)
        setPage(e.target.valueAsNumber);
    }
    const nextPage=()=>{
        setPage(page+1);
    }
    const prevPage=()=>{
        if(page>1)
        setPage(page-1);
    }

    useEffect(()=>{
        TopicService.getAllTopic(page).then(res=>{
            if(res.data.content!==null){
                setResult(res.data.content);
                setPages(res.data.totalPages)
            } else {
                setResult("No topic is created")
            }
        });
        if(localStorage.getItem("role")!=="user")
            setCanAddTopic(true);
    },[page]);
    return(
        <div>
            <Header/>
            <h1 style={{textAlign:"center",color:"white"}}>TOPIC</h1>
            <table style={{width:"1920px",border:"none"}}>
                <td style={{width:"30%",color:"yellow"}}>
                    
                </td>
                <td style={{width:"60%",color:"yellow"}}>
                    <table style={{width:"100%"}}>
                        <tbody>
                            {
                                result.map(
                                    topic=>
                                    <tr key={topic.id}>
                                        <td>
                                        <Card style={{marginBottom:"30px"}}>
                                            <Card.Header style={{color:"blue"}}>
                                                Time created: {new Date(topic.created_at).toLocaleDateString(undefined,
                                                    { year: "numeric", month: "long", day: "numeric", hour:"2-digit",minute:"2-digit",second:"2-digit" })}
                                            </Card.Header>
                                            <Card.Body>
                                                <Card.Title style={{color:"red"}}>{topic.topicname}</Card.Title>
                                                <Card.Text style={{color:"black"}}>
                                                <p>Account created: {topic.created_acc.username} ({topic.created_acc.role.rolename})</p>
                                                </Card.Text>
                                                <button variant="primary">View Posts</button>
                                            </Card.Body>
                                        </Card>
                                        </td>
                                        {/* <td style={{verticalAlign:"top"}}><button style={{border:"none",background:"none"} onClick={handleShow}>Edit Topic</button></td> */}
                                        <td style={{verticalAlign:"top"}}>
                                        {canAddTopic?
                                        <Dropdown>
                                            <Dropdown.Toggle variant="warning">
                                            <img src={moreIcon} alt="logo"/>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                            <Dropdown.Item href="#">
                                                <button style={{border:"none",background:"none",color:"blue"}} onClick={handleShowEdit}>Edit Topic</button>
                                            </Dropdown.Item>
                                            <Dropdown.Item href="#">
                                                <button style={{border:"none",background:"none",color:"red"}} onClick={handleShowDelete(topic.id)}>Delete Topic</button>
                                            </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>:<></>
                                        }
                                        </td>
                                    </tr>
                                )
                            }
                            <tr>
                                <button onClick={prevPage}>{"<<<"} Previous Page</button>
                                <button style={{marginLeft:"10px"}} onClick={nextPage}>Next Page {">>>"}</button>
                                <span style={{marginLeft:"30px"}}><label>Page:</label><input min={1} type="number" style={{width:"50px",marginLeft:"10px"}} value={page} onChange={changePage}/></span>        
                            </tr>
                        </tbody>
                    </table>
                </td>
                <td style={{width:"10%",color:"yellow",verticalAlign:"top"}}>
                    {canAddTopic?<button style={{background:"blue",color:"white"}} onClick={handleShowAdd} className='btn btn=primary'>Add Topic</button>:<></>}

                    <Modal
                        show={showEdit}
                        onHide={handleCloseEdit}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                        <Modal.Title>Change Topic</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <input style={{width:"100%"}}/>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseEdit}>
                            Close
                        </Button>
                        <Button variant="primary">Change</Button>
                        </Modal.Footer>
                    </Modal>
                    <Modal
                        show={showAdd}
                        onHide={handleCloseAdd}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                        <Modal.Title>Add Topic</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <p>Enter new topic name :</p>    
                        <input style={{width:"100%"}} type="text" value={newTopicName} onChange={enterNewTopicName}/>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseAdd}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={addTopic}>Add</Button>
                        </Modal.Footer>
                    </Modal>
                    <Modal
                        show={showDelete}
                        onHide={handleCloseDelete}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                        <Modal.Title>Delete Topic</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        You really want to delete this topic ???
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseDelete}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={deleteTopic}>Delete</Button>
                        </Modal.Footer>
                    </Modal>
                </td>
            </table>
        </div>
        
    );
}
export default Topic;