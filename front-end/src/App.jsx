import { Grid} from '@material-ui/core';
import React from 'react';
import Welcome from './Welcome'
import Button from '@material-ui/core/Button'
import Login from './components/login';
import SignUp from './components/signup';

const names = ["Adonis", "Babis", "Nikos", "Angelos"];

const App = () => {
    return (
        <Grid>
            {/* {names.map(item => <Welcome name={item} />)}
            <Button color = 'secondary' variant = "outlined">
                Hello</Button> */}
            <SignUp />
        </Grid>
    );
}

export default App; 