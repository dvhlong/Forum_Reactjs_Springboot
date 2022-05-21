import React, { useEffect, useState } from 'react';

function ClockComponent() {

    const [currentTime, setCurrentTime] = useState();

    useEffect(() => {
        setInterval(() => {
            const date = new Date();
            setCurrentTime(date.toLocaleTimeString())
        }, 1000)
    }, [])

    return (
        <div style={{ color: "white", fontSize: "30px" }}>
            {currentTime}
        </div>
    );

}

export default ClockComponent;