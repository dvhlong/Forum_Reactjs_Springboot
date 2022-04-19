import React,{useState,useEffect} from 'react';
import Table from 'react-bootstrap/Table'
import AccountService from '../Service/AccountService';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
function ManageAcc(){
    const [update,setUpdate] = useState(false);
    const reload=()=>{setUpdate(!update);}
    const[result,setResult]=useState([]);
    const[page,setPage]=useState(1);
    const[pages,setPages]=useState(0);
    const changePage=(e)=>{
        if(e.target.valueAsNumber>=1)
        setPage(e.target.valueAsNumber);
    }
    const block=(id)=>{
        AccountService.block(id).then(res=>{
            reload();
        })
    }
    const setRoleToMod=(id)=>{
        let role={
            rolename:"mod"
        }
        AccountService.chagneRole(id,role).then(res=>{
            reload();
        })
    }
    const setRoleToUser=(id)=>{
        let role={
            rolename:"user"
        }
        AccountService.chagneRole(id,role).then(res=>{
            reload();
        })
    }
    const nextPage=()=>{
        if(page<pages)
        setPage(page+1);
    }
    const prevPage=()=>{
        if(page>1)
        setPage(page-1);
    }
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
                    <Table striped hover variant="dark" size="sm" style={{width:"100%",textAlign:"center"}}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Username</th>
                                <th>Birthdate</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Action</th>
                                <th>Role</th>
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
                                            {(acc.isblocked)?<button className="btn btn-warning" onClick={()=>block(acc.id)}>UnBlock</button>:<button className="btn btn-danger" onClick={()=>block(acc.id)}>Block</button>}
                                        </td>
                                        <td>
                                            {(acc.role.rolename==="mod")?<Button className="btn btn-primary" active disabled>Mod</Button>:<Button className="btn btn-primary" onClick={()=>setRoleToMod(acc.id)}>Mod</Button>}
                                            {(acc.role.rolename==="user")?<Button style={{marginLeft:"20px"}} className="btn btn-primary" active disabled>User</Button>:<Button style={{marginLeft:"20px"}} className="btn btn-primary" onClick={()=>setRoleToUser(acc.id)}>User</Button>}
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                        <tfoot>
                            <tr>
                                <ButtonGroup aria-label="Basic example">
                                    <Button variant="secondary"onClick={prevPage}>{"<<<"} Previous Page</Button>
                                    <Button variant="secondary"onClick={nextPage}>Next Page {">>>"}</Button>
                                </ButtonGroup>
                                <label style={{marginLeft:"30px"}}>Page:</label><input min={1} max={pages} type="number" style={{width:"50px",marginLeft:"10px",background:"white"}} value={page} onChange={changePage}/>
                            </tr>
                        </tfoot>
                    </Table>
                </td>
                <td style={{width:"10%",color:"yellow",verticalAlign:"top"}}>

                </td>
            </table>
        </div>
    );
}
export default ManageAcc;