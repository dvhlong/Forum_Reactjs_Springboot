import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import PostService from '../Service/PostService';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import yesIcon from '../SVG/yes.svg';
import noIcon from '../SVG/no.svg';
import { TailSpin } from 'react-loader-spinner';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import parse from "html-react-parser";
import Swal from 'sweetalert2';
import SideComponent from '../Component/SideComponent';
import { motion } from "framer-motion";
import dayjs from "dayjs";

function ApprovePosts() {

    const relativeTime = require('dayjs/plugin/relativeTime');

    dayjs.extend(relativeTime);

    let navigate = useNavigate();

    const [mount, setMount] = useState(false);

    const [loading, setLoading] = useState(false);

    const [update, setUpdate] = useState(false);

    const reload = () => { setUpdate(!update); }

    const [result, setResult] = useState([]);

    const [page, setPage] = useState(1);

    const [pages, setPages] = useState(0);

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

    const approvePost = (id) => {
        PostService.approvePost(id).then(res => {
            if (res.data.status === 401) {
                alert("session expired");
                navigate("/");
            }
            console.log(res.data)
            reload();
        })
        Swal.fire({
            icon: 'success',
            title: 'Approved !!!!',
            showConfirmButton: false,
            timer: 1500
        })
    }

    const rejectPost = (id) => {
        PostService.rejectPost(id).then(res => {
            if (res.data.status === 401) {
                alert("session expired");
                navigate("/")
            }
            console.log(res.data)
            reload()
        })
        Swal.fire({
            icon: 'success',
            title: 'Reject !!!!',
            showConfirmButton: false,
            timer: 1500
        })
    }

    useEffect(() => {
        setLoading(true);
        const ourRequest = axios.CancelToken.source();
        setTimeout(async () => {
            await PostService.getPostsNotApprove(page, ourRequest).then(res => {
                if (res.data.status === 401) {
                    alert("session expired");
                    navigate("/")
                }
                if (res.data.content !== null) {
                    // console.log(res.data.content);
                    setResult(res.data.content);
                    setPages(res.data.totalPages)
                }
            })
            setLoading(false);
            if (mount === false)
                setMount(true);
            return () => {
                ourRequest.cancel('Request is canceled by user');
            }
        }, 800);
    }, [page, update]);

    return (
        <div>
            <div>
                {/* <Header/> */}
                {/* <h1 style={{textAlign:"center",color:"white"}}>APPROVE POST</h1> */}
                <table style={{ width: "100%", border: "none", marginTop: "30px" }}>
                    <td style={{ width: "30%", color: "yellow", verticalAlign: "top" }}>
                        <table style={{ width: "100%", textAlign: "center" }}>
                            <tr>
                                {
                                    (loading === true)
                                        ? <td style={{ textAlign: "right" }}>
                                            <TailSpin wrapperStyle={{ display: "block", position: "fixed", bottom: "5px" }} color="red" height={200} width={200} />
                                        </td> : <></>
                                }
                            </tr>
                            <tr>
                                <td><SideComponent /></td>
                            </tr>
                        </table>
                    </td>
                    <td style={{ width: "60%" }}>
                        {
                            (mount === false)
                                ?
                                <></>
                                : <div>
                                    {
                                        (result.length === 0)
                                            ? <h2 style={{ textAlign: "center" }}>No posts to approve yet</h2>
                                            : <motion.table style={{ width: "100%" }}
                                                animate={{
                                                    opacity: [0, 1],
                                                    translateY: [80, 0],
                                                }}
                                            >
                                                <tbody>
                                                    {
                                                        result.map(
                                                            post =>
                                                                <tr key={post.id}>
                                                                    <td>
                                                                        <Card style={{ marginBottom: "20px" }}>
                                                                            <Card.Header style={{ color: "blue" }}>
                                                                                <p>
                                                                                    {dayjs(post.created_at).locale("en").fromNow()}
                                                                                    &nbsp;
                                                                                    {dayjs(post.created_at).format('(DD/MM/YYYY [at] HH:mm)')}
                                                                                </p>
                                                                                <p>Account created: <img style={{ width: "50px", height: "50px", borderRadius: "50px" }} src={"http://" + window.location.hostname + ":8080/files/" + post.created_acc.avatar} alt=''></img>
                                                                                    &nbsp;<b>{post.created_acc.username}</b>
                                                                                    &nbsp;<img style={{ width: "20px", height: "20px" }} src={"http://" + window.location.hostname + ":8080/files/" + post.created_acc.role.rolename + "Logo.png"} alt=''></img>
                                                                                </p>
                                                                                <p>Topic: {post.topic.topicname}</p>
                                                                            </Card.Header>
                                                                            <Card.Body>
                                                                                <Card.Title style={{ color: "red" }}>{post.title}</Card.Title>
                                                                                <Card.Text style={{ color: "black" }}>
                                                                                    <div>{parse(post.content)}</div>
                                                                                </Card.Text>
                                                                            </Card.Body>
                                                                        </Card>
                                                                    </td>
                                                                    <td style={{ verticalAlign: "top" }}>
                                                                        <ButtonGroup aria-label="Basic example">
                                                                            <Button variant="success" onClick={() => approvePost(post.id)}><img src={yesIcon} alt="" /></Button>
                                                                            <Button variant="danger" onClick={() => rejectPost(post.id)}><img src={noIcon} alt="" /></Button>
                                                                        </ButtonGroup>
                                                                    </td>
                                                                </tr>
                                                        )
                                                    }
                                                    <tr>
                                                        <ButtonGroup aria-label="Basic example">
                                                            <Button variant="secondary" onClick={prevPage}>{"<<<"} Previous Page</Button>
                                                            <Button variant="secondary" onClick={nextPage}>Next Page {">>>"}</Button>
                                                        </ButtonGroup>
                                                        <label style={{ marginLeft: "30px" }}>Page:</label><input min={1} max={pages} type="number" style={{ width: "50px", marginLeft: "10px" }} value={page} onChange={changePage} />
                                                    </tr>
                                                </tbody>
                                            </motion.table>
                                    }
                                </div>

                        }
                    </td>
                    <td style={{ width: "10%", color: "yellow", verticalAlign: "top" }}>
                    </td>

                </table>
            </div>
        </div>
    )
}
export default ApprovePosts;
