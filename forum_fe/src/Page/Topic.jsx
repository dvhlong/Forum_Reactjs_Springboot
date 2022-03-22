import React from 'react';
import Header from '../Component/HeaderComponent';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import TopicService from '../Service/TopicService';
import { useEffect } from 'react';
function Topic() {
    const[result,setResult]=useState([]);
    const[page,setPage]=useState(1);
    const[pages,setPages]=useState(0);
    useEffect(()=>{
        TopicService.getAllTopic(page).then(res=>{
            if(res.data.content!==null){
                console.log(res.data.content);
                setResult(res.data.content);
                setPages(res.data.totalPages)
            } else {
                setResult("No topic is created")
            }
        });
    });
    return(
        <div>
            <Header/>
            <table style={{width:"1920px",border:"none"}}>
                <td style={{width:"30%",color:"yellow"}}>
                    {localStorage.getItem("username")}
                </td>
                <td style={{width:"70%",color:"yellow"}}>
                    {localStorage.getItem("token")}
                </td>
            </table>
        </div>
    );
}


export default Topic;