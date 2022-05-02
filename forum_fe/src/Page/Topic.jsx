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
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import {TailSpin} from 'react-loader-spinner';
import axios from "axios";
import Moment from 'react-moment';
import Swal from 'sweetalert2'
import SideComponent from '../Component/SideComponent';
function Topic() {
    let navigate=useNavigate()
    const[mount,setMount]=useState(false);
    const[loading,setLoading]=useState(false);
    const[result,setResult]=useState([]);
    const[page,setPage]=useState(1);
    const[pages,setPages]=useState(0);
    const [update,setUpdate] = useState(false);
    const reload=()=>{setUpdate(!update);}
    const[newTopicName,setNewTopicName]=useState("");
    const[editTopicid,setEditTopicId]=useState(0)
    const[editTopicName,setEditTopicName]=useState("")
    const[deleteTopicid,setDeleteTopicId]=useState(0);

    const[canAddTopic,setCanAddTopic]=useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = (topic) => {
        setEditTopicId(topic.id);
        setEditTopicName(topic.topicname);
        setShowEdit(true);
    }
    const [showAdd, setShowAdd] = useState(false);
    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () =>{
        setShowAdd(true);
    }
    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = (id) => {
        setDeleteTopicId(id);
        setShowDelete(true);
    }
    const enterNewTopicName=(e)=>{
        setNewTopicName(e.target.value)
    }
    const enterEditTopicName=(e)=>{
        setEditTopicName(e.target.value)
    }
    const addTopic=()=>{
        if(newTopicName==="")
        Swal.fire({
            position: 'middle',
            icon: 'error',
            title: 'Please enter topic name !!!!',
            showConfirmButton: false,
            timer: 1500
        })
        else {
            let newtopic={
                topicname:newTopicName
            }
            TopicService.addTopic(newtopic).then(res=>{
                if(res.data.status===401){
                    alert("session expired");
                    navigate("/")
                }
                console.log(res.data.message)
                reload();
            });
            Swal.fire({
                position: 'middle',
                icon: 'success',
                title: 'Added !!!',
                showConfirmButton: false,
                timer: 1500
            })
            handleCloseAdd();
        }   
    }
    const deleteTopic=()=>{
        TopicService.deleteTopic(deleteTopicid).then(res=>{
            if(res.data.status===401){
                alert("session expired");
                navigate("/")
            }
            console.log(res.data.message);
            reload();
        });
        Swal.fire({
            position: 'middle',
            icon: 'success',
            title: 'Deleted !!!',
            showConfirmButton: false,
            timer: 1500
        })
        handleCloseDelete();
    }
    const changeTopic=()=>{
        let updatedTopic={
            id:editTopicid,
            topicname:editTopicName
        }
        if(editTopicName==="")
            Swal.fire({
                position: 'middle',
                icon: 'error',
                title: 'Please enter topic name !!!!',
                showConfirmButton: false,
                timer: 1500
            })
        else { 
        TopicService.editTopic(updatedTopic).then(res=>{
            if(res.data.status===401){
                alert("session expired");
                navigate("/")
            }
            reload();
        });
        Swal.fire({
            position: 'middle',
            icon: 'success',
            title: 'Topic changed !!!',
            showConfirmButton: false,
            timer: 1500
        })
        handleCloseEdit();
        }
    }
    const changePage=(e)=>{
        if(e.target.valueAsNumber>=1)
        setPage(e.target.valueAsNumber);
    }
    const nextPage=()=>{
        if(page<pages)
        setPage(page+1);
    }
    const prevPage=()=>{
        if(page>1)
        setPage(page-1);
    }

    useEffect(()=>{
        setLoading(true);
        const ourRequest=axios.CancelToken.source();
        setTimeout(async()=>{
                await TopicService.getAllTopic(page,ourRequest).then(res=>{
                    if(res.data.status===401){
                        alert("session expired");
                        navigate("/")
                    }
                    if(res.data.content!==null){
                        setResult(res.data.content);
                        setPages(res.data.totalPages)
                    }
                });
                if(localStorage.getItem("role")!=="user")
                    setCanAddTopic(true);
                setLoading(false);
                if (mount===false)
                setMount(true);
        },800);
        return()=>{
            ourRequest.cancel('Request is canceled by user');
        }
    },[page, update]);
    return(
        <div>
                <div>
                    {/* <Header/> */}
                    <h1 style={{textAlign:"center",color:"white"}}>TOPIC</h1>
                    <table style={{width:"100%",border:"none"}}>
                        <td style={{width:"30%",color:"yellow",verticalAlign:"top"}}>
                        <table style={{width:"100%",textAlign:"center"}}>
                            <tr>
                                {
                                    (loading===true)
                                    ?<td>
                                        <TailSpin wrapperStyle={{display:"block",position:"fixed",bottom:"5px"}} color="red" height={200} width={200} />
                                    </td>:<></>
                                }    
                            </tr>
                            {/* <tr>
                                <td><td><img style={{width:"80%",borderRadius:"2%"}} src='https://i.ytimg.com/vi/x0fSBAgBrOQ/maxresdefault.jpg' alt=''></img></td></td>
                            </tr>
                            <tr>
                                <td><img style={{width:"80%",marginTop:"10px",borderRadius:"2%"}} src='https://www.zekelabs.com/static/media/photos/2019/06/30/Springboot-training-in-bangalore-800-500-img.jpg' alt=''></img></td>
                            </tr> */}
                            <tr>
                                <td><SideComponent/></td>
                            </tr>
                        </table>
                        </td>
                        <td style={{width:"60%",color:"yellow"}}>
                        {
                            (mount===false)
                            ?
                            <></>
                            :
                            <table style={{width:"100%"}}>
                                <tbody>                          
                                    {
                                        result.map(
                                            topic=>
                                            <tr key={topic.id}>
                                                <td>
                                                <Card style={{marginBottom:"20px"}}>
                                                    <Card.Header style={{color:"blue"}}>
                                                        Time created: <Moment format='DD/MM/YYYY HH:mm'>{topic.created_at}</Moment>
                                                    </Card.Header>
                                                    <Card.Body>
                                                        <Card.Title style={{color:"red"}}>{topic.topicname}</Card.Title>
                                                        <Card.Text style={{color:"black"}}>
                                                        </Card.Text>
                                                        <Button variant="primary">View Posts</Button>
                                                    </Card.Body>
                                                </Card>
                                                </td>
                                                <td style={{verticalAlign:"top"}}>
                                                {canAddTopic?
                                                <Dropdown>
                                                    <Dropdown.Toggle variant="dark">
                                                    <img src={moreIcon} alt="logo"/>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu variant='dark'>
                                                    <Dropdown.Item href="#" onClick={()=>handleShowEdit(topic)}>
                                                        Edit Topic
                                                    </Dropdown.Item>
                                                    <Dropdown.Item href="#" onClick={()=>handleShowDelete(topic.id)}>
                                                        Delete Topic
                                                    </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>:<></>
                                                }
                                                </td>
                                            </tr>
                                        )
                                    }
                                
                                    <tr>
                                    <ButtonGroup aria-label="Basic example">
                                        <Button variant="secondary"onClick={prevPage}>{"<<<"} Previous Page</Button>
                                        <Button variant="secondary"onClick={nextPage}>Next Page {">>>"}</Button>
                                    </ButtonGroup>
                                        <label style={{marginLeft:"30px"}}>Page:</label><input min={1} max={pages} type="number" style={{width:"50px",marginLeft:"10px"}} value={page} onChange={changePage}/>     
                                    </tr>
                                </tbody>
                            </table>
                        }
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
                                <input style={{width:"100%"}} value={editTopicName} onChange={enterEditTopicName}/>
                                </Modal.Body>
                                <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseEdit}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={changeTopic}>Change</Button>
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
                                <label>Enter new topic name :</label>    
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
        </div>
    );
}
export default Topic;