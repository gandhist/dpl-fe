import React, { useRef } from 'react'
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { notify } from 'utils/Notify';
import { setFormProperty } from '../../../redux';
import NotificationAlert from "react-notification-alert";
import { BASE_URL } from 'api';


const Create = () => {

    const localAuth = JSON.parse(localStorage.getItem('p3sAuth'));
    const dispatch = useDispatch();
    const stateProperty = useSelector(state => state.PropertyReducer);
    console.log(stateProperty)
    const history = useHistory();
    const { register, handleSubmit, errors } = useForm();
    const notificationAlertRef = useRef(null);
    console.log(errors)
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

    // handle on form create submitted
    const handleCreate = async () => {
        dispatch(setFormProperty('isLoading', true))
        let formData = new FormData();
        delete stateProperty.isLoading;
        for (const key in stateProperty) {
            console.log(`${key}`, stateProperty[key])
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
            // formData.append(key, stateProperty[key]);
        }
        await fetch(`${BASE_URL}/admin/property`, {
            method: 'POST',
            body: formData,
            headers: { 'Authorization': `Bearer ${localAuth.access_token}` },
        })
            .then(res => res.json())
            .then((data) => {
                console.log(data)
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
                                <Card.Title as="h4">Create Property</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form onSubmit={handleSubmit(handleCreate)}>
                                    <Row>
                                        <Col className="pr-1" md="6">
                                            <Form.Group>
                                                <label>Name</label>
                                                <Form.Control
                                                    defaultValue={stateProperty.name}
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
                                                    defaultValue=""
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
                                                    defaultValue=""
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
                                                    defaultValue=""
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
                                                <Form.Control
                                                    defaultValue=""
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

export default Create
