import React from 'react';
import {Grid,Paper,Avatar,Typography,TextField,Button,Link} from '@material-ui/core'
import BorderColorIcon from '@material-ui/icons/BorderColor';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';



const SignUp = () =>{
    const paperStyle={padding :20,height:'70vh',width:400,margin:"20px auto"}
    const bstyle = {margin: "8px auto"}
    const flexContainer = {
        display: 'flex',
        flexDirection: 'row',
      };

    return(
       <Grid>
           <Paper elevation={10} style = {paperStyle}>
                <Grid align='center'>
                    <Avatar ><BorderColorIcon color = 'primary'/></Avatar>
                        <Typography variant ='subtitle'>Sign up!</Typography>
                </Grid>
                <form style={flexContainer}>
                <TextField label="First Name" placeholder='Enter First Name' required></TextField>
                <TextField label="Last Name" placeholder='Enter Last Name'required></TextField>
                </form>
                <TextField label="E-mail" placeholder='Enter E-mail' fullWidth required></TextField>
                <TextField label="Username" placeholder='Enter Username' fullWidth required></TextField>
                <TextField label="Password" placeholder='Enter Password' fullWidth required type='password'></TextField>
                <TextField label="Password Verification" placeholder='Re-Enter Password' fullWidth required type='password'></TextField>
                <FormControlLabel
                    control={ <Checkbox name="checkedB" color="primary" /> }
                    label="I accept the Terms&Conditions."
                />
                <FormControlLabel
                    control={ <Checkbox name="checkedB" color="primary" /> }
                    label="I want to receive newsletter."
                />
                <Button type="submit" variant = 'contained' color="primary" fullWidth style={bstyle}> Sign up</Button>
                
           </Paper>
           
       </Grid>
    )
}

export default SignUp;