import React, { useEffect, useState } from 'react';

function ClockComponent() {

    const[realtime,setRealtime]=useState();

    useEffect(()=>{
        setInterval(()=>{
            const date=new Date();
            setRealtime(date.toLocaleTimeString())
        },1000)
    },[])

    return (
        <div style={{color:"white",fontSize:"30px"}}>
            {realtime}
        </div>
    );

}

export default ClockComponent;