import React, { useRef, useEffect } from 'react'
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { notify } from 'utils/Notify';
import { setFormProperty, setisLoading } from '../../../redux';

import NotificationAlert from "react-notification-alert";
import { BASE_URL } from 'api';

const Edit = () => {
    const { id } = useParams();
    const localAuth = JSON.parse(localStorage.getItem('p3sAuth'));
    const dispatch = useDispatch();
    const stateProperty = useSelector(state => state.PropertyReducer);
    const history = useHistory();
    const { register, handleSubmit, errors } = useForm();
    const notificationAlertRef = useRef(null);

    // handle form onChange
    const handleOnChange = (e) => {
        let type = e.target.type;
        let inputType = e.target.name;
        let inputValue = e.target.value;
        if (type === 'file') {
            inputValue = e.target.files[0];
        }
        dispatch(setFormProperty(inputType, inputValue))
        // dispatch to update state in reducer
    }

    // get data property by id
    const getData = async () => {
        await fetch(`${BASE_URL}/admin/property/${id}`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${localAuth.access_token}` }
        })
            .then(res => res.json())
            .then((data) => {
                const dt = data.data;
                for (const key in dt) {
                    // console.log(key)
                    dispatch(setFormProperty(key, dt[key]))
                }
                dispatch(setisLoading(false))
            })
            .catch((err) => {
                console.log(err)
                dispatch(setisLoading(false))
            })
    }

    // handle on form create submitted
    const handleCreate = async () => {
        dispatch(setFormProperty('isLoading', true))
        let formData = new FormData();
        delete stateProperty.isLoading;
        for (const key in stateProperty) {
            // define form name if its a file
            if (key === 'images') {
                if (typeof stateProperty[key] === 'object') {
                    if (stateProperty[key]) {
                        formData.append(key, stateProperty[key], stateProperty[key].name);
                    }
                }
            }
            else {
                formData.append(key, stateProperty[key]);
            }
        }
        formData.append('_method', 'PATCH');
        await fetch(`${BASE_URL}/admin/property/${id}`, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json', 'Authorization': `Bearer ${localAuth.access_token}` },
        })
            .then(res => res.json())
            .then((data) => {
                let notifOption = { place: 'br', message: data.meta.message, color: 'info', ref: notificationAlertRef }
                notify(notifOption)
                dispatch(setFormProperty('isLoading', false))
                // history.push('/admin/category')
            })
            .catch((err) => {
                console.log(err)
                let notifOption = { place: 'br', message: err, color: 'danger', ref: notificationAlertRef }
                // notify(notifOption)
                dispatch(setFormProperty('isLoading', false))
            })
            .finally(() => {
                dispatch(setFormProperty('isLoading', false))
            })
    }

    useEffect(() => {
        getData()
    }, [id])

    return (
        <>
            <div className="rna-container">
                <NotificationAlert ref={notificationAlertRef} />
            </div>
            <Container fluid>
                <Row>
                    <Col md="12">
                        <Card>
                            <Card.Header>
                                <Card.Title as="h4">Edit Property </Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form onSubmit={handleSubmit(handleCreate)}>
                                    <Row>
                                        <Col className="pr-1" md="6">
                                            <Form.Group>
                                                <label>Name</label>
                                                <Form.Control
                                                    value={stateProperty.name ?? ''}
                                                    placeholder="Name"
                                                    name="name"
                                                    type="text"
                                                    className={errors.name && 'is-invalid'}
                                                    onChange={e => handleOnChange(e)}
                                                    ref={register({ required: true })}
                                                ></Form.Control>
                                                {errors.name?.type === "required" &&
                                                    <span className="invalid-feedback">
                                                        <strong>Category name is required!</strong>
                                                    </span>}
                                            </Form.Group>
                                        </Col>
                                        <Col className="pl-1" md="6">
                                            <Form.Group>
                                                <label htmlFor="exampleInputEmail1">
                                                    Price
                                                </label>
                                                <Form.Control
                                                    value={stateProperty.price ?? ''}
                                                    placeholder="Price"
                                                    type="number"
                                                    name="price"
                                                    className={errors.price && 'is-invalid'}
                                                    onChange={e => handleOnChange(e)}
                                                    ref={register({ required: true })}
                                                ></Form.Control>
                                                {errors.price?.type === "required" &&
                                                    <span className="invalid-feedback">
                                                        <strong>Price is required!</strong>
                                                    </span>}
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="pr-1" md="6">
                                            <Form.Group>
                                                <label>Video Referensi</label>
                                                <Form.Control
                                                    value={stateProperty.video_ref ?? ''}
                                                    placeholder="Link Preview Property"
                                                    type="text"
                                                    name="video_ref"
                                                    onChange={e => handleOnChange(e)}
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col className="pl-1" md="6">
                                            <Form.Group>
                                                <label>Uom</label>
                                                <Form.Control
                                                    value={stateProperty.uom ?? ''}
                                                    placeholder="Unit of Measurment"
                                                    type="text"
                                                    name="uom"
                                                    className={errors.uom && 'is-invalid'}
                                                    onChange={e => handleOnChange(e)}
                                                    ref={register({ required: true })}
                                                ></Form.Control>
                                                {errors.uom?.type === "required" &&
                                                    <span className="invalid-feedback">
                                                        <strong>UOM is required!</strong>
                                                    </span>}
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="12">
                                            <Form.Group>
                                                <label>Description</label>
                                                <Form.Control
                                                    cols="80"
                                                    value={stateProperty.desc ?? ''}
                                                    placeholder="Here can be your description"
                                                    rows="4"
                                                    name="desc"
                                                    as="textarea"
                                                    onChange={e => handleOnChange(e)}
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="pr-1" md="6">
                                            <Form.Group>
                                                <label>Images</label>
                                                {
                                                    stateProperty.images != null ? 
                                                    <a target="_blank" href={`http://127.0.0.1:5500/${stateProperty.images}`} className="btn btn-success btn-xs" >View</a>
                                                    : ''
                                                }
                                                <Form.Control
                                                    value=""
                                                    placeholder="Tagline the category"
                                                    type="file"
                                                    name="images"
                                                    className={errors.images && 'is-invalid'}
                                                    onChange={e => handleOnChange(e)}
                                                    ref={register({ required: true })}
                                                ></Form.Control>
                                                {errors.images?.type === "required" &&
                                                    <span className="invalid-feedback">
                                                        <strong>Images is required!</strong>
                                                    </span>}
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    {
                                        stateProperty.isLoading ?
                                            <button className="btn btn-info" type="button">
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...
                                            </button>
                                            :
                                            <Button
                                                className="btn-fill pull-right"
                                                type="submit"
                                                variant="info"
                                            >
                                                Save
                                        </Button>
                                    }

                                    <div className="clearfix"></div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Edit
