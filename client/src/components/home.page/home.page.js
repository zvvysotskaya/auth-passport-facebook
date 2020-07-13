import React from 'react';
import { Link } from 'react-router-dom';
import LoginLogout from '../check-login-logout/check-login-logout';

const Home = () => {

    // var bearer = 'Bearer ' + bearer_token;
    sessionStorage.setItem('aaa', 'check')
    let aa = sessionStorage.getItem('aaa')
    console.log('SESSION_STORAGE:' +aa)
    return (
        <div>
            <LoginLogout />
            <Link to='/signup'>Signup</Link><br /><br />
            <h1>I am A Home Page</h1>            
            <Link to='/admin'>The admin page</Link><br /><br />
            <Link to='/test'>The test page</Link>
        </div>)
}
export default Home;