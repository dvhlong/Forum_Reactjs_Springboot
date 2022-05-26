import React, { useEffect, useState } from 'react';
import dayjs from "dayjs";
import { useNavigate } from 'react-router-dom';

function NotificationComponent(props) {

    const [notification, setNotification] = useState({
        post: {
            id: 0,
            title: ""
        },
        notifiedacc: {
            avatarUrl: "",
            username: "",
        },
        notifiedat: "",
        content: ""
    });

    const relativeTime = require('dayjs/plugin/relativeTime');

    dayjs.extend(relativeTime);

    let navigate = useNavigate();

    useEffect(() => {
        setNotification(props.content);
    }, [])

    return (
        <div className='notification' onClick={() => navigate(`/postDetail/${notification.post.id}`)} key={notification.id}>
            <div className='notification-avatar'>
                <img style={{ width: "50px", height: "50px", borderRadius: "50%" }} src={"http://" + window.location.hostname + ":8080/files/" + notification.notifiedacc.avatar} alt=''></img>
            </div>
            <div className='notification-content'>
                <div className='notification-text'>
                    <label><b>@{notification.notifiedacc.username}</b>
                        &nbsp;{notification.content}: <b style={{ color: "red" }}>{notification.post.title}</b></label>
                </div>
                <div className='notification-time'>
                    {dayjs(notification.notifiedat).locale("en").fromNow()}
                </div>
            </div>
            <div className='notification-mark'>
            </div>
        </div>
    )
}
export default NotificationComponent;