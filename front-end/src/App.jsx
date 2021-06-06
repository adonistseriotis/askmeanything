import React from 'react';
import Router from './Routes/Router';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import myTheme from './theme'
import NavigationBar from './components/NavigationBar/NavigationBar';


const App = () => {
    return (
        <MuiThemeProvider theme={myTheme}>
            <NavigationBar />
            <Router />
        </MuiThemeProvider>
    );
}

export default App; 