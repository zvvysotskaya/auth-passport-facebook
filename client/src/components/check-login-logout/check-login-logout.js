import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
require('dotenv').config()
const jwt = require('jsonwebtoken')

const CheckLoginLogout = () => {
    const [userVal, setUserVal] = useState('')
    const [adminVal, setAdminVal] = useState('');

    useEffect(() => {
        let token1 = localStorage.getItem('token-jwt-user')
        let token2 = localStorage.getItem('token-jwt-admin')
        let verTokenUser;
        let verTokenAdmin;
        //verify a user
        try {
            verTokenUser = jwt.verify(token1, process.env.REACT_APP_TOKEN_USER)
            if (verTokenUser != undefined) {
                setUserVal(token1)
            }
        } catch (er) { console.log(er) }
        //verify an admin
        try {
            verTokenAdmin = jwt.verify(token2, process.env.REACT_APP_TOKEN_ADMIN)
            if (verTokenAdmin != undefined) {
                setAdminVal(token2)
            }
        } catch (er) { console.log(er) }
        
        
    }, [userVal, adminVal])
   
    const loginOrLogout = () => {
        if (!userVal && !adminVal) {
           return (<Link to='/login'>Login</Link>)
        }
        if (userVal) {
            return (<Link to='/login' onClick={() => localStorage.removeItem('token-jwt-user')}>Logout</Link>)
        }
        
        if (adminVal) {
            return (<Link to='/login' onClick={() => localStorage.removeItem('token-jwt-admin')}>Logout</Link>)
        }
    }
    
    return (
        <div>
            {loginOrLogout()}
        </div>
    )
}
export default CheckLoginLogout;