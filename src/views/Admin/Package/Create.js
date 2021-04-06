import React, { useRef, useState, useEffect } from 'react'
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { notify } from 'utils/Notify';
import { setFormPackage } from '../../../redux';
import NotificationAlert from "react-notification-alert";
import { BASE_URL } from 'api';
import Select from 'react-select';

const Create = () => {
    const localAuth = JSON.parse(localStorage.getItem('p3sAuth'));
    const dispatch = useDispatch();
    const ststatePackage = useSelector(state => state.PackageReducer);
    const history = useHistory();
    const { register, handleSubmit, errors } = useForm();
    const notificationAlertRef = useRef(null);
    const [lovCategory, setLovCategory] = useState([])
    const [lovProperties, setLovProperties] = useState([])

    // handle form onChange
    const handleOnChange = (e) => {
        let type = e.target.type;
        let inputType = e.target.name;
        let inputValue = e.target.value;
        if (type === 'file') {
            inputValue = e.target.files[0];
        }
        dispatch(setFormPackage(inputType, inputValue))
        // dispatch to update state in reducer
    }

    // handle form onChange
    const handleOnChangeProperty = (e) => {
        let inputType = e.target.name;
        let inputValue = e.target.value;
        let data = {
            id_property: inputValue
        }
        dispatch(setFormPackage(inputType, inputValue, data))
        // dispatch to update state in reducer
    }

    // handle on form create submitted
    const handleCreate = async () => {
        dispatch(setFormPackage('isLoading', true))
        let formData = new FormData();
        delete ststatePackage.isLoading;
        for (const key in ststatePackage) {
            // define form name if its a file
            if (key === 'images') {
                if (typeof ststatePackage[key] === 'object') {
                    if (ststatePackage[key]) {
                        formData.append(key, ststatePackage[key], ststatePackage[key].name);
                    }
                }
            }
            else if (typeof ststatePackage[key] === 'object') {
                formData.append(key, JSON.stringify(ststatePackage[key]));
            }
            else {
                formData.append(key, ststatePackage[key]);
            }
            // formData.append(key, ststatePackage[key]);
        }
        await fetch(`${BASE_URL}/admin/package`, {
            method: 'POST',
            body: formData,
            headers: { 'Authorization': `Bearer ${localAuth.access_token}` },
        })
            .then(res => res.json())
            .then((data) => {
                let notifOption = { place: 'br', message: data.meta.message, color: 'info', ref: notificationAlertRef }
                notify(notifOption)
                dispatch(setFormPackage('isLoading', false))
                history.push('/admin/package')
            })
            .catch((err) => {
                console.log(err)
                let notifOption = { place: 'br', message: err, color: 'danger', ref: notificationAlertRef }
                // notify(notifOption)
                dispatch(setFormPackage('isLoading', false))
            })
            .finally(() => {
                dispatch(setFormPackage('isLoading', false))
            })
    }

    // get lov category
    const getLovCategory = async () => {
        await fetch(`${BASE_URL}/lov/category`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localAuth.access_token}` }
        })
            .then(res => res.json())
            .then((data) => {
                setLovCategory(data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // handle get property
    const getProperty = async () => {
        await fetch(`${BASE_URL}/lov/property`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${localAuth.access_token}` }
        })
            .then(res => res.json())
            .then((data) => {
                const dtProp = data.data;
                const lovProp = dtProp.map(val => {
                    return {
                        value: val.id,
                        label: val.name
                    };
                });
                setLovProperties(lovProp)
            })
            .catch((err) => {
                console.error('error while fetching prop', err)
            })
    }

    // handle react select on change
    const handleSelectOnChange = (name, e) => {
        // e will return array object
        // console.log(`${name} :`, e)
        // dispatch state redux
        dispatch(setFormPackage('properties', e))
    }
    // const options = [
    //     { value: 'chocolate', label: 'Chocolate' },
    //     { value: 'strawberry', label: 'Strawberry' },
    //     { value: 'vanilla', label: 'Vanilla' }
    // ]

    useEffect(() => {
        getLovCategory()
        getProperty()
    }, [])

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
                                <Card.Title as="h4">Create Package</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form onSubmit={handleSubmit(handleCreate)}>
                                    <Row>
                                        <Col className="pr-1" md="6">
                                            <Form.Group>
                                                <label>Name</label>
                                                <Form.Control
                                                    defaultValue={ststatePackage.name}
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
                                            <Form.Group controlId="exampleForm.SelectCustom">
                                                <Form.Label>Category</Form.Label>
                                                <Form.Control as="select" name="id_category" custom onChange={e => handleOnChange(e)}>
                                                    {
                                                        lovCategory &&
                                                        lovCategory.map((el, index) => {
                                                            return (
                                                                <option key={index} value={el.id} >{el.name}</option>
                                                            );
                                                        })
                                                    }
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
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
                                    <Row>
                                        <Col md="12">
                                            <Form.Group controlId="exampleForm.SelectCustom">
                                                <Form.Label>Select Property for this Package</Form.Label>

                                                {/* <Form.Control as="select" name="id_category" custom onChange={e => handleOnChangeProperty(e)} >
                                                    {
                                                        lovCategory &&
                                                        lovCategory.map((el, index) => {
                                                            return (
                                                                <option key={index} value={el.id} >{el.name}</option>
                                                            );
                                                        })
                                                    }
                                                </Form.Control> */}
                                                <Select
                                                    // defaultValue={[options[2], options[0]]}
                                                    defaultValue={[]}
                                                    isMulti
                                                    name="properties"
                                                    options={lovProperties}
                                                    onChange={(e) => handleSelectOnChange('properties', e)}
                                                    className="basic-multi-select"
                                                    classNamePrefix="select"
                                                />

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
                                        ststatePackage.isLoading ?
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
