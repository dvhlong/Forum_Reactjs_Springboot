import React,{useState,useEffect, useDebugValue} from 'react';
import Card from 'react-bootstrap/Card';
import PostService from '../Service/PostService';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import {useParams,useNavigate} from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import TopicService from '../Service/TopicService';
// import styles from '../CSS/style.css';
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'
import moreIcon from '../SVG/more.svg';
import {TailSpin} from 'react-loader-spinner';
import axios from "axios";
function PostDetail(){
    const currentDay=new Date();
    const role=localStorage.getItem("role");
    const accid=localStorage.getItem("accid");
    let navigate=useNavigate();
    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit=()=>{
        setTopicId(post.topic.id)
        setTopicName(post.topic.topicname)
        setEditPostTitle(post.title);
        setEditPostContent(post.content);
        setShowEdit(true)
    }
    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete=()=>{
        setShowDelete(true);
    }
    const[topicList,setTopicList]=useState([]);
    const [topicId,setTopicId]=useState("0");
    const [topicName,setTopicName]=useState("");
    const[editPostTitle,setEditPostTitle]=useState("")
    const[editPostContent,setEditPostContent]=useState("")
    const[mount,setMount]=useState(false);
    let {id}=useParams();
    const[loading,setLoading]=useState(false);
    const [update,setUpdate] = useState(false);
    const reload=()=>{setUpdate(!update);}
    const[isEdit,setIsEdit]=useState(false);
    const [show, setShow] = useState(false);
    const [toastBg,setToastBg]=useState("");
    const [toastHeader,setToastHeader]=useState("");
    const [toastBody,setToastBody]=useState("");
    const setToast=(tbg,theader,tbody)=>{
        setToastBg(tbg);
        setToastHeader(theader);
        setToastBody(tbody);
        setShow(true);
    }
    const[editCommentId,setEditCommentId]=useState(0);
    const[editCommentContent,setEditCommentContent]=useState("");
    const showEditComment=(comment)=>{
        setIsEdit(true);
        setEditCommentId(comment.id);
        setEditCommentContent(comment.content);
    }
    const cancelEditComment=()=>setIsEdit(false)
    const[post,setPost]=useState({
        created_acc:{
            username:"",
            role:{
                rolename:""
            }
        },
        topic:{
            topicname:""
        },
    });
    
    // var div,index, imgs, img,imgSrc;
    // div = document.createElement('div');
    // div.innerHTML = document.getElementsByClassName('arr-value')[0];
    // console.log(div.innerHTML);
    // imgs=div.getElementsByTagName('img');
    // for(index = 0; index < imgs.length; ++index){
    //     img=imgs[index];
    //     console.log(div.innerHTML.length);
    //     imgSrc=img.src
    //     div.innerHTML=`<img src=${imgSrc} alt=''/>`;
    // }
    var div = document.createElement('div');
    div.innerHTML = post.content;
    div.innerHTML.replace(/img="https:[a-z,.0-9/-_]+"/g,"changed !!!!!!!!")
    const[newComment,setNewComment]=useState("");
    const[comments,setComments]=useState([
        // {
        //     content:'',
        //     created_acc:{
        //         username:'',
        //         role:{
        //             rolename:""
        //         }
        //     },
        //     replied_cmt:{
        //         created_acc:{
        //             username:"",
        //         },
        //         content:""
        //     }
        // }
    ]);
    const[page,setPage]=useState(1);
    const[pages,setPages]=useState(0);
    const nextPage=()=>{
        if(page<pages)
        setPage(page+1);
    }
    const prevPage=()=>{
        if(page>1)
        setPage(page-1);
    }
    const changePage=(e)=>{
        if(e.target.valueAsNumber>=1)
        setPage(e.target.valueAsNumber);
    }
    const changeNewComment=(e)=>{
        setNewComment(e.target.value);
    }
    const addComment=()=>{
        console.log(newComment);
        setNewComment("");
        reload();
    }
    const chooseTopic=(e)=>{
        setTopicId(e.target.value);
    }
    const enterEditPostContent=(e)=>{
        setEditPostContent(e.target.value)
    }
    const enterEditPostTitle=(e)=>{
        setEditPostTitle(e.target.value)
    }
    const changePost=()=>{
        let updatedPost={
            id:String(id),
            title:editPostTitle,
            content:editPostContent
        }
        if(topicId==="0"){
            setToast("danger","ERROR","Please choose topic to change !!!!")
        } else if(editPostTitle===""){
            setToast("danger","ERROR","Please enter title !!!!")
        } else if(editPostContent===""){
            setToast("danger","ERROR","Please enter content !!!!");
        } else {
            PostService.editPost(Number(topicId),updatedPost).then(res=>{
                if(res.data.status===401){
                    alert("session expired");
                    navigate("/")
                }
                reload();
            })
            handleCloseEdit();
            setToast("success","SUCCESSFUL","Post Edited !!!")
            
        }
    }
    const deletePost=()=>{
        console.log(id);
        handleCloseDelete();
        PostService.deletePost(String(id)).then(res=>{
            if(res.data.status===401){
                alert("session expired");
                navigate("/")
            }
            navigate("/posts")
        });
    }
    useEffect(()=>{
        setLoading(true);
        const ourRequest=axios.CancelToken.source();
        setTimeout(async() => {
            await PostService.getPost(String(id),ourRequest).then(res=>{
                if(res.data.status===401){
                    alert("session expired");
                    navigate("/")
                }
                setPost(res.data);
                // firstImage="changed !!!!!!!!!!!!!!!!!!!!!!!!!!!!"
                // /img="https:[a-z,.0-9/-_]+\w"/g
            })
            setLoading(false);
            if (mount===false)
                setMount(true);
            return()=>{
                ourRequest.cancel('Request is canceled by user');
            }
        }, 1000);
    },[id, update])
    useEffect(()=>{
        setLoading(true);
        setTimeout(async() => {
            await PostService.getComments(String(id),page).then(res=>{
                if(res.data.status===401){
                    navigate("/")
                }
                setComments(res.data.content);
                setPages(res.data.totalPages)
            })
            setLoading(false);
            if (mount===false)
                setMount(true);
        }, 1000);
    },[id, page, update])
    useEffect(()=>{
        setLoading(true);
        setTimeout(async()=>{
            await TopicService.getTopicList().then(res=>{
                if(res.data.status===401){
                    navigate("/")
                }
                setTopicList(res.data);
            })
            setLoading(false);
            if (mount===false)
                setMount(true);
        },1000);
    },[]);
    return (
        <div>
            {
                (mount===false)
                ?<>
                    <TailSpin wrapperStyle={{display:"block",position:"fixed",bottom:"5px"}} color="red" height={200} width={200} />
                </>
                :
                <div>
                    <table style={{width:"1920px",border:"none"}}>
                        <td style={{width:"30%",color:"yellow",verticalAlign:"top"}}>
                        <table style={{width:"100%"}}>
                            <tr>
                                {
                                    (loading===true)
                                    ?<td style={{textAlign:"right"}}>
                                        <TailSpin wrapperStyle={{display:"block",position:"fixed",bottom:"5px"}} color="red" height={200} width={200} />
                                    </td>:<></>
                                }    
                            </tr>
                        </table>
                        </td>
                        <td style={{width:"60%",color:"yellow"}}>
                            <tr style={{marginBottom:"20px"}}>
                                <td>   
                                <Card style={{marginBottom:"20px",marginTop:"30px"}}>
                                    <Card.Header style={{color:"blue"}}>
                                        <img style={{width:"50px",height:"50px"}} src='//ssl.gstatic.com/accounts/ui/avatar_2x.png' alt=''></img>
                                        <b>&nbsp;{post.created_acc.username}</b> ({post.created_acc.role.rolename})
                                        {/* {(post.updated_at===null)
                                        ?<>| {new Date(post.created_at).toLocaleDateString(undefined,
                                            { year: "numeric", month: "long", day: "numeric", hour:"2-digit",minute:"2-digit",second:"2-digit" })}</>
                                        :<>| Last updated: {new Date(post.updated_at).toLocaleDateString(undefined,
                                            { year: "numeric", month: "long", day: "numeric", hour:"2-digit",minute:"2-digit",second:"2-digit" })}</>} */}
                                        {
                                                        <>&nbsp;|&nbsp;
                                                            {(currentDay.getFullYear() > new Date(post.created_at).getFullYear())
                                                            ?
                                                            <>({currentDay.getFullYear()-new Date(post.created_at).getFullYear()} years ago)</>
                                                            :
                                                            <>
                                                                {
                                                                    (currentDay.getMonth()> new Date(post.created_at).getMonth())
                                                                    ?
                                                                    <>{currentDay.getMonth()-new Date(post.created_at).getMonth()} months ago</>
                                                                    :
                                                                    <>
                                                                        {
                                                                            (currentDay.getDate()> new Date(post.created_at).getDate())
                                                                            ?
                                                                            <>{currentDay.getDate()-new Date(post.created_at).getDate()} days ago</>
                                                                            :
                                                                            <>
                                                                                {
                                                                                    (currentDay.getHours()> new Date(post.created_at).getHours())
                                                                                    ?
                                                                                    <>{currentDay.getHours()-new Date(post.created_at).getHours()} hours ago</>
                                                                                    :
                                                                                    <>
                                                                                        {
                                                                                            (currentDay.getMinutes()> new Date(post.created_at).getMinutes())
                                                                                            ?
                                                                                            <>{currentDay.getMinutes()-new Date(post.created_at).getMinutes()} minutes ago</>
                                                                                            :
                                                                                            <>{currentDay.getSeconds()-new Date(post.created_at).getSeconds()} seconds ago</>
                                                                                        }
                                                                                    </>
                                                                                }
                                                                            </>
                                                                        }
                                                                    </>
                                                                }
                                                            </>
                                                            }
                                                            &nbsp;({new Date(post.created_at).toLocaleDateString(undefined,
                                                            { year: "numeric", month: "long", day: "numeric", hour:"2-digit",minute:"2-digit",second:"2-digit" })})
                                                        </>
                                        }
                                        <p>Topic: {post.topic.topicname}</p>     
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Title style={{color:"red"}}>{post.title}</Card.Title>
                                        <Card.Text style={{color:"black"}}>
                                        <p className='arr-value' style={{whiteSpace: "pre-wrap"}}>{post.content}</p>
                                        </Card.Text>
                                    </Card.Body>               
                                </Card>
                                <Form.Group style={{marginTop:"30px"}}>
                                    <Form.Control as="textarea" rows={3} placeholder='Type your comment.....' value={newComment} onChange={changeNewComment}></Form.Control>
                                    <Button style={{color:"white"}} onClick={addComment}>Comment</Button>
                                </Form.Group>
                                {/* <Form.Group style={{marginTop:"30px"}}>
                                    {(isEdit===false)?<p>hellooooooooooooooo, not edit !!!!!!</p>:<Form.Control as="textarea" rows={5} placeholder='Type your comment.....' onChange={changeNewComment}></Form.Control>}
                                    <Button style={{color:"white"}} onClick={showInput}>Edit</Button>
                                </Form.Group> */}
                                </td>
                                <td style={{verticalAlign:"top"}}>
                                    {
                                        (role!=="user"||accid===String(post.created_acc.id))
                                        ?
                                        <Dropdown style={{marginTop:"30px"}}>
                                            <Dropdown.Toggle variant="warning">
                                            <img src={moreIcon} alt="logo"/>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                            {
                                                (accid===String(post.created_acc.id))
                                                ?
                                                <Dropdown.Item href="#">
                                                    <button style={{border:"none",background:"none",color:"blue"}} onClick={handleShowEdit}>Edit Post</button>
                                                </Dropdown.Item>
                                                :
                                                <></>
                                            }
                                            {
                                                (role!=="user"||accid===String(post.created_acc.id))
                                                ?
                                                <Dropdown.Item href="#">
                                                    <button style={{border:"none",background:"none",color:"red"}} onClick={handleShowDelete}>Delete Post</button>
                                                </Dropdown.Item>
                                                :
                                                <></>
                                            }
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        :<></>
                                    }
                                </td>
                            </tr>
                            <tr>
                                    <ButtonGroup aria-label="Basic example">
                                        <Button variant="secondary"onClick={prevPage}>{"<<<"} Previous Page</Button>
                                        <Button variant="secondary"onClick={nextPage}>Next Page {">>>"}</Button>
                                    </ButtonGroup>
                                        <label style={{marginLeft:"30px"}}>Page:</label><input min={1} max={pages} type="number" style={{width:"50px",marginLeft:"10px"}} value={page} onChange={changePage}/> 
                            </tr>
                            {
                                comments.map(
                                    comment=>
                                    <tr key={comment.id}>
                                        <td>
                                        <Card style={{marginBottom:"20px",marginTop:"30px"}}>
                                            <Card.Header style={{color:"blue"}}>
                                                <img style={{width:"50px",height:"50px"}} src='//ssl.gstatic.com/accounts/ui/avatar_2x.png' alt=''></img>
                                                <b>&nbsp;{comment.created_acc.username}</b> ({comment.created_acc.role.rolename})
                                                {/* {(comment.updated_at===null)
                                                ?<>| {new Date(comment.created_at).toLocaleDateString(undefined,
                                                    { year: "numeric", month: "long", day: "numeric", hour:"2-digit",minute:"2-digit",second:"2-digit" })}</>
                                                :<>| Last updated: {new Date(comment.updated_at).toLocaleDateString(undefined,
                                                    { year: "numeric", month: "long", day: "numeric", hour:"2-digit",minute:"2-digit",second:"2-digit" })}</>}      */}
                                                {
                                                    <>&nbsp;|&nbsp;
                                                        {(currentDay.getFullYear() > new Date(comment.created_at).getFullYear())
                                                        ?
                                                        <>({currentDay.getFullYear()-new Date(comment.created_at).getFullYear()} years ago)</>
                                                        :
                                                        <>
                                                            {
                                                                (currentDay.getMonth()> new Date(comment.created_at).getMonth())
                                                                ?
                                                                <>{currentDay.getMonth()-new Date(comment.created_at).getMonth()} months ago</>
                                                                :
                                                                <>
                                                                    {
                                                                        (currentDay.getDate()> new Date(comment.created_at).getDate())
                                                                        ?
                                                                        <>{currentDay.getDate()-new Date(comment.created_at).getDate()} days ago</>
                                                                        :
                                                                        <>
                                                                            {
                                                                                (currentDay.getHours()> new Date(comment.created_at).getHours())
                                                                                ?
                                                                                <>{currentDay.getHours()-new Date(comment.created_at).getHours()} hours ago</>
                                                                                :
                                                                                <>
                                                                                    {
                                                                                        (currentDay.getMinutes()> new Date(comment.created_at).getMinutes())
                                                                                        ?
                                                                                        <>{currentDay.getMinutes()-new Date(comment.created_at).getMinutes()} minutes ago</>
                                                                                        :
                                                                                        <>{currentDay.getSeconds()-new Date(comment.created_at).getSeconds()} seconds ago</>
                                                                                    }
                                                                                </>
                                                                            }
                                                                        </>
                                                                    }
                                                                </>
                                                            }
                                                        </>
                                                        }
                                                        &nbsp;({new Date(comment.created_at).toLocaleDateString(undefined,
                                                        { year: "numeric", month: "long", day: "numeric", hour:"2-digit",minute:"2-digit",second:"2-digit" })})
                                                    </>
                                                }
                                            </Card.Header>
                                            <Card.Body>
                                                {
                                                    (comment.replied_cmt!==null)
                                                    ?<>
                                                        <p style={{color:"#DDD8D8",fontSize:"15px"}}>(Replied from <b>@{comment.replied_cmt.created_acc.username}</b>)</p>
                                                        <p style={{color:"#DDD8D8",fontSize:"15px"}}>{comment.replied_cmt.content}</p>
                                                    </>
                                                    :<></>
                                                }
                                                {
                                                    (isEdit===true&&editCommentId===comment.id)
                                                    ?
                                                    <div>
                                                        <Form.Control as="textarea" cols={4} value={editCommentContent}></Form.Control>
                                                        <Button style={{color:"white"}} onClick={cancelEditComment}>Cancel</Button>
                                                        <Button style={{color:"white"}}>Edit</Button>
                                                    </div>
                                                    :
                                                    <Card.Text style={{color:"black"}}>
                                                        <p style={{whiteSpace: "pre-wrap"}}>{comment.content}</p>
                                                    </Card.Text>
                                                }
                                                
                                            </Card.Body>
                                            <Card.Footer>
                                                <Form.Control type="text" placeholder='Reply comment.....' value={newComment} onChange={changeNewComment}></Form.Control>
                                                <Button style={{color:"white"}}>Reply</Button>  
                                            </Card.Footer>               
                                        </Card>
                                        </td>
                                        <td style={{verticalAlign:"top"}}>
                                            {
                                                (role!=="user"||accid===String(comment.created_acc.id)||accid===String(post.created_acc.id))
                                                ?
                                                <Dropdown style={{marginTop:"30px"}}>
                                                    <Dropdown.Toggle variant="warning">
                                                    <img src={moreIcon} alt="logo"/>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                    {
                                                        (accid===String(comment.created_acc.id))
                                                        ?
                                                        <Dropdown.Item href="#">
                                                            <button style={{border:"none",background:"none",color:"blue"}} onClick={()=>showEditComment(comment)}>Edit Comment</button>
                                                        </Dropdown.Item>
                                                        :
                                                        <></>
                                                    }
                                                    {
                                                        (role!=="user"||accid===String(comment.created_acc.id)||accid===String(post.created_acc.id))
                                                        ?
                                                        <Dropdown.Item href="#">
                                                            <button style={{border:"none",background:"none",color:"red"}}>Delete Comment</button>
                                                        </Dropdown.Item>
                                                        :
                                                        <></>
                                                    }
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                                :<></>
                                            }
                                        </td>
                                    </tr>
                                )
                            }
                            <tr>

                            </tr>
                        </td>
                        <td style={{width:"10%",color:"yellow"}}>
                        <div 
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
                            </div>
                            <Modal
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
                                        {/* <option value={topicId}> {topicName}</option> */}
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
                            </Modal>
                            <Modal
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
                            </Modal>
                        </td>
                    </table>
                </div>
            }
        </div>   
    )
}
export default PostDetail;