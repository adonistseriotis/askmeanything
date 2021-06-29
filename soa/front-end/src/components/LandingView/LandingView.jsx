import React, {useRef} from 'react';
import {makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LandingViewCard from '../Recyclable/LandingViewCard/LandingViewCard';
import homeStyle from './LandingViewStyle';
import QuestionFeed from '../QuestionFeed/QuestionFeed';

const useStyles = makeStyles(homeStyle);

const LandingView = () => {
    const classes = useStyles();
    const ref = useRef(null);

    const scroll = () => {
        ref.current.scrollIntoView();
    }

    const testCards = [
        {
            title:"Questions per Keyword",
            subtitle:"Graph/Table",
            chartType:"PieChart",
            chartTitle:"QuestionsPerKeyword",
            isChart:true
        },
        {
            title:"Questions per Day",
            subtitle:"Graph/Table",
            chartType:"Calendar",
            chartTitle:"QuestionsPerDay",
            isChart:true
        },
    ]
    

    return (
         <Grid container direction='column' justify="center" alignItems="center">
            <Grid item container xs={12} direction='row' justify='center'>
                {testCards.map((row, count) => (
                    <Grid item key={'Grid' + count}>
                        <Grid>
                        <LandingViewCard 
                            title={row.title}
                            subtitle={row.subtitle}
                            chartType={row.chartType}
                            chartTitle={row.chartTitle}
                            isChart={row.isChart}
                        />
                        </Grid>
                    </Grid>))}
            </Grid>
            <Grid item container direction='row' xs={8}>
                <div ref={ref}>
                    <QuestionFeed origin='home' hasSearchBar={true} scroll={scroll}/>
                </div>
            </Grid>
        </Grid>
    )
}

export default LandingView;