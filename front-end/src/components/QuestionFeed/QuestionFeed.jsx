import {React, useState, useEffect} from "react";
import QuestionFeedQuestion from './QuestionFeedQuestion';
import { Grid, Typography} from '@material-ui/core';
import { getFeed } from '../../Services/axiosConfig'


const QuestionFeed = () => {
    const [feed, setFeed] = useState(null);

    useEffect (() => {
        getFeed()
        .then(questions => {
            setFeed(questions.questions)
        })
        .catch(err => console.log(err))
    },[])


    return (
        <Grid container direction='column' justify='center' style={{margin:25}}>
            <Typography variant="h3" color='secondary'> Question Feed</Typography>
            {feed ?
                feed.map((question,row) => (
                    <QuestionFeedQuestion key={row} question={question}/>
                ))
            : null

            }
        </Grid>
    )
}

export default QuestionFeed;