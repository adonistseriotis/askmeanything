import React, {useRef} from 'react';
import {makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LandingViewCard from '../Recyclable/LandingViewCard/LandingViewCard';
import homeStyle from '../LandingView/LandingViewStyle';
import QuestionFeed from '../QuestionFeed/QuestionFeed';

const useStyles = makeStyles(homeStyle);

const MyAskMeAnything = () => {
    const classes = useStyles();
    const myQuestions = useRef(null);
    const myAnswers = useRef(null);

    const scrollQ = () => {
        myQuestions.current.scrollIntoView()
    }

    const scrollA = () => {
        myAnswers.current.scrollIntoView()
    }

    const testCards = [
        {
            title:"My Questions per Day",
            subtitle:"Graph/Table",
            chartType:"Calendar",
            chartTitle:"MyQuestionsPerDay",
            isChart:true,
        },
        {
            title:"My Questions",
            subtitle:"Click here to see your questions",
            isAnchor:true,
            onClick: scrollQ
        },
        {
            title:"My Answers",
            subtitle:"Click here to see your answers",
            isAnchor:true,
            onClick: scrollA
        },
        
    ]
    

    return (
         <Grid container direction='column' justify="center" alignItems="center">
            <Grid item container xs={12} direction='row' wrap='wrap' justify='center'>
                <Grid item direction='column' key={'Grid' + 2}>
                    <Grid>
                        <LandingViewCard 
                            title={testCards[1].title}
                            subtitle={testCards[1].subtitle}
                            chartType={testCards[1].chartType}
                            chartTitle={testCards[1].chartTitle}
                            isChart={testCards[1].isChart}
                            isAnchor={testCards[1].isAnchor}
                            onClick={testCards[1].onClick}
                        />
                    </Grid>
                    <Grid>
                        <LandingViewCard 
                            title={testCards[2].title}
                            subtitle={testCards[2].subtitle}
                            chartType={testCards[2].chartType}
                            chartTitle={testCards[2].chartTitle}
                            isChart={testCards[2].isChart}
                            isAnchor={testCards[2].isAnchor}
                            onClick={testCards[2].onClick}
                        />
                    </Grid>
                </Grid>
                <Grid item key={'Grid' + 1}>
                    <Grid>
                        <LandingViewCard 
                            title={testCards[0].title}
                            subtitle={testCards[0].subtitle}
                            chartType={testCards[0].chartType}
                            chartTitle={testCards[0].chartTitle}
                            isChart={testCards[0].isChart}
                            isAnchor={testCards[0].isAnchor}
                            onClick={testCards[0].onClick}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item container direction='row' xs={8}>
                <div ref={myQuestions}>
                    <QuestionFeed  origin='myQuestions'/>
                </div>
                <div ref={myAnswers}>
                    <QuestionFeed origin='myAnswers'/>
                </div>
            </Grid>
        </Grid>
    )
}

export default MyAskMeAnything;