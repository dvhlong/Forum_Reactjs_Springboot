import React,{useState,useEffect} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import PostService from '../Service/PostService';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { useNavigate } from 'react-router-dom';
import {TailSpin} from 'react-loader-spinner';
import Moment from 'react-moment';
import axios from "axios";
import SideComponent from '../Component/SideComponent';
function Posts(){
    let navigate=useNavigate();
    const[mount,setMount]=useState(false);
    const[loading,setLoading]=useState(false);
    const [update,setUpdate] = useState(false);
    const[result,setResult]=useState([]);
    const[page,setPage]=useState(1);
    const[pages,setPages]=useState(0);
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
    return(
        <div>
                <div>
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
                                                        <Button variant='secondary' onClick={()=>navigate(`/postDetail/${post.id}`)}>Detail {'>>>'}</Button>
                                                    </Card.Body>
                                                </Card>
                                                </td>
                                                <td style={{verticalAlign:"top"}}>
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
                        </td>
                    </table>
                </div>
        </div>
    )
}
export default Posts;