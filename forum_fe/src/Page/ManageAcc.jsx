import React,{useState,useEffect} from 'react';
import Table from 'react-bootstrap/Table'
import AccountService from '../Service/AccountService';
import Button from 'react-bootstrap/Button';
function ManageAcc(){
    const [update,setUpdate] = useState(false);
    const[result,setResult]=useState([]);
    const[page,setPage]=useState(1);
    const[pages,setPages]=useState(0);
    useEffect(()=>{
        AccountService.getAllAcc(page).then(res=>{
            if(res.data.content!==null){
                setResult(res.data.content);
                setPages(res.data.totalPages)
            }
        })
    },[page,update]);
    return(
        <div>
            <h1 style={{textAlign:"center",color:"white"}}>USER LIST</h1>
            <table style={{width:"1920px",border:"none"}}>
                <td style={{width:"10%",color:"yellow"}}>

                </td>
                <td style={{width:"80%",color:"yellow"}}>
                    <Table striped bordered hover variant="dark" size="sm" style={{width:"100%",textAlign:"center"}}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Username</th>
                                <th>Birthdate</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th colSpan={3}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                result.map(
                                    acc=>
                                    <tr key={acc.id}>
                                        <td>{acc.name}</td>
                                        <td>{acc.username}</td>
                                        <td>{acc.birthdate}</td>
                                        <td>{acc.email}</td>
                                        <td>{acc.phone}</td>
                                        <td>
                                            {(acc.isblocked)?<button className="btn btn-warning">UnBlock</button>:<button className="btn btn-danger">Block</button>}
                                        </td>
                                        <td>
                                            {acc.role.rolename}
                                        </td>
                                        <td>
                                            <button className="btn btn-info">updateRole</button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </td>
                <td style={{width:"10%",color:"yellow",verticalAlign:"top"}}>

                </td>
            </table>
        </div>
    );
}
export default ManageAcc;