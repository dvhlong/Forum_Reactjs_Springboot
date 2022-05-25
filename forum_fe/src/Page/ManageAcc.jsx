import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table'
import AccountService from '../Service/AccountService';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { TailSpin } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { motion } from "framer-motion";
import dayjs from "dayjs";

function ManageAcc() {

    const relativeTime = require('dayjs/plugin/relativeTime');

    dayjs.extend(relativeTime);

    let navigate = useNavigate()

    const [mount, setMount] = useState(false);

    const [loading, setLoading] = useState(false);

    const [update, setUpdate] = useState(false);

    const reload = () => { setUpdate(!update); }

    const [result, setResult] = useState([]);

    const [page, setPage] = useState(1);

    const [pages, setPages] = useState(0);

    const changePage = (e) => {
        if (e.target.valueAsNumber >= 1)
            setPage(e.target.valueAsNumber);
    }

    const block = (id) => {
        AccountService.block(id).then(res => {
            if (res.data.status === 401) {
                alert("session expired");
                navigate("/")
            }
            reload();
        })
    }

    const setRoleToMod = (id) => {
        let role = {
            rolename: "mod"
        }
        AccountService.chagneRole(id, role).then(res => {
            if (res.data.status === 401) {
                alert("session expired");
                navigate("/")
            }
            reload();
        })
    }

    const setRoleToUser = (id) => {
        let role = {
            rolename: "user"
        }
        AccountService.chagneRole(id, role).then(res => {
            if (res.data.status === 401) {
                alert("session expired");
                navigate("/")
            }
            reload();
        })
    }

    const nextPage = () => {
        if (page < pages)
            setPage(page + 1);
    }

    const prevPage = () => {
        if (page > 1)
            setPage(page - 1);
    }

    useEffect(() => {
        setLoading(true);
        const ourRequest = axios.CancelToken.source();
        setTimeout(async () => {
            await AccountService.getAllAcc(page, ourRequest).then(res => {
                if (res.data.status === 401) {
                    alert("session expired");
                    navigate("/")
                }
                if (res.data.content !== null) {
                    setResult(res.data.content);
                    setPages(res.data.totalPages)
                }
            })
            setLoading(false);
            if (mount === false)
                setMount(true);
            return () => {
                ourRequest.cancel('Request is canceled by user');
            }
        }, 800);
    }, [page, update]);

    return (
        <div>
            {
                (mount === false)
                    ?
                    <div>
                        {/* <h1 style={{textAlign:"center",color:"white"}}>USER LIST</h1> */}
                        <TailSpin wrapperStyle={{ display: "block", position: "fixed", bottom: "5px" }} color="red" height={200} width={200} />
                    </div>
                    :
                    <div>
                        {/* <h1 style={{textAlign:"center",color:"white"}}>USER LIST</h1> */}
                        <table style={{ width: "100%", border: "none", marginTop: "30px" }}>
                            <td style={{ width: "10%", color: "yellow", verticalAlign: "top" }}>
                                <table style={{ width: "100%" }}>
                                    <tr>
                                        {
                                            (loading === true)
                                                ? <td style={{ textAlign: "right" }}>
                                                    <TailSpin wrapperStyle={{ display: "block", position: "fixed", bottom: "5px" }} color="red" height={200} width={200} />
                                                </td> : <></>
                                        }
                                    </tr>
                                </table>
                            </td>
                            <motion.td style={{ width: "80%"}}
                                animate={{
                                    opacity: [0, 1],
                                    translateY: [80, 0],
                                }}
                            >
                                <Table striped hover variant="dark" size="sm" style={{ width: "100%", textAlign: "center" }}>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Username</th>
                                            <th>Birthdate</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th colSpan={2}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            result.map(
                                                acc =>
                                                    <tr key={acc.id}>
                                                        <td>{acc.name}</td>
                                                        <td>{acc.username}</td>
                                                        <td>
                                                            {
                                                                (acc.birthdate === null)
                                                                    ? <>{acc.birthdate}</>
                                                                    : (dayjs(acc.birthdate).format('DD/MM/YYYY'))
                                                            }
                                                        </td>
                                                        <td>{acc.email}</td>
                                                        <td>{acc.phone}</td>
                                                        <td>
                                                            {(acc.isblocked) ? <button className="btn btn-warning" onClick={() => block(acc.id)}>UnBlock</button> : <button className="btn btn-danger" onClick={() => block(acc.id)}>Block</button>}
                                                            {(acc.role.rolename === "mod") ? <Button className="btn btn-primary" active disabled>Mod</Button> : <Button className="btn btn-primary" onClick={() => setRoleToMod(acc.id)}>Mod</Button>}
                                                            {(acc.role.rolename === "user") ? <Button className="btn btn-primary" active disabled>User</Button> : <Button className="btn btn-primary" onClick={() => setRoleToUser(acc.id)}>User</Button>}
                                                        </td>
                                                    </tr>
                                            )
                                        }
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <ButtonGroup aria-label="Basic example">
                                                <Button variant="secondary" onClick={prevPage}>{"<<<"} Previous Page</Button>
                                                <Button variant="secondary" onClick={nextPage}>Next Page {">>>"}</Button>
                                            </ButtonGroup>
                                            <label style={{ marginLeft: "30px" }}>Page:</label><input min={1} max={pages} type="number" style={{ width: "50px", marginLeft: "10px", background: "white" }} value={page} onChange={changePage} />
                                        </tr>
                                    </tfoot>
                                </Table>
                            </motion.td>
                            <td style={{ width: "10%", color: "yellow", verticalAlign: "top" }}>

                            </td>
                        </table>
                    </div>
            }
        </div>
    );
}
export default ManageAcc;