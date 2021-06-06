import React from 'react';
import {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { login } from '../../Services/axiosConfig';
import NavigationBar from '../NavigationBar/NavigationBar'

function Copyright() {
  return (
    <Typography variant="body2" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Ask Me Anything
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  inputFields: {
    color:'#fafafa'
  }
}));

export default function Login() {
  const classes = useStyles();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(false);

  const onUsernameChange = e => {
    setUsername(e.target.value);
  }

  const onPasswordChange = e => {
    setPassword(e.target.value);
  }

  const handleSubmit = async () => {
    await login(username,password)
    .then(response => {
      if(response.statusText === 'OK'){
        setError(false);
        setErrorMessage("");
      }
    })
    .catch(error => {
        setError(true);
        setErrorMessage(error.response.statusText);
    });
  }

  const handleEnter = (e) => {
    if(e.code === "Enter")
        handleSubmit()
  }

  return (
    <Grid>
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            className={classes.inputFields}
            helperText={errorMessage}
            error={error}
            value={username}
            onChange={onUsernameChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            className={classes.inputFields}
            error={error}
            value={password}
            onChange={onPasswordChange}
            onKeyPress={handleEnter}
          />
          <Button
            fullWidth
            variant="contained"
            className={classes.submit}
            onClick={handleSubmit}
          >
            <Typography>
              Sign In
            </Typography>
          </Button>
          <Grid container>
            <Grid item xs>
              <Link color="secondary" href="#" variant="inherit">
                <Typography>
                  Forgot password?
                </Typography>
              </Link>
            </Grid>
            <Grid item>
              <Link color="secondary" href="/signup" variant="inherit">
                <Typography>
                  {"Don't have an account? Sign Up"}
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
    </Grid>
  );
}