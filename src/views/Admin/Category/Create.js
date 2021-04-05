import React, { useRef } from 'react';
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { notify } from 'utils/Notify';
import { setFormCategory } from '../../../redux';
import NotificationAlert from "react-notification-alert";
import { BASE_URL } from 'api';


const Create = () => {
    const localAuth = JSON.parse(localStorage.getItem('p3sAuth'));
    const dispatch = useDispatch();
    const stateCategory = useSelector(state => state.CategoryReducer);
    const history = useHistory();
    const { register, handleSubmit, errors } = useForm();
    const notificationAlertRef = useRef(null);
    // console.log(stateCategory)

    // handle form onChange
    const handleOnChange = (e) => {
        let inputType = e.target.name;
        let inputValue = e.target.value;
        dispatch(setFormCategory(inputType, inputValue))
        // dispatch to update state in reducer
    }

    // handle on form create submitted
    const handleCreate = async () => {
        dispatch(setFormCategory('isLoading', true))
        let formData = new FormData();
        delete stateCategory.isLoading;
        for (const key in stateCategory) {
            // console.log(`${key}`, stateCategory[key])
            // define form name if its a file
            // if (key === 'foto' || key === 'f_ktp' || key === 'f_cv' || key === 'f_npwp' || key === 'f_pernyataan' || key === 'f_sukes') {
            //     if (typeof stateCategory[key] === 'object') {
            //         if (stateCategory[key]) {
            //             formData.append(key, stateCategory[key], stateCategory[key].name);
            //         }
            //     }
            // }
            // else {
            //     formData.append(key, stateCategory[key]);
            // }
            formData.append(key, stateCategory[key]);
        }
        await fetch(`${BASE_URL}/admin/category`, {
            method: 'POST',
            body: formData,
            headers: { 'Authorization': `Bearer ${localAuth.access_token}` },
        })
            .then(res => res.json())
            .then((data) => {
                console.log(data)
                let notifOption = { place: 'br', message: data.meta.message, color: 'info', ref: notificationAlertRef }
                notify(notifOption)
                dispatch(setFormCategory('isLoading', false))
                // history.push('/admin/category')
            })
            .catch((err) => {
                console.log(err)
                let notifOption = { place: 'br', message: err, color: 'danger', ref: notificationAlertRef }
                // notify(notifOption)
                dispatch(setFormCategory('isLoading', false))
            })
            .finally(() => {
                dispatch(setFormCategory('isLoading', false))
            })

        // set button loading
        // send data to api
        // on finish, popup notification, and back to index page
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
                                <Card.Title as="h4">Create Category</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form onSubmit={handleSubmit(handleCreate)}>
                                    <Row>
                                        <Col className="pr-1" md="5">
                                            <Form.Group>
                                                <label>Name</label>
                                                <Form.Control
                                                    defaultValue={stateCategory.name}
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
                                        <Col className="px-1" md="3">
                                            <Form.Group>
                                                <label>Tagline</label>
                                                <Form.Control
                                                    defaultValue=""
                                                    placeholder="Tagline the category"
                                                    type="text"
                                                    name="tagline"
                                                    className={errors.tagline && 'is-invalid'}
                                                    onChange={e => handleOnChange(e)}
                                                    ref={register({ required: true })}
                                                ></Form.Control>
                                                {errors.tagline?.type === "required" &&
                                                    <span className="invalid-feedback">
                                                        <strong>Tagline is required!</strong>
                                                    </span>}
                                            </Form.Group>
                                        </Col>
                                        <Col className="pl-1" md="4">
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
                                                <label>Min Price</label>
                                                <Form.Control
                                                    defaultValue=""
                                                    placeholder="Minimum Price"
                                                    type="number"
                                                    name="min_price"
                                                    className={errors.min_price && 'is-invalid'}
                                                    onChange={e => handleOnChange(e)}
                                                    ref={register({ required: true })}
                                                ></Form.Control>
                                                {errors.prmin_pricece?.type === "required" &&
                                                    <span className="invalid-feedback">
                                                        <strong>Min Price is required!</strong>
                                                    </span>}
                                            </Form.Group>
                                        </Col>
                                        <Col className="pl-1" md="6">
                                            <Form.Group>
                                                <label>Max Price</label>
                                                <Form.Control
                                                    defaultValue=""
                                                    placeholder="Maximal price"
                                                    type="number"
                                                    name="max_price"
                                                    className={errors.max_price && 'is-invalid'}
                                                    onChange={e => handleOnChange(e)}
                                                    ref={register({ required: true })}
                                                ></Form.Control>
                                                {errors.max_price?.type === "required" &&
                                                    <span className="invalid-feedback">
                                                        <strong>Max Price is required!</strong>
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
                                    {
                                        stateCategory.isLoading ?
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
