import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from '../components/Login/login';
import SignUp from '../components/Signup/signup';
import CreateQuestion from '../components/CreateQuestion/CreateQuestion'
import ProtectedRoute from './ProtectedRoute';
import LandingView from '../components/LandingView/LandingView';
import GetQuestion from '../components/Question/QuestionView';
import UpdateQuestion from '../components/UpdateQuestion/UpdateQuestion';
import NavigationBar from '../components/NavigationBar/NavigationBar';
import MyAskMeAnything from '../components/MyAskMeAnything/MyAskMeAnything';

const Router = () => {
    return (
        <BrowserRouter>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <React.Fragment>
              <NavigationBar/>
              <Route path="/home" component={LandingView} />
              <Route path="/create-question" component ={CreateQuestion}/>  
              <Route path="/question" component={GetQuestion} />
              <Route path="/update-question" component= {UpdateQuestion} />
              <Route path="/myaskmeanything" component={MyAskMeAnything} />
            </React.Fragment>
            <Redirect to="/home"/>
            
          </Switch>
        </BrowserRouter>
    )
}

export default Router;