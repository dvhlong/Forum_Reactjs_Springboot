import React,{useState,useEffect} from 'react';
import Card from 'react-bootstrap/Card';
// import Modal from 'react-bootstrap/Modal';
// import TopicService from '../Service/TopicService';
import Button from 'react-bootstrap/Button';
// import Dropdown from 'react-bootstrap/Dropdown';
// import moreIcon from '../SVG/more.svg';
import PostService from '../Service/PostService';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
// import Toast from 'react-bootstrap/Toast'
// import ToastContainer from 'react-bootstrap/ToastContainer'
// import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import {TailSpin} from 'react-loader-spinner';
import Moment from 'react-moment';
import axios from "axios";
function Posts(){
    let navigate=useNavigate();
    // const role=localStorage.getItem("role");
    // const accid=localStorage.getItem("accid");
    const[mount,setMount]=useState(false);
    const[loading,setLoading]=useState(false);
    const [update,setUpdate] = useState(false);
    // const reload=()=>{setUpdate(!update);}
    // const[topicList,setTopicList]=useState([]);
    const[result,setResult]=useState([]);
    const[page,setPage]=useState(1);
    const[pages,setPages]=useState(0);
    // const [show, setShow] = useState(false);
    // const [toastBg,setToastBg]=useState("");
    // const [toastHeader,setToastHeader]=useState("");
    // const [toastBody,setToastBody]=useState("");
    // const[editPostid,setEditPostId]=useState(0)
    // const [topicId,setTopicId]=useState("0");
    // const [topicName,setTopicName]=useState("");
    // const[editPostTitle,setEditPostTitle]=useState("")
    // const[editPostContent,setEditPostContent]=useState("")
    // const[deletePostid,setDeletePostId]=useState(0);
    // const [showEdit, setShowEdit] = useState(false);
    // const handleCloseEdit = () => setShowEdit(false);
    // const handleShowEdit=(post)=>{
    //     setTopicId(post.topic.id)
    //     setTopicName(post.topic.topicname)
    //     setEditPostId(post.id);
    //     setEditPostTitle(post.title);
    //     setEditPostContent(post.content);
    //     setShowEdit(true)
    // }
    // const setToast=(tbg,theader,tbody)=>{
    //     setToastBg(tbg);
    //     setToastHeader(theader);
    //     setToastBody(tbody);
    //     setShow(true);
    // }
    // const [showDelete, setShowDelete] = useState(false);
    // const handleCloseDelete = () => setShowDelete(false);
    // const handleShowDelete=(id)=>{
    //     setDeletePostId(id);
    //     setShowDelete(true);
    // }
    // const enterEditPostContent=(e)=>{
    //     setEditPostContent(e.target.value)
    // }
    // const enterEditPostTitle=(e)=>{
    //     setEditPostTitle(e.target.value)
    // }
    // const chooseTopic=(e)=>{
    //     setTopicId(e.target.value);
    // }
    // const changePost=()=>{
    //     let updatedPost={
    //         id:editPostid,
    //         title:editPostTitle,
    //         content:editPostContent
    //     }
    //     if(topicId==="0"){
    //         setToast("danger","ERROR","Please choose topic to change !!!!")
    //     } else if(editPostTitle===""){
    //         setToast("danger","ERROR","Please enter title !!!!")
    //     } else if(editPostContent===""){
    //         setToast("danger","ERROR","Please enter content !!!!");
    //     } else {
    //         PostService.editPost(Number(topicId),updatedPost).then(res=>{
    //             if(res.data.status===401){
    //                 alert("session expired");
    //                 navigate("/")
    //             }
    //             reload();
    //         })
    //         handleCloseEdit();
    //         setToast("success","SUCCESSFUL","Post Edited !!!")
            
    //     }
    // }
    // const deletePost=()=>{
    //     console.log(deletePostid);
    //     handleCloseDelete();
    //     PostService.deletePost(deletePostid).then(res=>{
    //         if(res.data.status===401){
    //             alert("session expired");
    //             navigate("/")
    //         }
    //         reload();
    //     });
    //     setToast("success","SUCCESSFUL","Post Deleted !!!!")
    // }
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
            await PostService.getPostsPage(page,ourRequest).then(res=>{
                if(res.data.status===401){
                    alert("session expired");
                    navigate("/")
                }
                if(res.data.content!==null){
                    setResult(res.data.content);
                    setPages(res.data.totalPages)
                }
            })
            setLoading(false);
            if (mount===false)
                setMount(true);
            return()=>{
                ourRequest.cancel('Request is canceled by user');
            }
        },800);
    },[page, update]);
    // useEffect(()=>{
    //     setLoading(true);
    //     setTimeout(async()=>{
    //         await TopicService.getTopicList().then(res=>{
    //             if(res.data.status===401){
    //                 navigate("/")
    //             }
    //             setTopicList(res.data);
    //         })
    //         setLoading(false);
    //         if (mount===false)
    //             setMount(true);
    //     },800);
    // },[]);
    return(
        <div>
                <div>
                    {/* <Header/> */}
                    <h1 style={{textAlign:"center",color:"white"}}>POST LIST</h1>
                    <table style={{width:"100%",border:"none"}}>
                        <td style={{width:"30%",color:"yellow",verticalAlign:"top"}}>
                        <table style={{width:"100%",textAlign:"center"}}>
                            <tr>
                                {
                                    (loading===true)
                                    ?<td style={{textAlign:"right"}}>
                                        <TailSpin wrapperStyle={{display:"block",position:"fixed",bottom:"5px"}} color="red" height={200} width={200} />
                                    </td>:<></>
                                }    
                            </tr>
                            <tr>
                                <td><td><img style={{width:"80%",borderRadius:"2%"}} src='https://i.ytimg.com/vi/x0fSBAgBrOQ/maxresdefault.jpg' alt=''></img></td></td>
                            </tr>
                            <tr>
                                <td><img style={{width:"80%",marginTop:"10px",borderRadius:"2%"}} src='https://www.zekelabs.com/static/media/photos/2019/06/30/Springboot-training-in-bangalore-800-500-img.jpg' alt=''></img></td>
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
                                            post=>
                                            <tr key={post.id}>
                                                <td>
                                                <Card style={{marginBottom:"20px"}}>
                                                    <Card.Header style={{color:"blue"}}>
                                                    <img style={{width:"50px",height:"50px",borderRadius:"50%"}} src='https://www.w3schools.com/howto/img_avatar.png' alt=''></img>
                                                    <b>&nbsp;{post.created_acc.username}</b> ({post.created_acc.role.rolename})
                                                    {
                                                        <>&nbsp;|&nbsp;
                                                            <Moment fromNow>{post.created_at}</Moment>
                                                            &nbsp;
                                                            (<Moment format='DD/MM/YYYY HH:mm'>{post.created_at}</Moment>)
                                                        </>
                                                    }
                                                    <p>Topic: {post.topic.topicname}</p>    
                                                    </Card.Header>
                                                    <Card.Body>
                                                        <Card.Title style={{color:"red"}}>{post.title}</Card.Title>
                                                        {/* <Card.Text style={{color:"black"}}>
                                                        <p style={{whiteSpace: "pre-wrap"}}>{post.content}</p>
                                                        </Card.Text> */}
                                                        <Button variant='secondary' onClick={()=>navigate(`/postDetail/${post.id}`)}>Detail {'>>>'}</Button>
                                                    </Card.Body>
                                                </Card>
                                                </td>
                                                <td style={{verticalAlign:"top"}}>
                                                {/* {
                                                    (role!=="user"||accid===String(post.created_acc.id))
                                                    ?
                                                    <Dropdown>
                                                        <Dropdown.Toggle variant="dark">
                                                        <img src={moreIcon} alt="logo"/>
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu variant='dark'>
                                                        {
                                                            (accid===String(post.created_acc.id))
                                                            ?
                                                            <Dropdown.Item href="#" onClick={()=>handleShowEdit(post)}>
                                                                Edit Post
                                                            </Dropdown.Item>
                                                            :
                                                            <></>
                                                        }
                                                        {
                                                            (role!=="user"||accid===String(post.created_acc.id))
                                                            ?
                                                            <Dropdown.Item href="#" onClick={()=>handleShowDelete(post.id)}>
                                                                Delete Post
                                                            </Dropdown.Item>
                                                            :
                                                            <></>
                                                        }
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                    :<></>
                                                } */}
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
                            {/* <Button onClick={() => setShow(true)}>Show Toast</Button> */}
                            {/* <div 
                                aria-live="assertive"
                                aria-atomic="false"
                                
                                >
                                <ToastContainer position="middle-start" className="p-1">
                                    <Toast onClose={() => setShow(false)} show={show} delay={1500} autohide bg={toastBg}>
                                    <Toast.Header>
                                        <strong className="me-auto">{toastHeader}</strong>
                                        <small className="text-muted">just now</small>
                                    </Toast.Header>
                                    <Toast.Body style={{color:"white"}}>{toastBody}</Toast.Body>
                                    </Toast>
                                </ToastContainer>
                            </div> */}
                            {/* <Modal
                                show={showEdit}
                                onHide={handleCloseEdit}
                                backdrop="static"
                                keyboard={false}
                            >
                                <Modal.Header closeButton>
                                <Modal.Title>Edit Post</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                <p>Topic :</p>
                                    <Form.Select aria-label="Default select example" value={topicId} onChange={chooseTopic}>
                                        <option value={topicId}> {topicName}</option> 
                                        <option value="0"> Select Topic</option>
                                        {
                                            topicList.map(
                                                topic=>
                                                <option key={topic.id} value={topic.id}>{topic.topicname}</option>
                                            )
                                        }
                                    </Form.Select> 
                                    <p>Title :</p>
                                    <input style={{width:"100%"}} value={editPostTitle} onChange={enterEditPostTitle}/>
                                    <p>Content :</p>
                                <textarea name="" id="" cols="60" rows="10" value={editPostContent} onChange={enterEditPostContent}></textarea>
                                </Modal.Body>
                                <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseEdit}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={changePost} >Change</Button>
                                </Modal.Footer>
                            </Modal> */}
                            {/* <Modal
                                show={showDelete}
                                onHide={handleCloseDelete}
                                backdrop="static"
                                keyboard={false}
                            >
                                <Modal.Header closeButton>
                                <Modal.Title>Delete Post</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                You really want to delete this Post ???
                                </Modal.Body>
                                <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseDelete}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={deletePost}>Delete</Button>
                                </Modal.Footer>
                            </Modal> */}
                        </td>
                    </table>
                </div>
        </div>
    )
}
export default Posts;