import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import "../../assets/css/login.css";
import { setFormLogin, setAuth } from "./redux";
import { useForm } from "react-hook-form";
import { BASE_URL } from '../../api';
import { Link } from "react-router-dom";
import { AiOutlineLogin } from "react-icons/ai";
import { FaEyeSlash, FaEye } from "react-icons/fa";




const Login = () => {


  const dispatch = useDispatch();

  const stateLogin = useSelector(state => state.LoginReducer);
  const history = useHistory();
  const { register, handleSubmit, errors, } = useForm();
  // console.log('watching username : ',watch('username'))
  // console.log('error: ',errors)

  // handle on submit login
  const handleLogin = async () => {
    dispatch(setFormLogin('isLoading', true));
    await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(stateLogin)
    }).then(res => res.json()).then((data) => {
      let status_code = data.meta.code;
      switch (status_code) {
        case 422:
          alert(data.data.message)
          break;
        case 200:
          localStorage.setItem('p3sAuth', JSON.stringify(data.data))
          dispatch(setAuth(true, data.data));
          history.push("/admin/dashboard")
          break;
      }
      dispatch(setFormLogin('isLoading', false));
    })
      .catch((err) => {
        console.log('ini error', err)
        dispatch(setFormLogin('isLoading', false));
      })
    // console.log('ini data dari form',data)
  }

  // handle on form change
  const handleOnChange = (e) => {
    let inputType = e.target.name;
    let inputValue = e.target.value;
    dispatch(setFormLogin(inputType, inputValue));
  }

  // handle see password 
  const handleSeePassword = () => {
    dispatch(setFormLogin('isSeePassword', (!stateLogin.isSeePassword)));
  }

  // handle login socialite
  const handleOauth = async (e) => {
    const driver = e.target.name;
    await fetch(`${BASE_URL}/oauth/${driver}`, {
      mode: 'no-cors',
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'accept': 'application/json', "Access-Control-Allow-Credentials": true, }
    })
      .then(res => res.json())
      .then((data) => {
        console.log(data)
      })
      .catch((err) => {
        console.log('error in handle oauth', err)
      });
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
              {/* <li className="nav-item">
                  <a className="nav-link" href="#">
                    Login
                  </a>
                </li> */}
              <li className="nav-item">
                <Link className="nav-link" to='/register'>Register</Link>
                {/* <a className="nav-link" href="#">
                    Register
                  </a> */}
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
                <div className="card-header">Login</div>
                <div className="card-body">
                  <form onSubmit={handleSubmit(handleLogin)} >
                    <div className="form-group row">
                      <label
                        htmlFor="email_address"
                        className="col-md-4 col-form-label text-md-right"
                      >
                        Username
                        </label>
                      <div className="col-md-6">
                        <input
                          type="text"
                          id="email_address"
                          className={`form-control ${errors.username && 'is-invalid'}`}
                          name="username"
                          defaultValue={stateLogin.username}
                          onChange={e => handleOnChange(e)}
                          // ref={register({required: true, pattern: /^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/})}
                          ref={register({ required: true })}
                        />
                        {errors.username?.type === "required" &&
                          <span className="invalid-feedback">
                            <strong>Username tidak boleh kosong</strong>
                          </span>}
                        {errors.username?.type === "pattern" &&
                          <span className="invalid-feedback">
                            <strong>Format email tidak valid</strong>
                          </span>}
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="password"
                        className="col-md-4 col-form-label text-md-right"
                      >
                        Password
                        </label>
                      <div className="col-md-6">
                        <div className="input-group">
                          <input
                            type={stateLogin.isSeePassword ? 'text' : 'password'}
                            id="password"
                            className={`form-control ${errors.password && 'is-invalid'}`}
                            name="password"
                            defaultValue={stateLogin.password}
                            onChange={e => handleOnChange(e)}
                            ref={register({ required: true })}
                          />
                          <div className="input-group-prepend" onClick={handleSeePassword}>
                            <div className="input-group-text" >{stateLogin.isSeePassword ? <FaEyeSlash /> : <FaEye />}  </div>
                          </div>
                        </div>
                        {errors.password?.type === "required" &&
                          <span className="invalid-feedback">
                            <strong>Password tidak boleh kosong</strong>
                          </span>}
                      </div>
                    </div>
                    {/* <div className="form-group row">
                      <div className="col-md-6 offset-md-4">
                        <div className="checkbox">
                          <label>
                            <input type="checkbox" name="remember" /> Remember
                              Me
                            </label>
                        </div>
                      </div>
                    </div> */}
                    <div className="col-md-6 offset-md-4">
                      {
                        stateLogin.isLoading ?
                          <button className="btn btn-primary" type="button">
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...
                            </button>
                          :
                          <button className="btn btn-primary" type="submit">
                            Login <AiOutlineLogin />
                          </button>
                        // <input value="Login" className="btn btn-primary" type="submit" />
                      }
                      <Link to='/forgot-password' >Lupa Password</Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};


export default Login;
