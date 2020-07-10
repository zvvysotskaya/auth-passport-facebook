import React from 'react';
import { Link } from 'react-router-dom';
import LoginLogout from '../check-login-logout/check-login-logout';

const Home = () => {

   // var bearer = 'Bearer ' + bearer_token;
    
    return (
        <div>
            <h1>I am A Home Page</h1>
            <Link to='/signup'>Signup</Link><br /><br />
            <LoginLogout/><br /><br />
            <Link to='/test'>test</Link>
        </div>)
}
export default Home;