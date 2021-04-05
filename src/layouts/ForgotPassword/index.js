import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from "react-hook-form";
import { setFormForgotPassword } from './redux';
import { FaRegPaperPlane } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BASE_URL } from 'api';



const ForgotPassword = () => {

    const stateForgot = useSelector(state => state.ForgotPasswordReducer);
    const dispatch = useDispatch();
    const { register, handleSubmit, errors} = useForm();

    // handle onchange form
    const handleOnChange = (e) => {
        let inputType = e.target.name;
        let inputValue = e.target.value;
        dispatch(setFormForgotPassword(inputType, inputValue))
    }

    // handle on forgot password submitted
    const handleForgotPassword = async () => {
        delete stateForgot.isLoading;
        dispatch(setFormForgotPassword('isLoading', true))
        await fetch(`${BASE_URL}/password/email`,{
            method: 'POST',
            headers: { 'Content-Type' : 'application/json'},
            body: JSON.stringify(stateForgot)
        })
        .then(res => res.json())
        .then((data) => {
            console.log(data)
            let status_code = data.meta.code;
            switch (status_code) {
                case 200:
                    alert(data.meta.message)
                    break;
            
                default:
                    break;
            }
            dispatch(setFormForgotPassword('isLoading', false))
        })
        .catch((err) => {
            console.log(err)
            dispatch(setFormForgotPassword('isLoading', false))
        })
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
                  <form onSubmit={handleSubmit(handleForgotPassword)} >
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
                          className={`form-control ${errors.email && 'is-invalid'}`}
                          name="email"
                          defaultValue={stateForgot.email}
                          onChange={e => handleOnChange(e)}
                          ref={register({required: true, pattern: /^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/})}
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
                    <div className="col-md-6 offset-md-4">
                      {
                        stateForgot.isLoading ?
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

export default ForgotPassword
