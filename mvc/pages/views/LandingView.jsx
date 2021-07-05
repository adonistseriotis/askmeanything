import React, { useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LandingViewCard from '../components/LandingViewCard';
import QuestionFeed from '../components/QuestionFeed';

const homeStyle = {
    grid: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }
}

const useStyles = makeStyles(homeStyle);

const LandingView = (props) => {
    // console.log(props.questionFeed[0].keywords)
    const questionFeed = props.questionFeed;
    // console.log(props)
    // const classes = useStyles();
    const ref = useRef(null);
    const [feed, setFeed] = useState(questionFeed)

    const scroll = () => {
        ref.current.scrollIntoView();
    }

    const testCards = [
        {
            title: "Questions per Keyword",
            subtitle: "Graph/Table",
            chartType: "PieChart",
            chartTitle: "QuestionsPerKeyword",
            isChart: true,
            rawChartData: props.questionsPerKeyword
        },
        {
            title: "Questions per Day",
            subtitle: "Graph/Table",
            chartType: "Calendar",
            chartTitle: "QuestionsPerDay",
            isChart: true,
            rawChartData: props.questionsPerDay
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
                                rawChartData={row.rawChartData}
                            />
                        </Grid>
                    </Grid>))}
            </Grid>
            <Grid item container direction='row' xs={8}>
                <div ref={ref}>
                    <QuestionFeed setFeed={setFeed} feed={feed} origin='home' hasSearchBar={true} scroll={scroll} />
                </div>
            </Grid>
        </Grid>
    )
}

LandingView.getInitialProps = res => {
    const { query } = res;
    return { ...query };
  };

export default LandingView;