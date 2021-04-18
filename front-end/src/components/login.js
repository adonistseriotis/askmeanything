import React from 'react';
import {Grid,Paper,Avatar,Typography,TextField,Button,Link} from '@material-ui/core'
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';



const Login = () =>{
    const paperStyle={padding :20,height:'60vh',width:300,margin:"20px auto"}
    const bstyle = {margin: "8px auto"}
    const styles = {
        paperContainer: {
            backgroundImage: `url(${"static/src/questionM.png"})`
        }
    };

    return(
       <Grid style = {styles.paperContainer}>
           <Paper elevation={10} style = {paperStyle}>
                <Grid align='center'>
                    <Avatar backgroundColor><VpnKeyIcon color = 'primary'/></Avatar>
                        <Typography variant ='subtitle'>Sign in!</Typography>
                </Grid>
                <TextField label="Username" placeholder='Enter Username' fullWidth required></TextField>
                <TextField label="Password" placeholder='Enter Password' fullWidth required type='password'></TextField>
                <FormControlLabel
                    control={ <Checkbox name="checkedB" color="primary" /> }
                    label="Remember Username"
                />
                <Button type="submit" variant = 'contained' color="primary" fullWidth style={bstyle}> Sign in</Button>
                
                <Typography > Don't have an account? <Link href="#">
                Sign up now! </Link>
                </Typography>
           </Paper>
           
       </Grid>
    )
}

export default Login;