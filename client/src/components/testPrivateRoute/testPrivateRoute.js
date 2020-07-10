import React from 'react';
import { Link } from 'react-router-dom';
import LoginLogout from '../check-login-logout/check-login-logout';
const Home = () => {

    
    return (
        <div>
            <h1>Congrats, You are authorized for this page!!!</h1>

            <Link to='/'>Home</Link><br /><br/>
            <Link to='/signup'>Signup</Link><br /><br />
            <LoginLogout /><br /><br />
            <Link to='/login'>Login</Link>
        </div>)
}
export default Home;