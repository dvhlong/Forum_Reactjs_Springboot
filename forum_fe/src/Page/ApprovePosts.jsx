import React,{useState,useEffect} from 'react';
import Header from '../Component/HeaderComponent';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import moreIcon from '../SVG/more.svg';
import PostService from '../Service/PostService';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import yesIcon from '../SVG/yes.svg';
import noIcon from '../SVG/no.svg';
import SidebarComponent from '../Component/SidebarComponent';
function ApprovePosts() {
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
    const approvePost=(id)=>{
        PostService.approvePost(id).then(res=>{
            console.log(res.data)
            setResult(result.filter(post=>post.id!==id))
        })
    }
    const rejectPost=(id)=>{
        PostService.rejectPost(id).then(res=>{
            console.log(res.data)
            setResult(result.filter(post=>post.id!==id))
        })
    }
    useEffect(()=>{
        PostService.getApprovePost(page).then(res=>{
            if(res.data.content!==null){
                // console.log(res.data.content);
                setResult(res.data.content);
                setPages(res.data.totalPages)
            }
        })
    },[page]);
    return (
        <div>
            <Header/>
            <h1 style={{textAlign:"center",color:"white"}}>APPROVE POST</h1>
            <table style={{width:"1920px",border:"none"}}>
                <td style={{width:"30%",color:"yellow"}}>
                
                </td>
                <td style={{width:"60%",color:"yellow"}}>
                    <table style={{width:"100%"}}>
                        <tbody>
                            {
                                result.map(
                                    post=>
                                    <tr key={post.id}>
                                        <td>
                                        <Card style={{marginBottom:"20px"}}>
                                            <Card.Header style={{color:"blue"}}>
                                                <p>Time post: {new Date(post.created_at).toLocaleDateString(undefined,
                                                    { year: "numeric", month: "long", day: "numeric", hour:"2-digit",minute:"2-digit",second:"2-digit" })}</p>     
                                                <p>Account created: {post.created_acc.username} ({post.created_acc.role.rolename})</p>
                                                <p>Topic: {post.topic.topicname}</p>
                                            </Card.Header>
                                            <Card.Body>
                                                <Card.Title style={{color:"red"}}>{post.title}</Card.Title>
                                                <Card.Text style={{color:"black"}}>
                                                <p style={{whiteSpace: "pre-wrap"}}>{post.content}</p>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                        </td>
                                        <td style={{verticalAlign:"top"}}>
                                        <ButtonGroup aria-label="Basic example">
                                            <Button variant="success" onClick={()=>approvePost(post.id)}><img src={yesIcon} alt="" /></Button>
                                            <Button variant="danger" onClick={()=>rejectPost(post.id)}><img src={noIcon} alt="" /></Button>
                                        </ButtonGroup>
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
                </td>
                <td style={{width:"10%",color:"yellow",verticalAlign:"top"}}>

                </td>
            </table>
        </div>
    )
}
export default ApprovePosts;
