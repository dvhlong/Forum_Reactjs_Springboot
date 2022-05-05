import React,{useState,useEffect} from 'react';
import '../CSS/CreateAndEditPost.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useParams,useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';
import PostService from '../Service/PostService';
import TopicService from '../Service/TopicService';
import axios from "axios";
import {TailSpin} from 'react-loader-spinner';
function EditPost(){
    let navigate=useNavigate();
    let {id}=useParams();
    const[topicList,setTopicList]=useState([]);
    const [topicId,setTopicId]=useState("0");
    const [topicName,setTopicName]=useState("");
    const[editPostTitle,setEditPostTitle]=useState("")
    const[editPostContent,setEditPostContent]=useState("")
    const[loading,setLoading]=useState(false);
    const[mount,setMount]=useState(false);
    const [update,setUpdate] = useState(false);
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
            })
            Swal.fire({
                position: 'middle',
                icon: 'success',
                title: 'Post edited !!!!',
                showConfirmButton: false,
                timer: 1500
            })
            navigate(-1);         
        }
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
                setTopicId(res.data.topic.id)
                setTopicName(res.data.topic.topicname)
                setEditPostTitle(res.data.title);
                setEditPostContent(res.data.content);
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
    return(
        <div>
            {
                (loading===true)
                ?<TailSpin wrapperStyle={{display:"block",position:"fixed",bottom:"5px"}} color="red" height={200} width={200} />
                :<></>
            } 
            <h1 style={{textAlign:"center",color:"white"}}>Edit Post</h1>
            <div className='post-container'>
                <div className='post-label'>
                    Topic:
                </div>
                <div className='post-select'>
                <Form.Select aria-label="Default select example" 
                    value={topicId} onChange={chooseTopic}
                >
                    <option value="0"> Select Topic</option>
                    {
                        topicList.map(
                            topic=>
                            <option key={topic.id} value={topic.id}>{topic.topicname}</option>
                        )
                    }
                </Form.Select> 
                </div>
                <div className='post-label'>
                    Title:
                </div>
                <div className='post-input'>
                    <Form.Control value={editPostTitle} onChange={enterEditPostTitle}></Form.Control>
                </div>
                <div className='post-label'>
                    Content:
                </div>
                <div className='post-content'>
                <CKEditor 
                    editor={Editor}
                    data={editPostContent}
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        setEditPostContent(data);
                    } }                    
                /> 
                </div>
                <div className='post-footer'>
                    <Button variant="secondary" onClick={()=>navigate(-1)} >Back</Button>
                    <Button variant="primary" style={{marginLeft:"10px"}} onClick={changePost}>Change</Button>
                </div>
            </div>
        </div>
    )
}
export default EditPost;