import React from 'react';
import {makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import NavigationBar from "../NavigationBar/NavigationBar";
import PieChart from '../Charts/PieChart'
import {Typography} from '@material-ui/core'

  const opa = ["Jan","Feb","March","Lel"]
  const opadata = [1000,2000,3000,2200]

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

const useStyles = makeStyles();

const LandingView = () => {

const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing = {3} md = {10}>
                <Grid item sm = {4}>
                    <Typography align = 'center'>
                        Look what other users have 
                        {'\n'} asked based on keywords!
                    </Typography>
                    <PieChart 
                        labels = {opa}
                        label = "keyword"
                        data = {opadata}
                    />
                </Grid>
                <Grid item sm={5}>
                    <Typography align = 'center'>
                        Check some questions based on keywords.
                        Enter keywords below!
                    </Typography>
                </Grid>
                        
            </Grid>
        </div>

        
    )
}

export default LandingView;