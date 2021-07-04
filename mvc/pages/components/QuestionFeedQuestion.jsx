import React, {useState} from 'react'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link'
// import {useHistory} from 'react-router-dom';
import { Typography, Chip } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root :{ 
        width: '60vw',
        margin: 15,
        cursor:'pointer'
    }
}));

const QuestionFeedQuestion = ({question}) => {
    const classes = useStyles();
    // const history = useHistory();
    const [raised, setRaised] = useState(false);

    const toggleRaised = () => {
        setRaised(prev => !prev)
    }

    const redirect = () => {
        // const path = '/question?id=' + question.questionid;
        // console.log(path)
        // history.push(path);
    }

    return (
      <Link href={'/question?id='+question.questionid}>
        <Card 
          raised={raised} 
          onMouseOver={toggleRaised}
          onMouseOut={toggleRaised}
          onClick={redirect}
          className={classes.root}
        >
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" style={{backgroundColor: '#3b3c36'}}>
                  {question.username[0]}
                </Avatar>
              }
              title={question.questiontitle}
              subheader={`${question.questiondatecreated}`}
            />
            <CardContent>
            {question.keywords ? question.keywords.map(keyword => {
                return keyword.value ?
                    <Chip style={{marginRight:5}} label={keyword.label} key={keyword.value} /> : null}
            ) : null}
            <Typography variant="body2" color="textSecondary" component="p">
            {question.questionbody}
            </Typography>

            </CardContent>
        </Card>
      </Link>
    )
}

export default QuestionFeedQuestion