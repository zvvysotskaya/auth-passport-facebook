import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {

    return (
        <div>
            <h1>I am A Home Page</h1>
            <Link to='/signup'>Signup</Link><br />
            <Link to='/login'>Login</Link>
        </div>)
}
export default Home;