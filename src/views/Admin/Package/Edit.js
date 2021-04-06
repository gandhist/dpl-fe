import React, { useRef, useState, useEffect } from 'react'
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { notify } from 'utils/Notify';
import { setFormPackage, setisLoading } from '../../../redux';
import NotificationAlert from "react-notification-alert";
import { BASE_URL } from 'api';
import Select from 'react-select';

const Create = () => {
    const localAuth = JSON.parse(localStorage.getItem('p3sAuth'));
    const dispatch = useDispatch();
    const ststatePackage = useSelector(state => state.PackageReducer);
    const history = useHistory();
    const { id } = useParams();
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
            // console.log(`${key}`, ststatePackage[key])
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
        formData.append('_method', 'PATCH');
        await fetch(`${BASE_URL}/admin/package/${id}`, {
            method: 'POST',
            body: formData,
            headers: { 'Authorization': `Bearer ${localAuth.access_token}` },
        })
            .then(res => res.json())
            .then((data) => {
                // console.log(data)
                let notifOption = { place: 'br', message: data.meta.message, color: 'info', ref: notificationAlertRef }
                notify(notifOption)
                dispatch(setFormPackage('isLoading', false))
                // history.push('/admin/category')
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

    const getListPackage = async () => {
        await fetch(`${BASE_URL}/admin/package/${id}`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${localAuth.access_token}` }
        })
            .then(res => res.json())
            .then((res) => {
                Object.keys(res.data).map((el, i) => {
                    // console.log(`obj ${i} ${res.data[el]}`)
                    dispatch(setFormPackage(el, res.data[el]))
                })
                dispatch(setisLoading(false))
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // handle react select on change
    const handleSelectOnChange = (name, e) => {
        // e will return array object
        // console.log(`${name} :`, e)
        // dispatch state redux
        dispatch(setFormPackage('properties', e))
    }

    // get default value
    const getDefaulValueProperties = () => {
        if(lovProperties.length >= 0 && ststatePackage.properties.length >= 0){
            let s = [];
            lovProperties.map((el,i) => {
                let a = ststatePackage.properties.map((x) => x.value)
                a.forEach((val) => {
                  if(el.value == val){
                    s.push(lovProperties[i])
                  };
                })
                return s;
              }).filter((el) => el > 0)
        }
        console.log('sdsds',s)
    }

    useEffect(() => {
        getLovCategory()
        getProperty()
        getListPackage()
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
                                <Card.Title as="h4">Edit Package</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form onSubmit={handleSubmit(handleCreate)}>
                                    <Row>
                                        <Col className="pr-1" md="6">
                                            <Form.Group>
                                                <label>Name</label>
                                                <Form.Control
                                                    value={ststatePackage.name ?? ''}
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
                                                    value={ststatePackage.price ?? '' }
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
                                                <Form.Control value={ststatePackage.id_category != null ? ststatePackage.id_category : ''} as="select" name="id_category" custom onChange={e => handleOnChange(e)}>
                                                    {
                                                        lovCategory &&
                                                        lovCategory.map((el, index) => {
                                                            return (
                                                                <option  key={index} value={el.id} >{el.name}</option>
                                                            );
                                                        })
                                                    }
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col className="pr-1" md="6">
                                            <Form.Group>
                                                <label>Images</label>
                                                {
                                                    ststatePackage.images != null ? 
                                                    <a target="_blank" href={`http://127.0.0.1:5500/${ststatePackage.images}`} className="btn btn-success btn-xs" >View</a>
                                                    : ''
                                                }
                                                <Form.Control
                                                    value=""
                                                    placeholder="Images"
                                                    type="file"
                                                    name="images"
                                                    className={errors.images && 'is-invalid'}
                                                    onChange={e => handleOnChange(e)}
                                                ></Form.Control>
                                                {/* {errors.images?.type === "required" &&
                                                    <span className="invalid-feedback">
                                                        <strong>Images is required!</strong>
                                                    </span>} */}
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="12">
                                            <Form.Group controlId="exampleForm.SelectCustom">
                                                <Form.Label>Select Property for this Package
                                                </Form.Label>

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
                                                    value={ststatePackage.properties.length == 0 ? [] : ststatePackage.properties}
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
                                                    value={ststatePackage.desc ?? ''}
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
