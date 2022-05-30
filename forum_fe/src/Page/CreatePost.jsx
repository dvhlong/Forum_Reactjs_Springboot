import React, { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import TopicService from '../Service/TopicService';
import PostService from '../Service/PostService';
import Swal from 'sweetalert2';
import { motion } from "framer-motion";
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreatePost() {

    const serverUrl = "https://dvhl-forum-be.herokuapp.com";

    let Sock = new SockJS(serverUrl + '/ws');

    let stompClient = over(Sock);

    const role = localStorage.getItem("role");

    const [topicList, setTopicList] = useState([]);

    const [newTitle, setNewTitle] = useState("");

    const [newContent, setNewContent] = useState("");

    const [topicId, setTopicId] = useState("0");

    const enterTitle = (e) => {
        setNewTitle(e.target.value)
    }

    const chooseTopic = (e) => {
        setTopicId(e.target.value);
    }

    const createPost = () => {
        if (topicId === "0") {
            toast.error('Please choose topic !!!', {
                position: "top-right",
                autoClose: 5000,
            });
        } else if (newTitle === "") {
            toast.error('Please type title !!!', {
                position: "top-right",
                autoClose: 5000,
            });
        } else if (newContent === "") {
            toast.error('Please type content !!!', {
                position: "top-right",
                autoClose: 5000,
            });
        }
        else {
            let newPost = {
                title: newTitle,
                content: newContent
            }
            PostService.createPost(Number(topicId), newPost).then(res => {
                setTopicId("0");
                setNewTitle("");
                setNewContent("");
                if (role === "user") {
                    stompClient.send("/notify/updateNewPostsToApprove");
                    Swal.fire({
                        icon: 'success',
                        title: 'Successful, please waiting for approval !!!!',
                        showConfirmButton: false,
                        timer: 2000
                    })
                } else {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!!!!',
                        showConfirmButton: false,
                        timer: 2000
                    })
                }
            })
        }
    }

    const connectSocket = () => {
        if (!stompClient.connected) {
            stompClient.connect({
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Access-Control-Allow-Credentials": true,
            }, () => { /* TODO document why this arrow function is empty */ }, onError);
        }
    }

    const onError = (err) => {
        console.log(err);
    }

    const disconectSocket = () => {
        stompClient.disconnect();
    }

    useEffect(() => {
        connectSocket();
        TopicService.getTopicList().then(res => {
            setTopicList(res.data);
        })
        return () => {
            disconectSocket();
        }
    }, []);

    return (
        <div>
            <ToastContainer theme="dark" />
            {/* <h1 style={{textAlign:"center",color:"white"}}>Create New Post</h1> */}
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
                    <Form.Control value={newTitle} onChange={enterTitle} maxLength={255}></Form.Control>
                </div>
                <div className='post-label'>
                    Content:
                </div>
                <div className='post-content'>
                    <CKEditor
                        config={{
                            placeholder: "Type content here......",
                            mediaEmbed: {
                                previewsInData: true
                            },
                            link: {
                                addTargetToExternalLinks: true
                            }
                        }}
                        editor={Editor}
                        data={newContent}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setNewContent(data);
                        }}
                    />
                </div>
                <div className='post-footer'>
                    <Button variant="primary" onClick={createPost} >Create</Button>
                </div>
            </motion.div>
        </div>
    )
}
export default CreatePost;