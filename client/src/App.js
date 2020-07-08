import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import Home from './components/home.page/home.page'
import Signup from './components/signup.page/signup.page';
import Login from './components/login.page/login.page';

function App() {
  return (
      <div className="App">
          <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/signup' component={Signup} />
              <Route exact path='/login' component={Login} />
          </Switch>
      
    </div>
  );
}

export default App;
