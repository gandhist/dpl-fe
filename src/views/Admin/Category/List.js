import { BASE_URL } from 'api';
import React, { useEffect, useState } from 'react'
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
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setisLoading } from "../../../redux/action";


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
                    <p>Delete Category {name}?</p>
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

    const localAuth = JSON.parse(localStorage.getItem('p3sAuth'));
    const dispatch = useDispatch();
    const [lists, setLists] = useState([])
    const [showModal, setShowModal] = useState({ show: false, id: null, name: null })

    const getListCategory = async () => {
        await fetch(`${BASE_URL}/admin/category`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${localAuth.access_token}` }
        })
            .then(res => res.json())
            .then((data) => {
                setLists(data.data)
                dispatch(setisLoading(false))
            })
            .catch((err) => {
                console.log(err)
                dispatch(setisLoading(false))
            })
    }

    // handle on delete category
    const deleteCategory = async (id) => {
        await fetch(`${BASE_URL}/admin/category/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${localAuth.access_token}` }
        })
            .then(res => res.json())
            .then((data) => {
                // console.log(data)
                getListCategory();
                setShowModal(false)
            })
            .catch((err) => {
                console.error('error delete: ', err)
            })
    }

    useEffect(() => {
        getListCategory();
    }, [])


    return (
        <div>
            <Container fluid>
                <Row>
                    <Col md="12">
                        <Card className="strpied-tabled-with-hover">
                            <Card.Header>
                                <Card.Title as="h4">Data Category</Card.Title>
                                <Link to="/admin/category/create" className="btn btn-primary btn-sm">Tambah</Link>
                            </Card.Header>
                            <Card.Body className="table-full-width table-responsive px-0">
                                <Table className="table-hover table-striped">
                                    <thead>
                                        <tr>
                                            <th className="border-0">No</th>
                                            <th className="border-0">Action</th>
                                            <th className="border-0">Name</th>
                                            <th className="border-0">Tagline</th>
                                            <th className="border-0">Price</th>
                                            <th className="border-0">Min Price</th>
                                            <th className="border-0">Max Price</th>
                                            <th className="border-0">Desc</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            lists &&
                                            lists.map((el, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td>{i + 1}</td>
                                                        <td>
                                                            <Link to={`/admin/category/edit/${el.id}`} className="btn btn-success btn-xs"><FaPencilAlt /></Link>
                                                            <button onClick={() => {
                                                                setShowModal({ show: true, id: el.id, name: el.name })
                                                            }} type="button" className="btn btn-danger btn-xs"><FaTrashAlt /></button>
                                                        </td>
                                                        <td>{el.name}</td>
                                                        <td>{el.tagline}</td>
                                                        <td>{el.price}</td>
                                                        <td>{el.min_price}</td>
                                                        <td>{el.max_price}</td>
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
            <ModalDelete showModal={showModal.show} id={showModal.id} name={showModal.name} onHide={() => setShowModal(false)} onConfirm={() => { deleteCategory(showModal.id) }} />
        </div>
    )
}

export default List
