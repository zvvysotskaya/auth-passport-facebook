import React from 'react';
import { Link } from 'react-router-dom';
import LoginLogout from '../check-login-logout/check-login-logout';

const Home = () => {
   
    return (
        <div>
            <LoginLogout /><br />
            <Link to='/admin'>The admin page</Link><br /><br />
            <Link to='/test'>The test page</Link>
            <h1>I am A Home Page</h1>
        </div>)
}
export default Home;