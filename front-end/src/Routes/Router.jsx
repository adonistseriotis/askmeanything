import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from '../components/Login/login';
import SignUp from '../components/Signup/signup';
import CreateQuestion from '../components/CreateQuestion/CreateQuestion'
import ProtectedRoute from './ProtectedRoute';
import LandingView from '../components/LandingView/LandingView';
import GetQuestion from '../components/Question/QuestionView';
import UpdateQuestion from '../components/UpdateQuestion/UpdateQuestion';
const Router = () => {
    return (
        <BrowserRouter>
          <Switch>
            <Route path="/home" component={LandingView} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route path="/create-question" component ={CreateQuestion}/>  
            <Route path="/question" component={GetQuestion} />
            <Route path="/update-question" component= {UpdateQuestion} />
            <Redirect to="/home"/>
          </Switch>
        </BrowserRouter>
    )
}

export default Router;