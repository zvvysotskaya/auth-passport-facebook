import React from 'react';
import { withRouter } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';
require('dotenv').config()

const LoginWithFacebook = ({ history }) => {
    
    function responseFacebook(response) {
        
        if (response.accessToken != undefined || response.accessToken !== '' || response.accessToken != null) {
            localStorage.setItem('user-facebook', response.accessToken)
            window.location.reload()
           
        } else {
            localStorage.removeItem('user-facebook')
        }
    }
    function componentClicked() {
        history.push('/')
        console.log('***Clicked***')
    }
    return (
        <div>
            <FacebookLogin
                appId={process.env.REACT_APP_FACEBOOK_LOGIN_APPID}
                autoLoad={false}
                fields="name,email,picture"
                onClick={componentClicked}
                callback={responseFacebook}
                cssClass="my-facebook-button-class"
            />

        </div>
    )
}
export default withRouter(LoginWithFacebook);