import React, { useEffect } from "react";
import {useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import { Popper,Grow,Paper,ClickAwayListener,MenuList, Typography , Button , Link,MenuItem, AppBar} from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { getUsername } from "../config/auth";
import axios from 'axios'

const navigationBarStyle = {
    root: {
        display: 'flex',
        alignItems : 'center'
    },

    toolbar: {
        alignItems: 'center'

    },

    whitespace: {
        flexGrow: 1
    },
    appbar: {
        background: 'transparent',
        boxShadow: 'none'
    }
}



const useStyles = makeStyles(navigationBarStyle);

const NavigationBar = props => {
    const [username, setUsername] = useState(props.username)
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
    }

    setOpen(false);
    };

    const handleLogout = () => {
        // logout();
        // setIsAuth(false);
        // setOpen(false);
        // history.push('/home')
        axios.post('/auth/logout')
        .then(() => {
            localStorage.removeItem('username');
            window.location.reload()
        })
        .catch((err) => console.log(err))
    }
    
    const handleMyAsk = () => {
        // history.push('/myaskmeanything')
        // setOpen(false)
    }

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
            }
        }

    useEffect(() => {
        if(username){
            localStorage.setItem('username', username)
        }
        else{
            setUsername(localStorage.getItem('username'))
        }
        
    }, [])
    
    return !username ? (
        <div className = {classes.root}>
            <AppBar position="static" className={classes.appbar}>
            <Toolbar className={classes.toolbar} >
                        <Button
                            color="secondary"
                            href="/home">
                            <Typography 
                            variant="h6"
                            >
                            Home
                            </Typography>
                        </Button>
                        <div className={classes.whitespace}/>
                        <Button
                            href="/auth/login">
                            Sign in
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            href="/auth/signup">
                            
                            Sign up
                        </Button>
                    </Toolbar>
            </AppBar>
        </div>
    ) : (
        <div className = {classes.root}>
            <AppBar position="static" className={classes.appbar}>
                <Toolbar className={classes.toolbar} >
                    <Button
                        color="secondary"
                        href="/home">
                        <Typography 
                        variant="h6"
                        >
                        Home
                        </Typography>
                    </Button>
                    <div className={classes.whitespace}/>
                    <Button
                        variant="contained"
                        color="secondary"
                        href="/create-question">
                        
                        Create a question
                    </Button>
                    <Button
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                        >
                            <Avatar style={{marginLeft:5}} src='/broken-image.jpg'>{username ? username[0] : 'u'}</Avatar>
                            <ExpandMoreIcon/>
                    </Button>
                    <Popper open={open} anchorEl={anchorRef.current} placement='bottom' transition disablePortal style={{zIndex:2}}>
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                            >
                                <Paper elevation = {0}>
                                    <ClickAwayListener onClickAway={handleClose}>
                                        <Grid container>
                                            <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                                <MenuItem>
                                                    <Link href='/myaskmeanything' style={{textDecoration:'none'}}>
                                                        MyAskMeAnything
                                                    </Link>
                                                </MenuItem>
                                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                            </MenuList>
                                        </Grid>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </Toolbar>
            </AppBar>
        </div>
    )
}


export default React.memo(NavigationBar);

           