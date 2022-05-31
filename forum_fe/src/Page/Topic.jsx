import React, { useState, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import TopicService from '../Service/TopicService';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import moreIcon from '../SVG/more.svg';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { TailSpin } from 'react-loader-spinner';
import axios from "axios";
import Swal from 'sweetalert2'
import SideComponent from '../Component/SideComponent';
import { motion } from "framer-motion";
import dayjs from "dayjs";
import add from '../SVG/add.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Topic() {

    const [reloadPageNavigated, setReloadPageNavigated] = useOutletContext();

    const relativeTime = require('dayjs/plugin/relativeTime');

    dayjs.extend(relativeTime);

    let navigate = useNavigate()

    const [mount, setMount] = useState(false);

    const [loading, setLoading] = useState(false);

    const [result, setResult] = useState([]);

    const [page, setPage] = useState(1);

    const [pages, setPages] = useState(0);

    const [update, setUpdate] = useState(false);

    const reload = () => setUpdate(!update);

    const [newTopicName, setNewTopicName] = useState("");

    const [editTopicid, setEditTopicId] = useState(0)

    const [editTopicName, setEditTopicName] = useState("")

    const [deleteTopicid, setDeleteTopicId] = useState(0);

    const [canAddTopic, setCanAddTopic] = useState(false);

    const [showEdit, setShowEdit] = useState(false);

    const handleCloseEdit = () => setShowEdit(false);

    const handleShowEdit = (topic) => {
        setEditTopicId(topic.id);
        setEditTopicName(topic.topicname);
        setShowEdit(true);
    }

    const [showAdd, setShowAdd] = useState(false);

    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => {
        setShowAdd(true);
    }

    const [showDelete, setShowDelete] = useState(false);

    const handleCloseDelete = () => setShowDelete(false);

    const handleShowDelete = (id) => {
        setDeleteTopicId(id);
        setShowDelete(true);
    }

    const enterNewTopicName = (e) => {
        setNewTopicName(e.target.value)
    }

    const enterEditTopicName = (e) => {
        setEditTopicName(e.target.value)
    }

    const addTopic = () => {
        if (newTopicName === "")
            toast.error('Please enter topic name !!!', {
                position: "top-right",
                autoClose: 5000,
            });
        else {
            let newtopic = {
                topicname: newTopicName
            }
            TopicService.addTopic(newtopic).then(res => {
                if (res.data.status === 401) {
                    Swal.fire({
                        icon: 'danger',
                        title: 'Session expired !!!!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    navigate("/")
                }
            });
            toast.success('New topic added !!!', {
                position: "top-right",
                autoClose: 5000,
            });
            handleCloseAdd();
            reload();
        }
    }

    const deleteTopic = () => {
        TopicService.deleteTopic(deleteTopicid).then(res => {
            if (res.data.status === 401) {
                Swal.fire({
                    icon: 'danger',
                    title: 'Session expired !!!!',
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate("/")
            }
            console.log(res.data.message);
        });
        Swal.fire({
            icon: 'success',
            title: 'Deleted !!!',
            showConfirmButton: false,
            timer: 2000
        })
        handleCloseDelete();
        reload();
    }

    const changeTopic = () => {
        let updatedTopic = {
            id: editTopicid,
            topicname: editTopicName
        }
        if (editTopicName === "")
            toast.error('Please enter topic name !!!', {
                position: "top-right",
                autoClose: 5000,
            });
        else {
            TopicService.editTopic(updatedTopic).then(res => {
                if (res.data.status === 401) {
                    Swal.fire({
                        icon: 'danger',
                        title: 'Session expired !!!!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    navigate("/")
                }
            });
            toast.success('Topic changed !!!', {
                position: "top-right",
                autoClose: 5000,
            });
            handleCloseEdit();
            reload()
        }
    }

    const changePage = (e) => {
        if (e.target.valueAsNumber >= 1)
            setPage(e.target.valueAsNumber);
    }

    const nextPage = () => {
        if (page < pages)
            setPage(page + 1);
    }

    const prevPage = () => {
        if (page > 1)
            setPage(page - 1);
    }

    useEffect(() => {
        setLoading(true);
        const ourRequest = axios.CancelToken.source();
        setTimeout(async () => {
            await TopicService.getAllTopic(page, ourRequest).then(res => {
                if (res.data.status === 401) {
                    Swal.fire({
                        icon: 'danger',
                        title: 'Session expired !!!!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    navigate("/")
                }
                if (res.data.content !== null) {
                    setResult(res.data.content);
                    setPages(res.data.totalPages)
                }
            });
            if (localStorage.getItem("role") !== "user")
                setCanAddTopic(true);
            setLoading(false);
            if (mount === false)
                setMount(true);
        }, 800);
        return () => {
            ourRequest.cancel('Request is canceled by user');
        }
    }, [page, reloadPageNavigated, update]);

    return (
        <div>
            <ToastContainer theme="dark" />
            <div>
                {/* <h1 style={{textAlign:"center",color:"white"}}>TOPIC</h1> */}
                <table style={{ width: "100%", border: "none", marginTop: "30px" }}>
                    <td style={{ width: "25%", verticalAlign: "top" }}>
                        <table style={{ width: "70%", textAlign: "center" }}>
                            <tr>
                                {
                                    (loading === true)
                                        ? <td>
                                            <TailSpin wrapperStyle={{ display: "block", position: "fixed", bottom: "5px" }} color="red" height={200} width={200} />
                                        </td> : <></>
                                }
                            </tr>
                            <tr>
                                <td><SideComponent /></td>
                            </tr>
                        </table>
                    </td>
                    <td style={{ width: "55%" }}>
                        {
                            (mount === false)
                                ?
                                <></>
                                : <div>
                                    {
                                        (result.length === 0)
                                            ? <h2 style={{ textAlign: "center" }}>Create first topic !!!</h2>
                                            : <motion.table style={{ width: "100%" }}
                                                animate={{
                                                    opacity: [0, 1],
                                                    translateY: [80, 0],
                                                }}
                                            >
                                                <tbody>
                                                    {
                                                        result.map(
                                                            topic =>
                                                                <motion.tr key={topic.id}>
                                                                    <td>
                                                                        <Card style={{ marginBottom: "20px" }}>
                                                                            <Card.Header style={{ color: "blue" }}>
                                                                                Time created: {dayjs(topic.created_at).format('(DD/MM/YYYY [at] HH:mm)')}
                                                                            </Card.Header>
                                                                            <Card.Body>
                                                                                <Card.Title style={{ textAlign: "center" }} className='topic-title' onClick={() => navigate(`/posts/topic=${topic.id}`)}>{topic.topicname}</Card.Title>
                                                                                <Card.Text style={{ color: "black" }}>
                                                                                </Card.Text>
                                                                            </Card.Body>
                                                                        </Card>
                                                                    </td>
                                                                    <td style={{ verticalAlign: "top", width: "10%" }}>
                                                                        {canAddTopic ?
                                                                            <Dropdown>
                                                                                <Dropdown.Toggle variant="light">
                                                                                    <img src={moreIcon} alt="logo" />
                                                                                </Dropdown.Toggle>
                                                                                <Dropdown.Menu variant='dark'>
                                                                                    <Dropdown.Item href="#" onClick={() => handleShowEdit(topic)}>
                                                                                        Edit Topic
                                                                                    </Dropdown.Item>
                                                                                    {/* <Dropdown.Item href="#" onClick={() => handleShowDelete(topic.id)}>
                                                                                        Delete Topic
                                                                                    </Dropdown.Item> */}
                                                                                </Dropdown.Menu>
                                                                            </Dropdown> : <></>
                                                                        }
                                                                    </td>
                                                                </motion.tr>
                                                        )
                                                    }

                                                    <tr>
                                                        <ButtonGroup aria-label="Basic example">
                                                            <Button variant="secondary" onClick={prevPage}>{"<<<"} Previous</Button>
                                                            <Button variant="secondary" onClick={nextPage}>Next {">>>"}</Button>
                                                        </ButtonGroup>
                                                        <label style={{ marginLeft: "30px" }}>Page:</label><input min={1} max={pages} type="number" style={{ width: "50px", marginLeft: "10px" }} value={page} onChange={changePage} />
                                                    </tr>
                                                </tbody>
                                            </motion.table>
                                    }
                                </div>

                        }
                    </td>
                    <td style={{ width: "20%", color: "yellow", verticalAlign: "top", textAlign: "center" }}>
                        {canAddTopic ? <button style={{ background: "blue", color: "white" }} onClick={handleShowAdd} className='btn btn=primary'><img src={add} alt="" /> Add Topic</button> : <></>}
                        <Modal
                            show={showEdit}
                            onHide={handleCloseEdit}
                            backdrop="static"
                            keyboard={false}
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>Change Topic</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <input style={{ width: "100%" }} value={editTopicName} onChange={enterEditTopicName} />
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseEdit}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={changeTopic}>Change</Button>
                            </Modal.Footer>
                        </Modal>
                        <Modal
                            show={showAdd}
                            onHide={handleCloseAdd}
                            backdrop="static"
                            keyboard={false}
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>Add Topic</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <label>Enter new topic name :</label>
                                <input style={{ width: "100%" }} type="text" value={newTopicName} onChange={enterNewTopicName} />
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseAdd}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={addTopic}>Add</Button>
                            </Modal.Footer>
                        </Modal>
                        <Modal
                            show={showDelete}
                            onHide={handleCloseDelete}
                            backdrop="static"
                            keyboard={false}
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>Delete Topic</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                You really want to delete this topic ???
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseDelete}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={deleteTopic}>Delete</Button>
                            </Modal.Footer>
                        </Modal>
                    </td>
                </table>
            </div>
        </div>
    );
}
export default Topic;