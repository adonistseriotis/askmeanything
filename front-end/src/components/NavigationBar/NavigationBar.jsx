import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import { Grid, IconButton, Typography , Button } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';

import styles from './NavigationBarStyle.js';

const useStyles = makeStyles(styles);

const NavigationBar = props => {
    const classes = useStyles();

    if (props.isAuth !== null)return (
        <Grid container justify="center" className={classes.root}>
            <Toolbar className={classes.toolbar}>
                <Button
                    color="secondary"
                    home
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
                    signUp
                    href="/signup">
                    
                    Sign up
                </Button>
                <IconButton className={classes.menuButton}>
                    <MenuIcon/>
                </IconButton>
            </Toolbar>
        </Grid>
    )
    else {
        return (
            <Grid container justify="center" className={classes.root}>
            <Toolbar className={classes.toolbar}>
                <IconButton className={classes.menuButton}>
                    <MenuIcon/>
                </IconButton>
            </Toolbar>
        </Grid>
        )
    }
}

export default NavigationBar;