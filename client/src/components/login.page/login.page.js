import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom'
const jwt = require('jsonwebtoken')
const Login = ({ history }) => {

    const [val, setVal] = useState({
        email: '',
        password: ''
    });
    
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
            },
            body: JSON.stringify(data)
        })
            .then(res => res.text())
            .then((res) => {
                try {
                    let tokenVerified = jwt.verify(res, 'secret');
                    if (tokenVerified != undefined) {
                        localStorage.setItem('token-jwt', res)
                        console.log('From login page: ' + res)
                        history.push('/')
                    } else {
                        localStorage.removeItem('token-jwt')
                    }
                } catch (er) { console.log(er) }
            })           
            .catch(er => console.log(er))
    }
    
      return (
        <div>
            <h1>I am A Login Page</h1>
            <Link to='/'>Home</Link><br /><br/>
            <Link to='/test'>test</Link><br /> <br />
            <Link to='/signup'>Signup</Link>
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
                </div>
                <div className='text-center'>
                      &nbsp;
                      <button type="submit" >Login</button>&nbsp;
                </div>
            </form>
        </div>)
}
export default withRouter(Login);