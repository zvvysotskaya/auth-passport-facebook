import React from 'react';
import { Link } from 'react-router-dom';
import LoginLogout from '../check-login-logout/check-login-logout';

const Admin = () => {
   
    return (
        <div>
            <LoginLogout />
            <Link to='/signup'>Signup</Link><br /><br />
            <h1>I am an Admin Page</h1>
            <p>The page can be accessed only by the admin</p>            
            <Link to='/'>Home Page</Link>
            <Link to='/test'>The Test Page</Link>
        </div>)
}
export default Admin;