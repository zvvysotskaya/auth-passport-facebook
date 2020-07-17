import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import LoginWithFacebook from '../social-component/facebook-login';

require('dotenv').config()
const jwt = require('jsonwebtoken')

const Login = ({ history }) => {

    const [val, setVal] = useState({
        email: '',
        password: ''
    });
    const [fbVal, setFbVal] = useState('')
    
    useEffect(() => {
        let fb = localStorage.getItem('user-facebook')
        if (fb !== '' && fb != undefined && fb != null) {
            setFbVal(fb)
        }
    }, [])
    const handleSubmit = (e) => {
        e.preventDefault()
        let data = {
            email: val.email,
            password: val.password
        }
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.text())
            .then((res) => {
                try {
                    let tokenVerifiedAdmin = jwt.verify(res, process.env.REACT_APP_TOKEN_ADMIN);
                    if (tokenVerifiedAdmin != undefined) {
                        localStorage.setItem('token-jwt-admin', res)
                        localStorage.removeItem('token-jwt-user')
                        history.push('/admin')
                    } else {
                        localStorage.removeItem('token-jwt-admin')
                    }
                } catch (er) { console.log(er) }

                try {
                    let tokenVerifiedUser = jwt.verify(res, process.env.REACT_APP_TOKEN_USER);
                    if (tokenVerifiedUser != undefined) {
                        localStorage.setItem('token-jwt-user', res)
                        localStorage.removeItem('token-jwt-admin')
                        history.push('/')
                    } else {
                        localStorage.removeItem('token-jwt-user')
                    }
                } catch (er) { console.log(er) }
            })
    }
    function loginWithFacebook() {
        if (fbVal != '') {
            return ''
        } else {
            return (<LoginWithFacebook />)
        }
    }
    return (
        <div>
            <Link to='/'>Home</Link><br />&nbsp;<Link to='/test'>The test page</Link><br /> &nbsp;<Link to='/admin'>The admin Page</Link>              
            <h1>I am A Login Page</h1>
            <p>Do not have an account?</p>
            <Link to='/signup'>Signup</Link><br /><br />

            <form onSubmit={handleSubmit} method='POST'>
                <div className='form-group'>
                    <label>Email:</label>
                    <input
                        type='text'
                        className="form-control"
                        name='email'
                        value={val.email}
                        onChange={e => setVal({ ...val, email: e.target.value })}
                    />
                </div>
                <div className='form-group mb-3'>
                    <label>Password:</label>
                    <input
                        type='password'
                        className="form-control"
                        name='password'
                        value={val.password}
                        onChange={e => setVal({ ...val, password: e.target.value })}
                    />
                </div><br/>
                <div className='text-center'>
                      &nbsp;
                      <button type="submit" >Login</button>&nbsp;
                </div>
            </form><br />
            {loginWithFacebook()}
        </div>)
}
export default withRouter(Login);