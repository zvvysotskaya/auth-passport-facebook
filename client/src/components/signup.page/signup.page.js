import React from 'react';
import { Link } from 'react-router-dom'

const Signup = () => {

    return (
        <div>
            <h1>I am A Signup Page</h1>
            <Link to='/'>Home</Link><br/>
            <Link to='/login'>Login</Link>
        </div>)
}
export default Signup;