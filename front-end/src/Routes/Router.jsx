import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from '../components/Login/login';
import SignUp from '../components/Signup/signup';
import ProtectedRoute from './ProtectedRoute';
import LandingView from '../components/LandingView/LandingView';

const Router = () => {
    return (
        <BrowserRouter>
          <Switch>
              <Route path="/login" component={Login} />
              <Route path="/signup" component={SignUp} />
              <Route path="/home" component={LandingView} />

              <Redirect to="/login"/>
          </Switch>
        </BrowserRouter>
    )
}

export default Router;