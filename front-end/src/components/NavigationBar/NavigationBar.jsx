import React from "react";
import {useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import { Popper,Grow,Paper,ClickAwayListener,MenuList, Typography , Button , Menu,MenuItem, AppBar} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {getUsername,isAuthenticated} from '../../Services/auth'
import styles from './NavigationBarStyle.js';
import {logout} from '../../Services/auth'
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(styles);

const NavigationBar = props => {
    const history = useHistory();
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
        logout();
        history.push("/login");
    }

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
            }
        }

  // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useLayoutEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        isAuthenticated();
        prevOpen.current = open;
        }, [open]);

    if (isAuthenticated() === false) return (
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
                            href="/login">
                            Sign in
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            href="/signup">
                            
                            Sign up
                        </Button>
                    </Toolbar>
            </AppBar>
        </div>
            )
            else {
                return (
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
                                <AccountCircleIcon color = 'secondary' />
                                <Button
                                    ref={anchorRef}
                                    aria-controls={open ? 'menu-list-grow' : undefined}
                                    aria-haspopup="true"
                                    onClick={handleToggle}
                                    >
                                        {getUsername()}
                                        <ExpandMoreIcon/>
                                </Button>
                                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                                    {({ TransitionProps, placement }) => (
                                        <Grow
                                            {...TransitionProps}
                                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                        >
                                            <Paper elevation = {0}>
                                                <ClickAwayListener onClickAway={handleClose}>
                                                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                                                        <MenuItem onClick={handleClose}>My account</MenuItem>
                                                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                                    </MenuList>
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
}




export default NavigationBar;

           