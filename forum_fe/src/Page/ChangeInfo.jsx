import React,{useState,useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import AccSV from '../Service/AccountService';
import {TailSpin} from 'react-loader-spinner';
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import Swal from 'sweetalert2'
function ChangeInfo() {
    let navigate=useNavigate();
    const[loading,setLoading]=useState(false);
    const[name,setName]=useState("");
    const[phone,setPhone]=useState("");
    const[dateOfBirth,setDateOfBirth]=useState("");
    const[email,setEmail]=useState("");
    const[pass,setPass]=useState("");
    const[repass,setRepass]=useState("");
    const [update,setUpdate] = useState(false);
    const reload=()=>{setUpdate(!update);}
    useEffect(()=>{
        setLoading(true);
        const ourRequest=axios.CancelToken.source();
        setTimeout(async() => {
            await AccSV.getAccInfo(ourRequest).then(res=>{
                if(res.data.status===401){
                    alert("session expired");
                    navigate("/")
                }
                setName(res.data.data.name);
                setPhone(res.data.data.phone);
                setEmail(res.data.data.email);
                setDateOfBirth(res.data.data.birthdate);
            })
            setLoading(false);
            return()=>{
                ourRequest.cancel('Request is canceled by user');
            }
        }, 800);
    },[update]);
    const changeName=(e)=>{
        setName(e.target.value)
    }
    const changePhone=(e)=>{
        setPhone(e.target.value)
    }
    const changeDateOfBirth=(e)=>{
        setDateOfBirth(e.target.value)
    }
    const changePass=(e)=>{
        setPass(e.target.value)
    }
    const changeRepass=(e)=>{
        setRepass(e.target.value)
    } 
    const changeInfo=()=>{
        let info={
            name: name,
            phone: phone,
            email: email,
            birthdate: dateOfBirth
        }
        console.log(JSON.stringify(info));
        AccSV.changeAccInfo(info).then(res=>{
            if(res.data.status===401){
                alert("session expired");
                navigate("/")
            }
            reload();
        })
        Swal.fire({
            position: 'middle',
            icon: 'success',
            title: 'Info changed !!!!',
            showConfirmButton: false,
            timer: 1500
        })
    }
    const changeNewPass=()=>{
        if(pass==="")
        Swal.fire({
            position: 'middle',
            icon: 'error',
            title: 'Please enter new pass !!!!',
            showConfirmButton: false,
            timer: 1500
        })
        else if(repass==="")
        Swal.fire({
            position: 'middle',
            icon: 'error',
            title: 'Please re-enter new pass !!!!',
            showConfirmButton: false,
            timer: 1500
        })
        else if(pass!==repass){
            Swal.fire({
                position: 'middle',
                icon: 'error',
                title: 'Pass does not match !!!!',
                showConfirmButton: false,
                timer: 1500
            })
            setPass("");
            setRepass("");
        } else {
            let updatedPass={
                password:pass
            }
            AccSV.changePass(updatedPass).then(res=>{
                if(res.data.status===401){
                    alert("session expired");
                    navigate("/")
                }
                console.log(res.data);
            });
            Swal.fire({
                position: 'middle',
                icon: 'success',
                title: 'Pass changed',
                showConfirmButton: false,
                timer: 1500
            })
            setPass("");
            setRepass("");
        }
    }
    return(
        <div>
            {
                            (loading===true)
                            ?<TailSpin wrapperStyle={{display:"block",position:"fixed",bottom:"5px"}} color="red" height={200} width={200} />
                            :<></>
            } 
                <table style={{width:"100%"}}>
                    <tr>  
                    </tr>
                </table>
            <div className='Container' style={{margin:"auto",width:"60%"}}>
            
            <Card style={{marginTop:"20px"}}>
                <Card.Header>
                    <div style={{color:"red",fontSize:"30px"}}>PERSONAL INFO</div>
                </Card.Header>
                <Card.Body>
                    <table style={{width:"100%"}}>
                        <tr style={{textAlign:"center"}}>
                        <td>
                            <img style={{width:"200px",height:"200px",borderRadius:"50%"}} src='https://www.w3schools.com/howto/img_avatar.png' alt=''></img>
                        </td>
                        </tr>
                        <tr>
                        <td>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Name :</Form.Label>
                                <Form.Control type="text" value={name} onChange={changeName}/>
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Phone :</Form.Label>
                                <Form.Control type="text" value={phone} onChange={changePhone}/>
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Date of birth :</Form.Label>
                                <Form.Control type="date" value={dateOfBirth} onChange={changeDateOfBirth} />
                            </Form.Group>
                            <fieldset disabled>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Email :</Form.Label>
                                    <Form.Control type="text" value={email}/>
                                </Form.Group>
                            </fieldset>
                            <Button variant="primary" onClick={changeInfo}>
                                Update
                            </Button>
                        </Form>
                        </td>
                        </tr>
                    </table>
                    
                    
                </Card.Body>
            </Card>
            <Card style={{marginTop:"20px"}}>
                <Card.Header>
                    <div style={{color:"red",fontSize:"30px"}}>CHANGE PASSWORD</div>
                </Card.Header>
                <Card.Body>
                <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>New Password :</Form.Label>
                            <Form.Control type="password" value={pass} onChange={changePass}/>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Confirm new password :</Form.Label>
                            <Form.Control type="password" value={repass} onChange={changeRepass}/>
                        </Form.Group>
                        <Button variant="primary" onClick={changeNewPass}>
                            Change
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            </div>
        </div>
    )
}
export default ChangeInfo;