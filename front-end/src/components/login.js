import {React, useState} from 'react';
import {Grid,Paper,Avatar,Typography,TextField,Button,Link} from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { login } from '../Services/axiosConfig';

const useStyles = makeStyles((theme) => ({
    paperStyle: {
        padding :20,
        height:'60vh',
        width:300,
        margin:"20px auto"
    },

    bstyle: {
        margin: '8 px auto'
    }

}))

const Login = () => {
    const classes = useStyles();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onUsernameChange = e => {
        setUsername(e.target.value);
    }

    const onPasswordChange = e => {
        setPassword(e.target.value);
    }

    const handleSubmit = () => {
        login(username,password);
    }

    return(
       <Grid >
           <Paper 
                elevation={10} 
                className={classes.paperStyle}>

                <Grid align='center'>

                    <Avatar>
                        <VpnKeyIcon color = 'primary'/>
                    </Avatar>
                    <Typography variant ='subtitle1'>Sign in!</Typography>

                </Grid>

                <TextField
                    label="Username"
                    placeholder='Enter Username'
                    fullWidth
                    required
                    onChange={onUsernameChange}
                />

                <TextField
                    label="Password"
                    placeholder='Enter Password'
                    fullWidth
                    required
                    type='password'
                    onChange={onPasswordChange}
                />

                <Button type="submit" variant = 'contained' color="primary" fullWidth className={classes.bstyle} onClick={handleSubmit}> Sign in</Button>
                
                <Typography > Don't have an account? 
                    <Link href="/signup">
                        Sign up now!
                    </Link>
                </Typography>
           </Paper>
           
       </Grid>
    )
}

export default Login;