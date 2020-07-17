import React from 'react';
import { Link } from 'react-router-dom';
import LoginLogout from '../check-login-logout/check-login-logout';
const Home = () => {

    
    return (
        <div>
            <LoginLogout /><br />
            <Link to='/'>Home</Link><br /><br />
            <Link to='/admin'>The admin page</Link><br /><br />            
            <h1>Congrats, You are authorized for this page!!!</h1>
        </div>)
}
export default Home;