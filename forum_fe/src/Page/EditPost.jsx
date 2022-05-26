import React, { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import PostService from '../Service/PostService';
import TopicService from '../Service/TopicService';
import axios from "axios";
import { TailSpin } from 'react-loader-spinner';
import { motion } from "framer-motion"

function EditPost() {

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
            Swal.fire({
                icon: 'error',
                title: 'Please choose topic !!!!',
                showConfirmButton: false,
                timer: 1500
            })
        } else if (editPostTitle === "") {
            Swal.fire({
                icon: 'error',
                title: 'Please enter title !!!!',
                showConfirmButton: false,
                timer: 1500
            })
        } else if (editPostContent === "") {
            Swal.fire({
                icon: 'error',
                title: 'Please enter content name !!!!',
                showConfirmButton: false,
                timer: 1500
            })
        } else {
            PostService.editPost(Number(topicId), updatedPost).then(res => {
                if (res.data.status === 401) {
                    alert("session expired");
                    navigate("/")
                }
            })
            Swal.fire({
                icon: 'success',
                title: 'Post edited !!!!',
                showConfirmButton: false,
                timer: 1500
            })
            navigate(-1);
        }
    }

    useEffect(() => {
        setLoading(true);
        const ourRequest = axios.CancelToken.source();
        setTimeout(async () => {
            await PostService.getPost(String(id), ourRequest).then(res => {
                if (res.data.status === 401) {
                    alert("session expired");
                    navigate("/")
                }
                setTopicId(res.data.topic.id)
                setEditPostTitle(res.data.title);
                setEditPostContent(res.data.content);
            })
            setLoading(false);
            return () => {
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