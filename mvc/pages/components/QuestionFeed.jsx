import React,{ useState, useEffect} from "react";
import QuestionFeedQuestion from './QuestionFeedQuestion';
import QuestionFeedAnswer from './QuestionFeedAnswer';
import { Grid, Typography} from '@material-ui/core';
import SearchBar from './SearchBar'


const QuestionFeed = ({ feed, origin, hasSearchBar, scroll }) => {
    const [isAnswers, setIsAnswers] = useState(false);
    const [title, setTitle] = useState('');
    const [filter, setFilter] = useState('');

    const handleSearch = () => {
        // search(filter)
        // .then(questions => {
        //     setFeed(questions.questions)
        //     scroll();
        // })
        // .catch(err => console.error(err))
    }

    useEffect (() => {
        switch(origin){
            case 'home':
                setTitle('Question Feed')
                setIsAnswers(false)
                break;
            
            case 'myQuestions':
                setTitle('My Questions')
                setIsAnswers(false)
                break;
            
            case 'myAnswers':
                setTitle('My Answers')
                setIsAnswers(false)
                break;
        }
        
    },[])


    return (
        <Grid container direction='column' justify='center' style={{margin:25}}>
            <Typography variant="h3" color='secondary'> {title}</Typography>
            {hasSearchBar ? <Grid item container xs={12} justify='center' ><SearchBar filter={filter} setFilter={setFilter}/></Grid> : null}
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