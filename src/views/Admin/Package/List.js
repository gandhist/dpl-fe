import React, { useEffect, useState } from 'react'
import { setisLoading } from '../../../redux/action';
import { useDispatch } from "react-redux";
import { BASE_URL } from 'api';
import {
    Button,
    Card,
    Form,
    Modal,
    Container,
    Row,
    Col,
    Table
} from "react-bootstrap";
import { FaTrashAlt, FaPencilAlt, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";


const ModalDelete = ({ showModal, id, name, onHide, onConfirm }) => {
    return (
        <>
            {/* Mini Modal */}
            <Modal
                className="modal-mini modal-primary"
                show={showModal}
                onHide={onHide}
            >
                <Modal.Header className="justify-content-center">
                    <div className="modal-profile">
                        <i className="nc-icon nc-bulb-63"></i>
                    </div>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <p>Delete Property {name}?</p>
                </Modal.Body>
                <div className="modal-footer">
                    <Button
                        className="btn-simple"
                        type="button"
                        variant="link"
                        onClick={onHide}
                    >
                        Back
            </Button>
                    <Button
                        className="btn-simple"
                        type="button"
                        variant="warning"
                        onClick={onConfirm}
                    >
                        Delete!
            </Button>
                </div>
            </Modal>
            {/* End Modal */}
        </>
    )
}



const List = () => {

    const dispatch = useDispatch();
    const [listPackage, setlistPackage] = useState([])
    const [showModal, setShowModal] = useState({ show: false, id: null, name: null })
    const localAuth = JSON.parse(localStorage.getItem('p3sAuth'));


    const geListPackage = async () => {
        await fetch(`${BASE_URL}/admin/package`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${localAuth.access_token}` }
        })
            .then(res => res.json())
            .then((data) => {
                console.log(data)
                setlistPackage(data.data)
                dispatch(setisLoading(false))
            })
            .catch((err) => {
                console.log(err)
                dispatch(setisLoading(false))
            })
    }


    useEffect(() => {
        geListPackage();
        dispatch(setisLoading(false))
    }, [])
    return (
        <div>
            <Container fluid>
                <Row>
                    <Col md="12">
                        <Card className="strpied-tabled-with-hover">
                            <Card.Header>
                                <Card.Title as="h4">Data Packages</Card.Title>
                                <Link to="/admin/package/create" className="btn btn-primary btn-sm">Tambah</Link>
                            </Card.Header>
                            <Card.Body className="table-full-width table-responsive px-0">
                                <Table className="table-hover table-striped">
                                    <thead>
                                        <tr>
                                            <th className="border-0">No</th>
                                            <th className="border-0">Action</th>
                                            <th className="border-0">Name</th>
                                            <th className="border-0">Price</th>
                                            <th className="border-0">Images</th>
                                            <th className="border-0">Category</th>
                                            <th className="border-0">Desc</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            listPackage &&
                                            listPackage.map((el, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td>{i + 1}</td>
                                                        <td>
                                                            <Link to={`/admin/package/edit/${el.id}`} className="btn btn-success btn-xs"><FaPencilAlt /></Link>
                                                            <button onClick={() => {
                                                                setShowModal({ show: true, id: el.id, name: el.name })
                                                            }} type="button" className="btn btn-info btn-xs"><FaEye /></button>
                                                            <button onClick={() => {
                                                                setShowModal({ show: true, id: el.id, name: el.name })
                                                            }} type="button" className="btn btn-danger btn-xs"><FaTrashAlt /></button>
                                                        </td>
                                                        <td>{el.name}</td>
                                                        <td>{el.price}</td>
                                                        <td>
                                                            <img src={`http://127.0.0.1:5500/${el.images}`} height='100' width='100' className="rounded img-thumbnail mx-auto d-block" alt={el.name} />
                                                        </td>
                                                        <td>
                                                        {el.categories_r.name}
                                                        </td>
                                                        <td>{el.desc}</td>
                                                    </tr>
                                                )
                                            })
                                        }

                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <ModalDelete showModal={showModal.show} id={showModal.id} name={showModal.name} onHide={() => setShowModal(false)} onConfirm={() => { deletePackage(showModal.id) }} />
        </div>
    )
}

export default List
