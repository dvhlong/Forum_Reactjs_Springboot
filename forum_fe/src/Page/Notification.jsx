import React, { useCallback,useState } from 'react';
import Card from 'react-bootstrap/Card';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import {TailSpin} from 'react-loader-spinner';
import '../CSS/Notification.css';
import Dropdown from 'react-bootstrap/Dropdown';
import {Link, useNavigate} from 'react-router-dom';
import { motion } from "framer-motion"

function Notification(){
    let navigate=useNavigate();

    const[loading,setLoading]=useState(false);
    
    return(
        <div>
            <h1 style={{textAlign:"center",color:"white"}}>NOTIFICATION</h1>
            <table style={{width:"100%",border:"none"}}>
                <td style={{width:"30%",color:"yellow",verticalAlign:"top"}}>
                    <table style={{width:"100%",textAlign:"center"}}>
                            <tr>
                                {
                                    (loading===true)
                                    ?<td>
                                        <TailSpin wrapperStyle={{display:"block",position:"fixed",bottom:"5px"}} color="red" height={200} width={200} />
                                    </td>:<></>
                                }    
                            </tr>
                    </table>
                </td>
                <td style={{width:"40%"}}>
                    <motion.div className='notifications'
                        animate={{
                            opacity:[0,1],
                            translateY:[80,0],
                        }}
                    >
                        <div className='notification' onClick={()=>navigate("/postDetail/13")}>
                            <div className='notification-avatar'>
                                <img style={{width:"50px",height:"50px",borderRadius:"50%"}} src='https://www.w3schools.com/howto/img_avatar.png' alt=''></img>
                            </div>
                            <div className='notification-content'>
                                <div className='notification-text'>
                                    <label><b>@dvhl</b> commented to your post</label>
                                </div>
                                <div className='notification-time'>
                                    2 days ago
                                </div>
                            </div>
                            <div className='notification-mark'>
                            </div>
                        </div>
                        <div className='notification'>
                            <div className='notification-avatar'>
                                <img style={{width:"50px",height:"50px",borderRadius:"50%"}} src='https://www.w3schools.com/howto/img_avatar.png' alt=''></img>
                            </div>
                            <div className='notification-content'>
                                <div className='notification-text'>
                                    <label><b>@admin</b> replied your comment</label>
                                </div>
                                <div className='notification-time'>
                                    1 months ago
                                </div>
                            </div>
                            <div className='notification-mark'>
                            </div>
                        </div>
                        <div className='notification'>
                            <div className='notification-avatar'>
                                <img style={{width:"50px",height:"50px",borderRadius:"50%"}} src='https://www.w3schools.com/howto/img_avatar.png' alt=''></img>
                            </div>
                            <div className='notification-content'>
                                <div className='notification-text'>
                                    <label><b>@admin</b> replied your comment</label>
                                </div>
                                <div className='notification-time'>
                                    1 months ago
                                </div>
                            </div>
                            <div className='notification-mark'>
                            </div>
                        </div>
                        <div className='notification'>
                            <div className='notification-avatar'>
                                <img style={{width:"50px",height:"50px",borderRadius:"50%"}} src='https://www.w3schools.com/howto/img_avatar.png' alt=''></img>
                            </div>
                            <div className='notification-content'>
                                <div className='notification-text'>
                                    <label><b>@admin</b> replied your comment</label>
                                </div>
                                <div className='notification-time'>
                                    1 months ago
                                </div>
                            </div>
                            <div className='notification-mark'>
                            </div>
                        </div>
                        <div className='notification'>
                            <div className='notification-avatar'>
                                <img style={{width:"50px",height:"50px",borderRadius:"50%"}} src='https://www.w3schools.com/howto/img_avatar.png' alt=''></img>
                            </div>
                            <div className='notification-content'>
                                <div className='notification-text'>
                                    <label><b>@admin</b> replied your comment</label>
                                </div>
                                <div className='notification-time'>
                                    1 months ago
                                </div>
                            </div>
                            <div className='notification-mark'>
                                {/* <Dropdown>
                                        <Dropdown.Toggle style={{backgroundColor:"white",border:"none"}}>
                                            <img src={GreenDot} alt="logo"/>
                                        </Dropdown.Toggle>
                                    <Dropdown.Menu variant='dark'>
                                    </Dropdown.Menu>
                                </Dropdown> */}
                            </div>
                        </div>
                    </motion.div>                    
                </td>
                <td style={{width:"30%",verticalAlign:"top"}}>

                </td>
            </table>
        </div>
    )
}
export default Notification;