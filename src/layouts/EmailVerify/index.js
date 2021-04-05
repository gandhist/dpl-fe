import { BASE_URL } from 'api';
import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from "react-router-dom";
import { getQueryParams } from 'utils'

const EmailVerify = () => {
    const query = getQueryParams();
    const now = new Date();
    const {id} = useParams();
    const [isEmailVeried, setIsEmailVerified] = useState(false)
    useEffect(async () => {
        await fetch(`${BASE_URL}/email/cek_verified/${id}`,{
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => res.json())
        .then((data) => {
            setIsEmailVerified(true)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [query.expires])
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
                                <div className="card-header">Email Verification</div>
                                <div className="card-body">
                                    {
                                        now > query.expires ? '' : 'link sudah expired'
                                    }
                                    {
                                        isEmailVeried ? 'email verified' : 'email not verified yet'
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default EmailVerify
