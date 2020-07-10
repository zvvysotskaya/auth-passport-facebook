import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const jwt = require('jsonwebtoken')

const CheckLoginLogout = () => {
    const [val, setVal] = useState('')
    useEffect(() => {
        fetch('/login')
            .then(res => res.text())
            .then((res) => {
                var decoded
                try {
                    decoded = jwt.verify(res, 'secret');                    
                    if (decoded != undefined) {
                        console.log("DECODED JWT: " + decoded)
                        localStorage.setItem(res, 'token-jwt')
                    } else { localStorage.removeItem('token-jwt') }
                } catch (err) { console.log(err) }
                console.log("Decoded val: " + JSON.stringify(decoded))
            })
           // .then())
            .catch(er => console.log(er))
    }, [])
    useEffect(() => {
        
        try {
            let storageToken = localStorage.getItem('token-jwt')
            let verifiedToken = jwt.verify(storageToken, 'secret')
            if (verifiedToken != undefined) {
                setVal(storageToken)
            }
        } catch (er) { console.log('Error: ' + er) }
        
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