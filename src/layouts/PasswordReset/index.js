import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getQueryParams } from "../../utils";
import { setFormResetPassword } from './redux';
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaRegPaperPlane, FaEyeSlash, FaEye } from "react-icons/fa";
import { BASE_URL } from 'api';




const PasswordReset = () => {
    const { register, handleSubmit, errors } = useForm();
    const history = useHistory();
    const query = getQueryParams();
    const dispatch = useDispatch();
    const stateResetPassword = useSelector(state => state.ResetPasswordReducer)
    console.log(stateResetPassword)
    console.log(errors)
   

    // mount token and email to reducer
    useEffect(() => {
        for (const key in query) {
            dispatch(setFormResetPassword(key, query[key]))
        }
    }, [])

    // handle on change
    const handleOnChange = (e) => {
        let inputType = e.target.name;
        let inputValue = e.target.value;
        dispatch(setFormResetPassword(inputType, inputValue));
    }

    // handle on reset password submitted
    const handleResetPassword = async () => {
        dispatch(setFormResetPassword('isLoading', !stateResetPassword.isLoading));
        delete stateResetPassword.isLoading;
        delete stateResetPassword.isSeePassword;
        delete stateResetPassword.isSeePasswordConfirmation;
        await fetch(`${BASE_URL}/password/reset`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(stateResetPassword)
        })
        .then(res => res.json())
        .then((data) => {
            let status_code = data.meta.code;
            switch (status_code) {
                case 200:
                    alert(data.meta.message)
                    // history.push('/login')
                    break;
                    case 400 :
                        alert(data.meta.message)
                        break;
            }
            dispatch(setFormResetPassword('isLoading', false));
        })
        .catch((err) => {
            console.log(err)
            dispatch(setFormResetPassword('isLoading', false));
        });
    }

    // handle see password
    const handleSeePassword = (type, value) => {
        dispatch(setFormResetPassword(type, value));
    }


    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light navbar-laravel" >
                <div className="container">
                    <a className="navbar-brand" href="#">
                        P3SM
            </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to='/login'>Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/register'>Register</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <main className="login-form" >
                <div className="cotainer">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-header">Reset Passsword</div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit(handleResetPassword)} >
                                        <div className="form-group row">
                                            <label
                                                htmlFor="email"
                                                className="col-md-4 col-form-label text-md-right"
                                            >
                                                Email
                                            </label>
                                            <div className="col-md-6">
                                                <input
                                                    type="text"
                                                    id="email"
                                                    readOnly
                                                    className={`form-control ${errors.email && 'is-invalid'}`}
                                                    name="email"
                                                    defaultValue={stateResetPassword.email}
                                                    onChange={e => handleOnChange(e)}
                                                    ref={register({ required: true, pattern: /^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/ })}
                                                />
                                                {errors.email?.type === "required" &&
                                                    <span className="invalid-feedback">
                                                        <strong>Email tidak boleh kosong</strong>
                                                    </span>}
                                                {errors.email?.type === "pattern" &&
                                                    <span className="invalid-feedback">
                                                        <strong>Format email tidak valid</strong>
                                                    </span>}
                                            </div>
                                        </div>
                                        <div className="form-group row" >
                                            <label
                                                htmlFor="password"
                                                className="col-md-4 col-form-label text-md-right"
                                            >
                                                Password
                                            </label>
                                            <div className="col-md-6">
                                                <div className="input-group" >
                                                <input
                                                    type={ stateResetPassword.isSeePassword ? 'text' : 'password' }
                                                    id="password"
                                                    className={`form-control ${errors.password && 'is-invalid'}`}
                                                    name="password"
                                                    defaultValue={stateResetPassword.password}
                                                    onChange={e => handleOnChange(e)}
                                                    ref={register({ required: true, minLength: 8 })}
                                                />
                                                    <div className="input-group-prepend" onClick={() => { handleSeePassword('isSeePassword',!stateResetPassword.isSeePassword) }}>
                                                        <div className="input-group-text" >{ stateResetPassword.isSeePassword ? <FaEyeSlash /> : <FaEye /> }  </div>
                                                    </div>
                                                    {errors.password?.type === "required" &&
                                                    <span className="invalid-feedback">
                                                        <strong>Password tidak boleh kosong</strong>
                                                    </span>}
                                                {errors.password?.type === "minLength" &&
                                                    <span className="invalid-feedback">
                                                        <strong>Password minimal 8 karakter</strong>
                                                    </span>}
                                                </div>
                                                
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label
                                                htmlFor="password_confirmation"
                                                className="col-md-4 col-form-label text-md-right"
                                            >
                                                Password Confirmation
                                            </label>
                                        <div className="col-md-6">
                                        <div className="input-group" >
                                                <input
                                                    type={ stateResetPassword.isSeePasswordConfirmation ? 'text' : 'password' }
                                                    id="password_confirmation"
                                                    className={`form-control ${errors.password_confirmation && 'is-invalid'}`}
                                                    name="password_confirmation"
                                                    defaultValue={stateResetPassword.password_confirmation}
                                                    onChange={e => handleOnChange(e)}
                                                    ref={register({ 
                                                        required : true, 
                                                        validate : value => value === stateResetPassword.password || "password tidak sama"
                                                    })}
                                                />
                                                    <div className="input-group-prepend" onClick={() => { handleSeePassword('isSeePasswordConfirmation',!stateResetPassword.isSeePasswordConfirmation) }}>
                                                        <div className="input-group-text" >{ stateResetPassword.isSeePasswordConfirmation ? <FaEyeSlash /> : <FaEye /> }  </div>
                                                    </div>
                                                    {errors.password_confirmation?.type === "required" &&
                                                    <span className="invalid-feedback">
                                                        <strong>Password Confirmation tidak boleh kosong</strong>
                                                    </span>}
                                                    {errors.password_confirmation?.type === "validate" &&
                                                    <span className="invalid-feedback">
                                                        <strong>password tidak sama</strong>
                                                    </span>
                                                    }
                                                </div>
                                                
                                            </div>
                                        </div>


                                        <div className="col-md-6 offset-md-4">
                                            {
                                                stateResetPassword.isLoading ?
                                                    <button className="btn btn-primary" type="button">
                                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...
                            </button>
                                                    :
                                                    <button className="btn btn-primary" type="submit">
                                                        Reset Password <FaRegPaperPlane />
                                                    </button>
                                            }
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default PasswordReset
