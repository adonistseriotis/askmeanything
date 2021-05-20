import React from 'react';
import Router from './Routes/Router';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import myTheme from './theme'


const App = () => {
    return (
        <MuiThemeProvider theme={myTheme}>
            <Router />
        </MuiThemeProvider>
    );
}

export default App; 