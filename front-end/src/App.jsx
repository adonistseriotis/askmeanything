import React from 'react';
import Router from './Routes/Router';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const names = ["Adonis", "Babis", "Nikos", "Angelos"];

const myTheme = createMuiTheme({
    typography: {
        "fontFamily": '"Roboto", "Helvetica", "Arial", sans-serif',
        "fontSize": 14
    }
})

const App = () => {
    return (
        <MuiThemeProvider theme={myTheme}>
            <Router />
        </MuiThemeProvider>
    );
}

export default App; 