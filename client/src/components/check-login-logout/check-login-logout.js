import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

require('dotenv').config()
const jwt = require('jsonwebtoken')

const CheckLoginLogout = () => {
    const [userVal, setUserVal] = useState('')
    const [adminVal, setAdminVal] = useState('');
    const[FBVal, setFBVal] = useState('');

    useEffect(() => {
        let token1 = localStorage.getItem('token-jwt-user')
        let token2 = localStorage.getItem('token-jwt-admin')
        let FBToken = localStorage.getItem('user-facebook')
        console.log('FB TOKEN: ' + FBToken)
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
        try {
            
            if (FBToken != '') {
                setFBVal(FBToken)
            }
        } catch (er) { console.log(er) }
        
    }, [userVal, adminVal])
    const handleAdminLogout = () => {
        fetch('/logout')
            .then(localStorage.removeItem('token-jwt-admin'))
            .then()
        .catch((er)=>console.log(er))     
    }
    const handleUserLogout = () => {
        fetch('/logout')
            .then(localStorage.removeItem('token-jwt-user'))
            .then()
            .catch((er) => console.log(er))
    }
    const handleUserFBLogout = () => {       
            localStorage.removeItem('user-facebook')            
    }
    const loginOrLogout = () => {
        if (!userVal && !adminVal && !FBVal) {
           return (<Link to='/login'>Login</Link>)
        }
        if (userVal) {
            return (<Link to='/login' onClick={handleUserLogout}>Logout</Link>)
        }        
        if (adminVal) {
            return (<Link to='/login' onClick={handleAdminLogout}>Logout</Link>)
        }
        if (FBVal !=='') {
            return (<Link to='/login' onClick={handleUserFBLogout}> Logout</Link >)
        }
    }
    
    return (
        <div>
            {loginOrLogout()}
        </div>
    )
}
export default CheckLoginLogout;