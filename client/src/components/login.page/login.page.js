import React, { useState} from 'react';
import { Link } from 'react-router-dom'

const Login = () => {

    const [val, setVal] = useState({
        email: '',
        password: ''
    });

    
        
    const handleSubmit = (e) => {
        e.preventDefault()
        let data = {
            email: val.email,
            password: val.password
        }
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
           .then(res => res.text())
          //   .then(res => console.log('RESULTS: ' + JSON.stringify(res)))
            .then((res) => localStorage.setItem('token-jwt', res))
            .catch(er => console.log(er))
    }
   // let storetoken = localStorage.getItem('token-jwt')
    return (
        <div>
            <h1>I am A Login Page</h1>
            <Link to='/'>Home</Link>
            <Link to='/signup'>Signup</Link>
            <form onSubmit={handleSubmit} method='POST'>
                <div className='form-group'>
                    <label>Email:</label>
                    <input
                        type='text'
                        className="form-control"
                        name='email'
                        value={val.email}
                        onChange={e => setVal({ ...val, email: e.target.value })}
                    />
                </div>
                <div className='form-group mb-3'>
                    <label>Password:</label>
                    <input
                        type='password'
                        className="form-control"
                        name='password'
                        value={val.password}
                        onChange={e => setVal({ ...val, password: e.target.value })}
                    />
                </div>
                <div className='text-center'>
                    &nbsp;
                            <button type="submit" >Login</button>&nbsp;
                           
                </div>
            </form>
            
        </div>)
}
export default Login;