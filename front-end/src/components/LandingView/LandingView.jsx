import React from 'react';
import {makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LandingViewCard from '../Recyclable/LandingViewCard/LandingViewCard';
import NavigationBar from "../NavigationBar/NavigationBar";
import homeStyle from './LandingViewStyle';

const testCards = [
    {
        title:"Questions per Keyword",
        subtitle:"Graph/Table",
        link:"/login"
    },
    {
        title:"Questions per day/period",
        subtitle:"Graph/Table",
        link:"/signup"
    },
    {
        title:"Ask a new question",
        subtitle: "",
        link:"/"
    },
    {
        title:"Answer a question",
        subtitle:"",
        link:""
    }
]

const useStyles = makeStyles(homeStyle);

const LandingView = () => {

    const classes = useStyles();

    return (
        <React.Fragment>
        <NavigationBar />
        <Grid container className={classes.grid}>
            {testCards.map((row, count) => (
                <Grid item key={'Grid' + count}>
                    <LandingViewCard 
                        
                        title={row.title}
                        subtitle={row.subtitle}
                        link={row.link}
                    />
                </Grid>))}
        </Grid>
        </React.Fragment>
    )
}

export default LandingView;