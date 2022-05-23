import { useEffect, useState } from "react";
import dayjs from "dayjs";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import PostService from '../Service/PostService';
import Swal from 'sweetalert2';
import moreIcon from '../SVG/more.svg';
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';

function CommentComponent(props) {

    const relativeTime = require('dayjs/plugin/relativeTime');

    dayjs.extend(relativeTime);

    const role = localStorage.getItem("role");

    const accid = localStorage.getItem("accid");

    const [post, setPost] = useState();

    const [comment, setComment] = useState();

    const [isEdit, setIsEdit] = useState(false);

    const [editCommentContent, setEditCommentContent] = useState("");

    const [isReply, setIsReply] = useState(false);

    const [newComment, setNewComment] = useState("");

    const [deleteCommentModal, setDeleteCommentModal] = useState(false);

    const changeNewComment = (e) => setNewComment(e.target.value);

    const showEditComment = () => {
        setIsEdit(true);
    }

    const cancelEditComment = () => setIsEdit(false);

    const changeEditComment = (e) => setEditCommentContent(e.target.value)

    const submitEditComment = (id) => {
        let comment = {
            content: editCommentContent
        }
        // if (editCommentContent !== "") {
        //     PostService.editComment(id, comment).then(res => {
        //         setIsEdit(false);
        //         Swal.fire({
        //             icon: 'success',
        //             title: 'Comment Changed !!!!',
        //             showConfirmButton: false,
        //             timer: 1500
        //         })
        //     })
        // }
        console.log(editCommentContent);
    }

    const replyComment = () => {
        setIsReply(true);
    }

    const cancelReply = () => {
        setIsReply(false);
    }

    const handleShowDeleteCommentModal = () => {
        setDeleteCommentModal(true);
    }

    const handleCloseDeleteCommentModal = () => {
        setDeleteCommentModal(false);
    }

    const deleteComment = (id) => {
        // PostService.deleteComment(id).then(res => {
        //     Swal.fire({
        //         icon: 'success',
        //         title: 'Comment deleted !!!!',
        //         showConfirmButton: false,
        //         timer: 1500
        //     })
        //     // reload();
        // })
        console.log("comment deleted")
        handleCloseDeleteCommentModal();
    }

    useEffect(() => {
        setComment(props.comment);
        setPost(props.post);
    })

    const addComment = (postid, replyid) => {
        let comment = {
            content: newComment
        }
        // if (newComment !== "") {
        //     PostService.addComment(postid, replyid, comment).then(res => {
        //         // if (page !== 1)
        //         //     setPage(1);
        //         // else
        //         //     reload();
        //     })
        //     setIsReply(false);
        //     setNewComment("");
        // }
        console.log("comment replied")
    }

    return (
        <table style={{ width: "100%" }}>
            <tr>
                <td>
                    <Card style={{ marginBottom: "20px", marginTop: "30px" }}>
                        <Card.Header style={{ color: "blue" }}>
                            <img style={{ width: "50px", height: "50px", borderRadius: "50px" }} src={comment.created_acc.avatarUrl} alt=''></img>
                            <b>&nbsp;{comment.created_acc.username}</b> ({comment.created_acc.role.rolename})
                            {
                                <>&nbsp;|&nbsp;
                                    {dayjs(comment.created_at).locale("en").fromNow()}
                                    &nbsp;
                                    {dayjs(comment.created_at).format('(DD/MM/YYYY [at] HH:mm)')}
                                </>
                            }
                        </Card.Header>
                        <Card.Body>
                            {
                                (comment.replied_cmt !== null)
                                    ? <>
                                        <p style={{ color: "#DDD8D8", fontSize: "15px" }}>(Replied to <b>@{comment.replied_cmt.created_acc.username}</b>)</p>
                                        <p style={{ color: "#DDD8D8", fontSize: "15px", whiteSpace: "pre-wrap" }}>{comment.replied_cmt.content}</p>
                                    </>
                                    : <></>
                            }
                            {
                                (isEdit === true)
                                    ?
                                    <div>
                                        <Form.Control as="textarea" cols={4} value={editCommentContent} onChange={changeEditComment}></Form.Control>
                                        <Button style={{ color: "white" }} onClick={cancelEditComment}>Cancel</Button>
                                        <Button style={{ color: "white" }} onClick={()=>submitEditComment(comment.id)}>Edit</Button>
                                    </div>
                                    :
                                    <Card.Text style={{ color: "black" }}>
                                        <p style={{ whiteSpace: "pre-wrap" }}>{comment.content}</p>
                                    </Card.Text>
                            }

                        </Card.Body>
                        {
                            (isReply === true)
                                ?
                                <Card.Footer>
                                    <Form.Control as="textarea" cols={1} placeholder='Reply comment.....' onChange={changeNewComment}></Form.Control>
                                    <Button style={{ color: "white" }} onClick={() => addComment(post.id, comment.id)}>Reply</Button>
                                    <Button style={{ color: "white", marginLeft: "10px" }} onClick={cancelReply}>Cancel</Button>
                                </Card.Footer>
                                :
                                <Card.Footer>
                                    <Button style={{ color: "white" }} onClick={replyComment}>Reply</Button>
                                </Card.Footer>
                        }
                    </Card>
                </td>
                <td style={{ verticalAlign: "top" }}>
                    {
                        (role !== "user" || accid === String(comment.created_acc.id) || accid === String(post.created_acc.id))
                            ?
                            <Dropdown style={{ marginTop: "30px" }}>
                                <Dropdown.Toggle variant="dark">
                                    <img src={moreIcon} alt="logo" />
                                </Dropdown.Toggle>
                                <Dropdown.Menu variant="dark">
                                    {
                                        (accid === String(comment.created_acc.id))
                                            ?
                                            <Dropdown.Item href="#" onClick={showEditComment}>
                                                Edit Comment
                                            </Dropdown.Item>
                                            :
                                            <></>
                                    }
                                    {
                                        (role !== "user" || accid === String(comment.created_acc.id) || accid === String(post.created_acc.id))
                                            ?
                                            <Dropdown.Item href="#" onClick={handleShowDeleteCommentModal}>
                                                Delete Comment
                                            </Dropdown.Item>
                                            :
                                            <></>
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                            : <></>
                    }
                </td>
                <Modal
                    show={deleteCommentModal}
                    onHide={handleCloseDeleteCommentModal}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Comment</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        You really want to delete this comment ???
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseDeleteCommentModal}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={()=>deleteComment(comment.id)}>Delete</Button>
                    </Modal.Footer>
                </Modal>
            </tr>
        </table>
    )
}

export default CommentComponent;