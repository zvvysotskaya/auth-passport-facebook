import React, { useState } from 'react';
import { Link } from 'react-router-dom'

const Signup = () => {
    const [val, setVal] = useState({
        firstname: '',
        lastname: '',
        password: '',
        confirmpassword: '',
        email:''
    })
    const handleSubmit=(e)=>{
        e.preventDefault()
        let data = {
            firstname: val.firstname,
            lastname: val.lastname,
            password: val.password,
            confirmpassword: val.confirmpassword,
            email: val.email
        }
        fetch('/signup', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(res => res.text())
            .then(res => console.log('RESULTS: ' + JSON.stringify(res)))
        .catch(er=>console.log(er))
    }
    return (
        <div>
            <h1>I am A Signup Page</h1>
            <Link to='/'>Home</Link><br/>
            <Link to='/login'>Login</Link>
            <form onSubmit={handleSubmit} method='POST'>
                <label>First name</label>
                <input
                    type='text'
                    name='firstname'
                    placeholder='first name'
                    value={val.firstname}
                    onChange={(e) => { setVal({ ...val, firstname: e.target.value }) }}
                /><br/>
                <label>Last name</label>
                <input
                    type='text'
                    name='lastname'
                    placeholder='last name'
                    value={val.lastname}
                    onChange={(e) => { setVal({ ...val, lastname: e.target.value }) }}
                /><br/>
                <label>Password</label>
                <input
                    type='password'
                    name='password'
                    placeholder='password'
                    value={val.password}
                    onChange={(e) => { setVal({ ...val, password: e.target.value }) }}
                /><br/>
                <label>Confirm password</label>
                <input
                    type='password'
                    name='confirmpassword'
                    placeholder='first name'
                    value={val.confirmpassword}
                    onChange={(e) => { setVal({ ...val, confirmpassword: e.target.value }) }}
                /><br/>
                <label>Email:</label>
                <input
                    name='email'
                    placeholder='email'
                    value={val.email}
                    onChange={(e) => { setVal({ ...val, email: e.target.value }) }}
                /><br/>
                <button type='submit'>Submit</button>
            </form>
        </div>)
}
export default Signup;