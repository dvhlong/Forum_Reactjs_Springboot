import React from 'react';
import Header from '../Component/HeaderComponent';
import { useNavigate } from 'react-router-dom';
function Topic() {
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