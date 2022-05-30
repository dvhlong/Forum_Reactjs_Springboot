import React, { useEffect, useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import { TailSpin } from 'react-loader-spinner';
import { motion } from "framer-motion"
import NotificationService from '../Service/NotificationService';
import axios from "axios";
import NotificationComponent from '../Component/NotificationComponent';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Notification() {

    const serverUrl = "https://dvhl-forum-be.herokuapp.com";

    let Sock = new SockJS(serverUrl + '/ws');

    let stompClient = over(Sock);

    const [loading, setLoading] = useState(false);

    const [mount, setMount] = useState(false);

    const [notifications, setNotifications] = useState();

    const [page, setPage] = useState(1);

    const [pages, setPages] = useState(0);

    const [update, setUpdate] = useState(false);

    const reload = () => {
        disconectSocket();
        setUpdate(!update);
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

    const connectSocket = () => {
        if (!stompClient.connected) {
            stompClient.connect({
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Access-Control-Allow-Credentials": true,
            }, onConnected, onError);
        }
    }

    const onConnected = () => {
        stompClient.subscribe(`/user/${localStorage.getItem("username")}/updateNotification/`, onUpdateNotificationMessage, { id: "notification" });
    }

    const onUpdateNotificationMessage = (payload) => {
        toast.info(payload.body, {
            position: "top-right",
            autoClose: 5000,
        });
        reload();
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
            await NotificationService.getNotifications(page, ourRequest).then(res => {
                setNotifications(res.data.content);
                setPages(res.data.totalPages)
            })
            setLoading(false);
            if (mount === false)
                setMount(true);
            return () => {
                disconectSocket();
                ourRequest.cancel('Request is canceled by user');
            }
        }, 800);
    }, [page, update])

    return (
        <div>
            <ToastContainer theme="dark" />
            <h1 style={{ textAlign: "center", color: "black" }}>NOTIFICATION</h1>
            <table style={{ width: "100%", border: "none" }}>
                <td style={{ width: "30%", color: "yellow", verticalAlign: "top" }}>
                    <table style={{ width: "100%", textAlign: "center" }}>
                        <tr>
                            {
                                (loading === true)
                                    ? <td>
                                        <TailSpin wrapperStyle={{ display: "block", position: "fixed", bottom: "5px" }} color="red" height={200} width={200} />
                                    </td>
                                    : <></>
                            }
                        </tr>
                    </table>
                </td>
                {
                    (mount === false)
                        ? <></>
                        : <td style={{ width: "40%" }}>
                            {
                                (notifications.length === 0)
                                    ? <h2 style={{ textAlign: "center", color: "black" }}>You don't have any notifications yet</h2>
                                    : <motion.div className='notifications'
                                        animate={{
                                            opacity: [0, 1],
                                            translateY: [80, 0],
                                        }}
                                    >
                                        {
                                            notifications.map(
                                                notification =>
                                                    <NotificationComponent content={notification} />
                                            )
                                        }
                                        <div>
                                            <ButtonGroup aria-label="Basic example">
                                                <Button variant="secondary" onClick={prevPage}>{"<<<"} Previous</Button>
                                                <Button variant="secondary" onClick={nextPage}>Next {">>>"}</Button>
                                            </ButtonGroup>
                                            <label style={{ marginLeft: "30px" }}>Page:</label><input min={1} max={pages} type="number" style={{ width: "50px", marginLeft: "10px" }} value={page} onChange={changePage} />
                                        </div>
                                    </motion.div>
                            }

                        </td>
                }
                <td style={{ width: "30%", verticalAlign: "top" }}>

                </td>
            </table>
        </div>
    )
}
export default Notification;