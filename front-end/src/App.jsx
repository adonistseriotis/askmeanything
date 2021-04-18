import { Grid} from '@material-ui/core';
import React from 'react';
import Welcome from './Welcome'
import Button from '@material-ui/core/Button'
import Login from './components/login';
import SignUp from './components/signup';
import {BrowserRouter, Switch, Route} from "react-router-dom"

const names = ["Adonis", "Babis", "Nikos", "Angelos"];

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/signup" component={SignUp}/>
            </Switch>
        </BrowserRouter>
    );
}

export default App; 