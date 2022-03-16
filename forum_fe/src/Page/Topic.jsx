import React from 'react';
import Header from '../Component/HeaderComponent';
function Topic() {
    return(
        <div>
            <Header/>
            <table style={{width:"1920px",border:"none"}}>
                <td style={{width:"30%",color:"yellow"}}>
                    SIDEBAR
                </td>
                <td style={{width:"70%",color:"yellow"}}>
                    MAIN
                </td>
            </table>
        </div>
    );
}


export default Topic;