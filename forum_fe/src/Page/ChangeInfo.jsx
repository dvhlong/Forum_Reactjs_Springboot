import React,{useState,useEffect} from 'react';
import HeaderComponent from '../Component/HeaderComponent';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
function ChangeInfo() {
    return(
        <div>
            {/* <HeaderComponent/> */}
            <div className='Container' style={{margin:"auto",width:"60%"}}>
            <Card>
                <Card.Header>
                    <div style={{color:"red",fontSize:"30px"}}>PERSONAL INFO</div>
                </Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Name :</Form.Label>
                            <Form.Control type="text"/>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Phone :</Form.Label>
                            <Form.Control type="text"/>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Date of birth :</Form.Label>
                            <Form.Control type="date"/>
                        </Form.Group>
                        <fieldset disabled>
                            <Form.Group className="mb-3" >
                                <Form.Label>Email :</Form.Label>
                                <Form.Control type="text"/>
                            </Form.Group>
                        </fieldset>
                        <Button variant="primary">
                            Update
                        </Button>
                    </Form>
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
                            <Form.Control type="text"/>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Confirm new password :</Form.Label>
                            <Form.Control type="text"/>
                        </Form.Group>
                        <Button variant="primary">
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