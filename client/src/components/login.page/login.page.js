import React from 'react';
import { Link } from 'react-router-dom'

const Login = () => {

    return (
        <div>
            <h1>I am A Login Page</h1>
            <Link to='/'>Home</Link>
            <Link to='/signup'>Signup</Link>
        </div>)
}
export default Login;