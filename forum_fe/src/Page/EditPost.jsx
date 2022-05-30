import React, { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useParams, useNavigate } from 'react-router-dom';
import PostService from '../Service/PostService';
import TopicService from '../Service/TopicService';
import axios from "axios";
import { TailSpin } from 'react-loader-spinner';
import { motion } from "framer-motion";
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditPost() {

    const serverUrl = "https://dvhl-forum-be.herokuapp.com";

    let Sock = new SockJS(serverUrl + '/ws');

    let stompClient = over(Sock);

    let navigate = useNavigate();

    let { id } = useParams();

    const [topicList, setTopicList] = useState([]);

    const [topicId, setTopicId] = useState("0");

    const [editPostTitle, setEditPostTitle] = useState("")

    const [editPostContent, setEditPostContent] = useState("")

    const [loading, setLoading] = useState(false);

    const chooseTopic = (e) => {
        setTopicId(e.target.value);
    }

    const enterEditPostTitle = (e) => {
        setEditPostTitle(e.target.value)
    }

    const changePost = () => {
        let updatedPost = {
            id: String(id),
            title: editPostTitle,
            content: editPostContent
        }
        if (topicId === "0") {
            toast.error('Please choose topic !!!', {
                position: "top-right",
                autoClose: 5000,
            });
        } else if (editPostTitle === "") {
            toast.error('Please type title !!!', {
                position: "top-right",
                autoClose: 5000,
            });
        } else if (editPostContent === "") {
            toast.error('Please type content !!!', {
                position: "top-right",
                autoClose: 5000,
            });
        } else {
            PostService.editPost(Number(topicId), updatedPost).then(res => {
                if (res.data.status === 401) {
                    Swal.fire({
                        icon: 'danger',
                        title: 'Session expired !!!!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    navigate("/")
                } else {
                    stompClient.send("/notify/updatePost/" + updatedPost.id);
                }
            })
            Swal.fire({
                icon: 'success',
                title: 'Post edited !!!!',
                showConfirmButton: false,
                timer: 2000
            })
            navigate(-1);
        }
    }

    const connectSocket = () => {
        stompClient.connect({
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Access-Control-Allow-Credentials": true,
        }, () => { /* TODO document why this arrow function is empty */ }, onError);
    }

    const onError = (err) => {
        console.log(err);
    }

    const disconectSocket = () => {
        stompClient.disconnect();
    }

    useEffect(() => {
        connectSocket();
        setLoading(true);
        const ourRequest = axios.CancelToken.source();
        setTimeout(async () => {
            await PostService.getPost(String(id), ourRequest).then(res => {
                if (res.data.status === 401) {
                    Swal.fire({
                        icon: 'danger',
                        title: 'Session expired !!!!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    navigate("/")
                }
                setTopicId(res.data.topic.id)
                setEditPostTitle(res.data.title);
                setEditPostContent(res.data.content);
            })
            setLoading(false);
            return () => {
                disconectSocket();
                ourRequest.cancel('Request is canceled by user');
            }
        }, 800);
    }, [id, navigate])

    useEffect(() => {
        setLoading(true);
        setTimeout(async () => {
            await TopicService.getTopicList().then(res => {
                if (res.data.status === 401) {
                    navigate("/")
                }
                setTopicList(res.data);
            })
            setLoading(false);
        }, 1000);
    }, [navigate]);

    return (
        <div>
            <ToastContainer theme="dark" />
            {
                (loading === true)
                    ? <TailSpin wrapperStyle={{ display: "block", position: "fixed", bottom: "5px" }} color="red" height={200} width={200} />
                    : <></>
            }
            {/* <h1 style={{textAlign:"center",color:"white"}}>Edit Post</h1> */}
            <motion.div className='post-container' style={{ marginTop: "30px" }}
                animate={{
                    opacity: [0, 1],
                    translateY: [80, 0],
                }}
            >
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
                                topic =>
                                    <option key={topic.id} value={topic.id}>{topic.topicname}</option>
                            )
                        }
                    </Form.Select>
                </div>
                <div className='post-label'>
                    Title:
                </div>
                <div className='post-input'>
                    <Form.Control value={editPostTitle} onChange={enterEditPostTitle} maxLength={255}></Form.Control>
                </div>
                <div className='post-label'>
                    Content:
                </div>
                <div className='post-content'>
                    <CKEditor
                        editor={Editor}
                        config={{
                            placeholder: "Type content here......",
                            mediaEmbed: {
                                previewsInData: true
                            },
                            link: {
                                addTargetToExternalLinks: true
                            }
                        }}
                        data={editPostContent}
                        onChange={(_event, editor) => {
                            const data = editor.getData();
                            setEditPostContent(data);
                        }}
                    />
                </div>
                <div className='post-footer'>
                    <Button variant="secondary" onClick={() => navigate(-1)} >Back</Button>
                    <Button variant="primary" style={{ marginLeft: "10px" }} onClick={changePost}>Change</Button>
                </div>
            </motion.div>
        </div>
    )
}
export default EditPost;