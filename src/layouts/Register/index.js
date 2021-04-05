import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { Link, useHistory } from 'react-router-dom';
import { setFormRegister, setAuth } from "../../redux/index";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { BASE_URL } from 'api';


const Register = () => {
    const dispatch = useDispatch();
    const stateRegister = useSelector(state => state.RegisterReducer);
    const history = useHistory()
    const { register, handleSubmit, errors} = useForm();

    // handle on form change
    const handleOnChange = (e) => {
        let inputType = e.target.name;
        let inputValue = e.target.value;
        dispatch(setFormRegister(inputType, inputValue));
    }

    // handle on submit
    const handleRegister = async () => {
        dispatch(setFormRegister('isLoading', true));
        delete stateRegister.isLoading;
        delete stateRegister.isSeePassword;
        await fetch(`${BASE_URL}/register`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(stateRegister)
        }).then(res => res.json()).then((data)=> {
            console.log(data)
            let status_code = data.meta.code
            // if finished
            switch (status_code) {
                case 200:
                    localStorage.setItem('p3sAuth', JSON.stringify(data.data))
                    dispatch(setAuth(true, data.data));
                    history.push("/peserta/dashboard")
                    // 
                break;
                case 400:
                    alert(data.meta.message)
                break;
            }
            dispatch(setFormRegister('isLoading', false));
        })
    }

    // handle see password 
    const handleSeePassword = () => {
        dispatch(setFormRegister('isSeePassword', (!stateRegister.isSeePassword)));
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
                        </ul>
                    </div>
                </div>
            </nav>
            <main className="login-form" >
                <div className="cotainer">
                    <div className="row justify-content-center">
                        <div className="col-md-10">
                            <div className="card">
                                <div className="card-header">Register</div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit(handleRegister)}>
                                        <div className="form-group row">
                                            <label
                                                htmlFor="nama_lengkap"
                                                className="col-md-4 col-form-label text-md-right"
                                            >
                                                Nama Lengkap
                                            </label>
                                            <div className="col-md-6">
                                                <input
                                                    type="text"
                                                    id="nama_lengkap"
                                                    className={`form-control ${errors.nama_lengkap && 'is-invalid'}`}
                                                    name="nama_lengkap"
                                                    defaultValue={stateRegister.nama_lengkap}
                                                    onChange={e => handleOnChange(e)}
                                                    ref={register({ required: true })}
                                                />
                                                {errors.nama_lengkap?.type === "required" &&
                                                    <span className="invalid-feedback">
                                                        <strong>Nama lengkap tidak boleh kosong</strong>
                                                    </span>}
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label
                                                htmlFor="ho_hp"
                                                className="col-md-4 col-form-label text-md-right"
                                            >
                                                No Hp
                                            </label>
                                            <div className="col-md-6">
                                                <input
                                                    type="text"
                                                    id="no_hp"
                                                    className={`form-control ${errors.no_hp && 'is-invalid'}`}
                                                    name="no_hp"
                                                    defaultValue={stateRegister.no_hp}
                                                    onChange={e => handleOnChange(e)}
                                                    ref={register({ required: true, pattern: /^[0-9]/ })}
                                                />
                                                    {errors.no_hp?.type === "required" &&
                                                    <span className="invalid-feedback">
                                                        <strong>No Hp tidak boleh kosong</strong>
                                                    </span>}
                                                    {errors.no_hp?.type === "pattern" &&
                                                    <span className="invalid-feedback">
                                                        <strong>No Hp tidak hanya berisi angka</strong>
                                                    </span>}
                                            </div>
                                        </div>

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
                                                    defaultValue={stateRegister.email}
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
                                                        type={stateRegister.isSeePassword ? 'text' : 'password'}
                                                        id="password"
                                                        className={`form-control ${errors.password && 'is-invalid' }`}
                                                        name="password"
                                                        defaultValue={stateRegister.password}
                                                        onChange={e => handleOnChange(e)}
                                                        ref={register({required: true})}
                                                        />
                                                    <div className="input-group-prepend" onClick={handleSeePassword}>
                                                        <div className="input-group-text" >{ stateRegister.isSeePassword ? <FaEyeSlash /> : <FaEye /> }  </div>
                                                    </div>
                                                </div>
                                            
                                            {errors.password?.type === "required" && 
                                            <span className="invalid-feedback">
                                                <strong>Password tidak boleh kosong</strong>
                                            </span>}
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label
                                                htmlFor="instansi"
                                                className="col-md-4 col-form-label text-md-right"
                                            >
                                                Instansi
                                            </label>
                                            <div className="col-md-6">
                                                <input
                                                    type="text"
                                                    id="instansi"
                                                    className={`form-control`}
                                                    name="instansi"
                                                    defaultValue={stateRegister.instansi}
                                                    onChange={e => handleOnChange(e)}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label
                                                htmlFor="jabatan"
                                                className="col-md-4 col-form-label text-md-right"
                                            >
                                                Jabatan
                                            </label>
                                            <div className="col-md-6">
                                                <input
                                                    type="text"
                                                    id="jabatan"
                                                    className={`form-control`}
                                                    name="jabatan"
                                                    defaultValue={stateRegister.jabatan}
                                                    onChange={e => handleOnChange(e)}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label
                                                htmlFor="keterangan"
                                                className="col-md-4 col-form-label text-md-right"
                                            >
                                                Keterangan
                                            </label>
                                            <div className="col-md-6">
                                                <input
                                                    type="text"
                                                    id="keterangan"
                                                    className={`form-control`}
                                                    name="keterangan"
                                                    defaultValue={stateRegister.keterangan}
                                                    onChange={e => handleOnChange(e)}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-6 offset-md-4">
                                            {
                                                stateRegister.isLoading ? 
                                                <button className="btn btn-primary" type="button">
                                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...
                                                </button>
                                                : 
                                                <input value="Submit" className="btn btn-primary" type="submit" />
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

export default Register
