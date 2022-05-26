import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import axios from "axios";
import statisticService from '../Service/StatisticService';
import { useNavigate } from 'react-router-dom';
import ChartIcon from '../SVG/chart.svg';

function SidebarComponent() {

    let navigate = useNavigate();

    const [statistic, setStatistic] = useState({
        postQuantity: 0,
        memberQuantity: 0,
        newMember: {
            username: ''
        }
    });

    useEffect(() => {
        const ourRequest = axios.CancelToken.source();
        statisticService.getStatistic(ourRequest).then(res => {
            if (res.data.status === 401) {
                alert("session expired");
                navigate("/")
            }
            setStatistic(res.data.data);
        })
        return () => {
            ourRequest.cancel('Request is canceled by user');
        }
    }, [])

    return (
        <Card className='side-card'>
            {/* <Card.Header className='side-header'>
                <img src={ChartIcon} alt=''/>&nbsp;STATISTIC
            </Card.Header> */}
            <Card.Body className='side-body'>
                <p><b className='red'>Post quantity: </b><b>{statistic.postQuantity}</b></p>
                <p><b className='red'>Member quantity: </b><b>{statistic.memberQuantity}</b></p>
                <p><b className='red'>Newest member: </b><img src={"http://" + window.location.hostname + ":8080/files/" + statistic.newMember.avatar} alt="" style={{ width: "30px", height: "30px", borderRadius: "50%" }}></img> <b>{statistic.newMember.username}</b></p>
            </Card.Body>
        </Card>
    )
}

export default SidebarComponent;