import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {

   // var bearer = 'Bearer ' + bearer_token;
    
    return (
        <div>
            <h1>I am A Home Page</h1>
            <Link to='/signup'>Signup</Link><br /><br />
            <Link to='/login'>Login</Link><br /><br />
            <Link to='/test'>test</Link>
        </div>)
}
export default Home;