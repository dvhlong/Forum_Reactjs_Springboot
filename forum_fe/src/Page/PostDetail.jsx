import React,{useState,useEffect} from 'react';
import Card from 'react-bootstrap/Card';
import PostService from '../Service/PostService';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import {useNavigate, useParams } from 'react-router-dom';
import styles from '../CSS/style.css';
import {TailSpin} from 'react-loader-spinner';
import axios from "axios";
function PostDetail(){
    let {id}=useParams();
    const[loading,setLoading]=useState(false);
    const[inputTemp,setInputTemp]=useState("");
    const [update,setUpdate] = useState(false);
    const reload=()=>{setUpdate(!update);}
    const[isEdit,setIsEdit]=useState(false);
    const showInput=()=>{
        setIsEdit(!isEdit);
    }
    const[post,setPost]=useState({
        created_acc:{
            username:"",
            role:{
                rolename:""
            }
        },
        topic:{
            topicname:""
        }
    });
    const[newComment,setNewComment]=useState("");
    const[comment,setComment]=useState([]);
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
    useEffect(()=>{
        setLoading(true);
        const ourRequest=axios.CancelToken.source();
        setTimeout(async() => {
            await PostService.getPost(String(id),ourRequest).then(res=>{
                setPost(res.data);
            })
            setLoading(false);
            return()=>{
                ourRequest.cancel('Request is canceled by user');
            }
        }, 1000);
    },[id, page, update])
    return (
        <div>
            <table style={{width:"1920px",border:"none"}}>
                <td style={{width:"30%",color:"yellow",verticalAlign:"top"}}>
                <table style={{width:"100%"}}>
                    <tr>
                        {
                            (loading===true)
                            ?<td style={{textAlign:"right"}}>
                                <TailSpin wrapperStyle={{display:"block"}} color="red" height={50} width={50} />
                            </td>:<></>
                        }    
                    </tr>
                </table>
                </td>
                <td style={{width:"60%",color:"yellow"}}>
                    <tr>
                        <td>   
                        <Card style={{marginBottom:"20px",marginTop:"30px"}}>
                            <Card.Header style={{color:"blue"}}>
                                <p>Account created: {post.created_acc.username} ({post.created_acc.role.rolename})</p>
                                <p>Topic: {post.topic.topicname}</p>
                                {(post.updated_at==="")
                                ?<p>Time post: {new Date(post.created_at).toLocaleDateString(undefined,
                                    { year: "numeric", month: "long", day: "numeric", hour:"2-digit",minute:"2-digit",second:"2-digit" })}</p>
                                :<p>Last updated: {new Date(post.updated_at).toLocaleDateString(undefined,
                                    { year: "numeric", month: "long", day: "numeric", hour:"2-digit",minute:"2-digit",second:"2-digit" })}</p>}     
                            </Card.Header>
                            <Card.Body>
                                <Card.Title style={{color:"red"}}>{post.title}</Card.Title>
                                <Card.Text style={{color:"black"}}>
                                <p style={{whiteSpace: "pre-wrap"}}>{post.content}</p>
                                </Card.Text>
                            </Card.Body>               
                        </Card>
                        <Form.Group style={{marginTop:"30px"}}>
                            <Form.Control as="textarea" rows={5} placeholder='Type your comment.....' value={newComment} onChange={changeNewComment}></Form.Control>
                            <Button style={{color:"white"}} onClick={addComment}>Comment</Button>
                        </Form.Group>
                        <Form.Group style={{marginTop:"30px"}}>
                            {(isEdit===false)?<p>hellooooooooooooooo, not edit !!!!!!</p>:<Form.Control as="textarea" rows={5} placeholder='Type your comment.....' onChange={changeNewComment}></Form.Control>}
                            <Button style={{color:"white"}} onClick={showInput}>Edit</Button>
                        </Form.Group>
                        </td>
                        <td style={{verticalAlign:"top"}}>

                        </td>
                    </tr>
                    <tr>

                    </tr>
                </td>
                <td style={{width:"10%",color:"yellow"}}>

                </td>
            </table>
        </div>
    )
}
export default PostDetail;