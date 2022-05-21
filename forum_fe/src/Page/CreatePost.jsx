import React, { useState, useEffect } from 'react';
import '../CSS/CreateAndEditPost.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import TopicService from '../Service/TopicService';
import PostService from '../Service/PostService';
import Swal from 'sweetalert2';
import { motion } from "framer-motion"

function CreatePost() {

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
            Swal.fire({
                icon: 'error',
                title: 'Please choose Topic !!!!',
            })
        } else if (newTitle === "")
            Swal.fire({
                icon: 'error',
                title: 'Please type title !!!!',
            })
        else if (newContent === "")
            Swal.fire({
                icon: 'error',
                title: 'Please type content !!!!',
            })
        else {
            let newPost = {
                title: newTitle,
                content: newContent
            }
            PostService.createPost(Number(topicId), newPost).then(res => {
                setTopicId(0);
                setNewTitle("");
                setNewContent("");
                if (role === "user")
                    Swal.fire({
                        icon: 'success',
                        title: 'Successful, please waiting for approve !!!!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                else
                    Swal.fire({
                        icon: 'success',
                        title: 'Successful !!!!',
                        showConfirmButton: false,
                        timer: 1500
                    })
            })
        }
    }

    useEffect(() => {
        TopicService.getTopicList().then(res => {
            setTopicList(res.data);
        })
    }, []);

    return (
        <div>
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
                    <Form.Control value={newTitle} onChange={enterTitle}></Form.Control>
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