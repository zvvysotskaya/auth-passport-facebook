import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const jwt = require('jsonwebtoken')

const CheckLoginLogout = () => {
    const [val, setVal] = useState('')
    useEffect(() => {
        let token = localStorage.getItem('token-jwt')
        let verToken;
        try {
             verToken = jwt.verify(token, 'secret')
        } catch (er) { console.log(er) }
        
        if (verToken != undefined) {
            setVal(token)
        }
    }, [])
   
    const loginOrLogout = () => {
        if (!val) {
           return (<Link to='/login'>Login</Link>)
        }
        if (val) {
            return (<Link to='/login' onClick={() => localStorage.removeItem('token-jwt')}>Logout</Link>)
        }
    }
    console.log('Values: ' + val)
    return (
        <div>
            {loginOrLogout()}
        </div>
    )
}
export default CheckLoginLogout;