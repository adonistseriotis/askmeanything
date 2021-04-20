import {React, useState} from 'react';
import {Grid,Paper,Avatar,Typography,TextField,Button, makeStyles} from '@material-ui/core'
import BorderColorIcon from '@material-ui/icons/BorderColor';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { signUp } from '../Services/axiosConfig';


const useStyles = makeStyles((theme) => ({
    paperStyle: {
        padding :20,
        height:'70vh',
        width:300,
        margin:"20px auto"
    },

    bstyle: {
        margin: '8 px auto'
    }

}))


const SignUp = () =>{
    const paperStyle={padding :20,height:'70vh',width:400,margin:"20px auto"}
    const bstyle = {margin: "8px auto"}
    const flexContainer = {
        display: 'flex',
        flexDirection: 'row',
      };

      const [username, setUsername] = useState('');
      const [password, setPassword] = useState('');
      const [email, setEmail] = useState('');
  
    //   const onFirstNameChange = e => {
    //       setFirstName(e.target.value);
    //   }

    //   const onLastNameChange = e => {
    //       setLastName(e.target.value);
    //   }

      const onEmailChange = e => {
          setEmail(e.target.value);
      }

      const onUsernameChange = e => {
          setUsername(e.target.value);
      }
  
      const onPasswordChange = e => {
          setPassword(e.target.value);
      }
      
    //   const onPasswordVerificationChange = e => {
    //       setPasswordVerification(e.target.value);
    //   }

      const handleSubmit = () => {
          signUp(username,password,email);
      }

    return(
       <Grid>
           <Paper elevation={10} style = {paperStyle}>
                <Grid align='center'>
                    <Avatar >
                        <BorderColorIcon color = 'primary'/>
                    </Avatar>
                    <Typography 
                        variant ='subtitle1'>
                        Sign up!
                    </Typography>
                </Grid>
                <form style={flexContainer}>
                <TextField 
                    label="First Name" 
                    placeholder='Enter First Name' 
                    required
                   // onChange={onFirstNameChange}
                   >
                </TextField>
                <TextField 
                    label="Last Name"
                    placeholder='Enter Last Name'
                    required
                    //onChange={onLastNameChange}
                    >
                </TextField>
                </form>
                <TextField 
                    label="E-mail"
                    placeholder='Enter E-mail' 
                    fullWidth 
                    required
                    onChange={onEmailChange}>
                </TextField>
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
                <TextField 
                    label="Password Verification" 
                    placeholder='Re-Enter Password' 
                    fullWidth 
                    required 
                    type='password'
                    //onChange={onPasswordVerificationChange}
                />
                <FormControlLabel
                    control={ <Checkbox name="checkedB" color="primary"/> }
                    label="I accept the Terms&Conditions."
                />
                <FormControlLabel
                    control={ <Checkbox name="checkedB" color="primary" /> }
                    label="I want to receive newsletter."
                />
                <Button 
                    type="submit" 
                    variant = 'contained' 
                    color="primary" 
                    fullWidth 
                    style={bstyle}
                    onClick={handleSubmit}>
                    Sign up
                </Button>
           </Paper>
       </Grid>
    )
}

export default SignUp;