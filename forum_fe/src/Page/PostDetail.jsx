import React,{useState,useEffect} from 'react';
import Card from 'react-bootstrap/Card';
import PostService from '../Service/PostService';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import {useParams,useNavigate} from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import TopicService from '../Service/TopicService';
import '../CSS/PostDetail.css';
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'
import moreIcon from '../SVG/more.svg';
import {TailSpin} from 'react-loader-spinner';
import axios from "axios";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import parse from "html-react-parser";
import Moment from 'react-moment';
import Swal from 'sweetalert2';
import SideComponent from '../Component/SideComponent';
function PostDetail(){
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
        content:'',
    });
    const[newComment,setNewComment]=useState("");
    const changeNewComment=(e)=>setNewComment(e.target.value);
    const[comments,setComments]=useState([]);
    const[isReply,setIsReply]=useState(false);
    const[replyCommentId,setReplyCommentId]=useState(0);
    const[editCommentId,setEditCommentId]=useState(0);
    const[editCommentContent,setEditCommentContent]=useState("");
    const showEditComment=(comment)=>{
        setIsEdit(true);
        setEditCommentId(comment.id);
        setEditCommentContent(comment.content);
    }
    const cancelEditComment=()=>setIsEdit(false);
    const changeEditComment=(e)=>setEditCommentContent(e.target.value)
    const submitEditComment=()=>{
        let comment={
            content:editCommentContent
        }
        if(editCommentContent!==""){
            PostService.editComment(editCommentId,comment).then(res=>{
                reload();
                setIsEdit(false);
                Swal.fire({
                    position: 'middle',
                    icon: 'success',
                    title: 'Comment Changed !!!!',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
        }
    }
    const [deleteCommentId,setDeleteCommentId]=useState(0);
    const showDeleteComment=(commentid)=>{
        setDeleteCommentId(commentid);
        handleShowDeleteCommentModal();
    }
    const [deleteCommentModal,setDeleteCommentModal]=useState(false);
    const handleShowDeleteCommentModal=()=>{
        setDeleteCommentModal(true);
    }
    const handleCloseDeleteCommentModal=()=>{
        setDeleteCommentModal(false);
    }
    const deleteComment=()=>{
        PostService.deleteComment(deleteCommentId).then(res=>{
            Swal.fire({
                position: 'middle',
                icon: 'success',
                title: 'Comment deleted !!!!',
                showConfirmButton: false,
                timer: 1500
            })
            reload();
        })
        handleCloseDeleteCommentModal();
    }
    const[page,setPage]=useState(1);
    const[pages,setPages]=useState(0);
    const nextPage=()=>{
        if(page<pages)
        setPage(page+1);
    }
    const replyComment=(commentid)=>{
        setReplyCommentId(commentid);
        setIsReply(true);
    }
    const cancelReply=()=>{
        setIsReply(false);
    }
    const prevPage=()=>{
        if(page>1)
        setPage(page-1);
    }
    const changePage=(e)=>{
        if(e.target.valueAsNumber>=1)
        setPage(e.target.valueAsNumber);
    }
    const addComment=(postid,replyid)=>{
        let comment={
            content:newComment
        }
        if(newComment!==""){
            PostService.addComment(postid,replyid,comment).then(res=>{
                if(page!==1)
                    setPage(1);
                else 
                    reload();
            })
            setIsReply(false);
            setNewComment(""); 
        }
    }
    const chooseTopic=(e)=>{
        setTopicId(e.target.value);
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
            Swal.fire({
                position: 'middle',
                icon: 'error',
                title: 'Please choose topic !!!!',
                showConfirmButton: false,
                timer: 1500
            })
        } else if(editPostTitle===""){
            Swal.fire({
                position: 'middle',
                icon: 'error',
                title: 'Please enter title !!!!',
                showConfirmButton: false,
                timer: 1500
            })
        } else if(editPostContent===""){
            Swal.fire({
                position: 'middle',
                icon: 'error',
                title: 'Please enter content name !!!!',
                showConfirmButton: false,
                timer: 1500
            })
        } else {
            PostService.editPost(Number(topicId),updatedPost).then(res=>{
                if(res.data.status===401){
                    alert("session expired");
                    navigate("/")
                }
                reload();
            })
            handleCloseEdit();
            Swal.fire({
                position: 'middle',
                icon: 'success',
                title: 'Post edited !!!!',
                showConfirmButton: false,
                timer: 1500
            })         
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
            })
            setLoading(false);
            if (mount===false)
                setMount(true);
            return()=>{
                ourRequest.cancel('Request is canceled by user');
            }
        }, 800);
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
        }, 800);
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
                <div>
                    <table style={{width:"100%",border:"none",marginTop:"30px"}}>
                        <tr>
                        <td style={{width:"30%",verticalAlign:"top"}}>
                        <table style={{width:"100%",textAlign:"center"}}>
                            <tr>
                                {
                                    (loading===true)
                                    ?<td style={{textAlign:"right"}}>
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
                        {
                        (mount===false)
                        ?
                        <td style={{width:"60%"}}></td>
                        :
                        <td style={{width:"60%"}}>
                            <tr style={{marginBottom:"20px"}}>
                                <td style={{width:"100%"}}>   
                                <Card style={{marginBottom:"20px"}}>
                                    <Card.Header style={{color:"blue"}}>
                                        <img style={{width:"50px",height:"50px",borderRadius:"50%"}} src='https://www.w3schools.com/howto/img_avatar.png' alt=''></img>
                                        <b>&nbsp;{post.created_acc.username}</b> ({post.created_acc.role.rolename})
                                        {
                                                        <>&nbsp;|&nbsp;
                                                            <Moment fromNow>{post.created_at}</Moment>
                                                            &nbsp;
                                                        (<Moment format='DD/MM/YYYY HH:mm'></Moment>)
                                                        </>
                                        }
                                        <p>Topic: {post.topic.topicname}</p>     
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Title style={{color:"red"}}>{post.title}</Card.Title>
                                            {parse(post.content)}
                                    </Card.Body>               
                                </Card>
                                <Form.Group style={{marginTop:"30px"}}>
                                    <Form.Control as="textarea" rows={3} placeholder='Type your comment.....' onChange={changeNewComment}></Form.Control>
                                    <Button style={{color:"white"}} onClick={()=>addComment(post.id,0)}>Comment</Button>
                                </Form.Group>
                                </td>
                                <td style={{verticalAlign:"top"}}>
                                    {
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
                                                <Dropdown.Item href="#" onClick={handleShowEdit}>
                                                    Edit Post
                                                </Dropdown.Item>
                                                :
                                                <></>
                                            }
                                            {
                                                (role!=="user"||accid===String(post.created_acc.id))
                                                ?
                                                <Dropdown.Item href="#" onClick={handleShowDelete}>
                                                    Delete Post
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
                                                <img style={{width:"50px",height:"50px",borderRadius:"50px"}} src='https://www.w3schools.com/howto/img_avatar.png' alt=''></img>
                                                <b>&nbsp;{comment.created_acc.username}</b> ({comment.created_acc.role.rolename})
                                                {
                                                    <>&nbsp;|&nbsp;
                                                        <Moment fromNow>{comment.created_at}</Moment>
                                                        &nbsp;
                                                        {/* ({new Date(comment.created_at).toLocaleDateString(undefined,
                                                        { year: "numeric", month: "long", day: "numeric", hour:"2-digit",minute:"2-digit",second:"2-digit" })}) */}
                                                        (<Moment format='DD/MM/YYYY HH:mm'>{comment.created_at}</Moment>)
                                                    </>
                                                }
                                            </Card.Header>
                                            <Card.Body>
                                                {
                                                    (comment.replied_cmt!==null)
                                                    ?<>
                                                        <p style={{color:"#DDD8D8",fontSize:"15px"}}>(Replied from <b>@{comment.replied_cmt.created_acc.username}</b>)</p>
                                                        <p style={{color:"#DDD8D8",fontSize:"15px",whiteSpace: "pre-wrap"}}>{comment.replied_cmt.content}</p>
                                                    </>
                                                    :<></>
                                                }
                                                {
                                                    (isEdit===true&&editCommentId===comment.id)
                                                    ?
                                                    <div>
                                                        <Form.Control as="textarea" cols={4} value={editCommentContent} onChange={changeEditComment}></Form.Control>
                                                        <Button style={{color:"white"}} onClick={cancelEditComment}>Cancel</Button>
                                                        <Button style={{color:"white"}} onClick={submitEditComment}>Edit</Button>
                                                    </div>
                                                    :
                                                    <Card.Text style={{color:"black"}}>
                                                        <p style={{whiteSpace: "pre-wrap"}}>{comment.content}</p>
                                                    </Card.Text>
                                                }
                                                
                                            </Card.Body>
                                            {
                                                (isReply===true&&replyCommentId===comment.id)
                                                ?
                                                <Card.Footer>
                                                    <Form.Control as="textarea" cols={1} placeholder='Reply comment.....'  onChange={changeNewComment}></Form.Control>
                                                    <Button style={{color:"white"}} onClick={()=>addComment(post.id,comment.id)}>Reply</Button>
                                                    <Button style={{color:"white"}} onClick={cancelReply}>Cancel</Button>   
                                                </Card.Footer>
                                                :
                                                <Card.Footer>
                                                    <Button style={{color:"white"}} onClick={()=>replyComment(comment.id)}>Reply this comment</Button>
                                                </Card.Footer>
                                            }               
                                        </Card>
                                        </td>
                                        <td style={{verticalAlign:"top"}}>
                                            {
                                                (role!=="user"||accid===String(comment.created_acc.id)||accid===String(post.created_acc.id))
                                                ?
                                                <Dropdown style={{marginTop:"30px"}}>
                                                    <Dropdown.Toggle variant="dark">
                                                    <img src={moreIcon} alt="logo"/>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu variant="dark">
                                                    {
                                                        (accid===String(comment.created_acc.id))
                                                        ?
                                                        <Dropdown.Item href="#" onClick={()=>showEditComment(comment)}>
                                                            Edit Comment
                                                        </Dropdown.Item>
                                                        :
                                                        <></>
                                                    }
                                                    {
                                                        (role!=="user"||accid===String(comment.created_acc.id)||accid===String(post.created_acc.id))
                                                        ?
                                                        <Dropdown.Item href="#" onClick={()=>showDeleteComment(comment.id)}>
                                                            Delete Comment
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
                        }
                        <td style={{width:"10%",color:"yellow"}}>
                            <Modal
                                // fullscreen={true}
                                size="lg"
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
                                    {/* <textarea name="" id="" cols="60" rows="10" value={editPostContent} onChange={enterEditPostContent}></textarea> */}
                        
                                        <CKEditor 
                                            editor={Editor}
                                            data={editPostContent}
                                            onChange={ ( event, editor ) => {
                                                const data = editor.getData();
                                                setEditPostContent(data);
                                            } }                    
                                        />    
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
                            <Modal
                                show={deleteCommentModal}
                                onHide={handleCloseDeleteCommentModal}
                                backdrop="static"
                                keyboard={false}
                            >
                                <Modal.Header closeButton>
                                <Modal.Title>Delete Comment</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                You really want to delete this comment ???
                                </Modal.Body>
                                <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseDeleteCommentModal}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={deleteComment}>Delete</Button>
                                </Modal.Footer>
                            </Modal>
                        </td>
                        </tr>
                    </table>
                </div>
        </div>   
    )
}
export default PostDetail;