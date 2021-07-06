import React, {useState} from 'react'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
// import {useHistory} from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { Link } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root :{ 
        width: '60vw',
        margin: 15,
        cursor:'pointer'
    }
}));

const QuestionFeedAnswer = ({answer}) => {
    // console.log('SHeeeesh',answer)
    const classes = useStyles();
    // const history = useHistory();
    const [raised, setRaised] = useState(false);

    const toggleRaised = () => {
        setRaised(prev => !prev)
    }

    const redirect = () => {
        // const path = '/question?id=' + answer.questionID;
        // console.log(path)
        // history.push(path);
    }

    return (
      <Link href={'/question?id='+answer.questionID} style={{textDecoration: 'none'}}>
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
                  {answer.username[0]}
                </Avatar>
              }
              subheader={`${answer.datetime}`}
            />
            <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
            {answer.body}
            </Typography>

            </CardContent>
        </Card>
      </Link>
    )
}

export default QuestionFeedAnswer