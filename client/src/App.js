import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import Home from './components/home.page/home.page'
import Signup from './components/signup.page/signup.page';
import Login from './components/login.page/login.page';
import Test from './components/testPrivateRoute/testPrivateRoute'
import Admin from './components/admin.page/admin.page';
import PrivateRouteUser from './components/private-routes/private-route-user'
import PrivateRouteAdmin from './components/private-routes/private-route-admin'

function App() {
  return (
      <div className="App">
          <Switch>              
              <Route exact path='/' component={Home} />
              <Route exact path='/signup' component={Signup} />
              <Route exact path='/login' component={Login} />
              <PrivateRouteUser exact path='/test' component={Test} />
              <PrivateRouteAdmin exact path='/admin' component={Admin} />
          </Switch>
    </div>
  );
}

export default App;
