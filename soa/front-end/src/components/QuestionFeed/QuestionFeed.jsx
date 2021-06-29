import {React, useState, useEffect} from "react";
import QuestionFeedQuestion from './QuestionFeedQuestion';
import QuestionFeedAnswer from './QuestionFeedAnswer';
import { Grid, Typography} from '@material-ui/core';
import { getFeed, myQuestions, myAnswers, search } from '../../Services/axiosConfig'
import SearchBar from '../SearchBar/SearchBar'


const QuestionFeed = ({ origin, hasSearchBar, scroll }) => {
    const [feed, setFeed] = useState(null);
    const [isAnswers, setIsAnswers] = useState(false);
    const [title, setTitle] = useState('');
    const [filter, setFilter] = useState('');

    const handleSearch = () => {
        search(filter)
        .then(questions => {
            setFeed(questions.questions)
            scroll();
        })
        .catch(err => console.error(err))
    }

    useEffect (() => {
        switch(origin){
            case 'home':
                setTitle('Question Feed')
                getFeed()
                .then(questions => {
                    setFeed(questions.questions)
                    setIsAnswers(false)
                })
                .catch(err => console.log(err))
                break;
            
            case 'myQuestions':
                setTitle('My Questions')
                myQuestions()
                .then(questions => {
                    setFeed(questions.questions)
                    setIsAnswers(false)
                })
                .catch(err => console.error(err))
                break;
            
            case 'myAnswers':
                setTitle('My Answers')
                myAnswers()
                .then(answers => {
                    setFeed(answers.answers)
                    setIsAnswers(true)
                })
                .catch(err => console.error(err))
                break;
        }
        
    },[])


    return (
        <Grid container direction='column' justify='center' style={{margin:25}}>
            <Typography variant="h3" color='secondary'> {title}</Typography>
            {hasSearchBar ? <Grid item container xs={12} justify='center' ><SearchBar handleSearch={handleSearch} filter={filter} setFilter={setFilter}/></Grid> : null}
            {feed ?
                feed.map((item ,row) => (
                    isAnswers ? <QuestionFeedAnswer key={row} answer={item} /> : <QuestionFeedQuestion key={row} question={item}/>
                ))
            : null

            }
        </Grid>
    )
}

export default QuestionFeed;