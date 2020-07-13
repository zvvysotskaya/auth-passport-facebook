import React from 'react';
import { Route, Redirect } from 'react-router-dom';



const PrivateRouteAdmin = ({ component: Component, props, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => localStorage.getItem('token-jwt-admin') != null ? <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            }
        />
    )
}
export default PrivateRouteAdmin;