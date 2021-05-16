import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import { Grid, IconButton, Typography } from "@material-ui/core";
import MoreIcon from '@material-ui/icons/MoreVert';

import styles from './NavigationBarStyle.js';

const useStyles = makeStyles(styles);

const NavigationBar = () => {
    const classes = useStyles();

    return (
        <Grid container justify="center" className={classes.root}>
            <Toolbar className={classes.toolbar}>
                <Typography variant="h6">
                    Home
                </Typography>
                <div className={classes.whitespace}/>
                <IconButton className={classes.avatar}>
                    <MoreIcon/>
                </IconButton>
            </Toolbar>
        </Grid>
    )
}

export default NavigationBar;