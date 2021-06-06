import { Typography,Container, TextField ,Button,makeStyles,Grid, Box, Divider } from "@material-ui/core";
import {React, useState, useEffect} from "react";
import { getQuestion } from '../../Services/axiosConfig'
import { useHistory } from 'react-router-dom';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import ErrorPage from '../ErrorPage/ErrorPage';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((theme) => ({
    field: {
        marginTop: 20,
        marginBottom: 20,
        display: 'block'
    } ,
    submit:  {
        margin: theme.spacing(2, 5, 0),
      } ,
    centerBox: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-end"
    },
    initText: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1)
    },
    questionBody: {
        margin: theme.spacing(5)
    },
    paper: {
    padding: '6px 16px',
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },

}));

export default function GetQuestion() {
    const [question, setQuestion] = useState(null);
    const history = useHistory();
    
    
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const id = params.has('id') ? params.get('id') : -1;
        if(id < 1)
        {
            history.push("/home");
        }

        getQuestion(id)
        .then(res => {
            setQuestion(res.question[0])
            console.log(res.question[0])
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    const classes = useStyles();

    return (
        question ?
        (question.questionid ?
        <Grid container alignContent={'center'} justify={'center'} /* style={{backgroundColor:'blue'}} */>
            <Grid item container xs={10} /* style={{backgroundColor:'red'}} */>
                <Grid item container>
                    <Typography variant='h4' color='textPrimary'>{question.questiontitle}</Typography>
                </Grid>

                <Grid item container direction={'row'} xs={12} /* style={{backgroundColor:'green'}} */>
                    <Grid container item xs={3} direction={'row'} alignItems={'baseline'} className={classes.initText} /* style={{backgroundColor: 'red'}} */>
                        <Typography variant='subtitle1' color='textSecondary' >
                            Created At: 
                        </Typography>
                        <Typography variant='body2' style={{marginLeft: 5}}>
                            {question.questiondatecreated}
                        </Typography>
                    </Grid>
                    {question.questionisedited ?
                        <Grid item container xs={3} direction={'row'} alignItems={'baseline'} className={classes.initText}>
                            <Typography variant='subtitle1' color='textSecondary' >
                                Updated At: 
                            </Typography>
                            <Typography variant='body2' style={{marginLeft: 5}}>
                                {question.questiondateupdated}
                            </Typography>
                        </Grid>
                    : null}
                </Grid>

                <Grid item container xs={12} style={{backgroundColor:'black'}}>
                    <Divider variant="middle"/>
                </Grid>
                <Grid item container className={classes.questionBody}>
                    <Typography variant='body2' color='primary'>{question.questionbody}</Typography>
                </Grid>
            </Grid>
            <Grid item container xs={10} /* style={{backgroundColor:'red'}} */>
            <Timeline align="alternate">
                {question.answers.map(answer => {
                return (
                    <TimelineItem key={answer.answerID}>
                    <TimelineOppositeContent>
                    <Typography variant="body2" color="textSecondary">
                        {answer.datetime}
                    </Typography>
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                    <TimelineDot>
                        {/* <FastfoodIcon/> */}
                    </TimelineDot>
                    <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                    <Paper elevation={3} className={classes.paper}>
                        <Typography variant="h6" component="h1">
                        {answer.username}
                        </Typography>
                        <Typography>{answer.body}</Typography>
                    </Paper>
                    </TimelineContent>
                </TimelineItem>)
                })}
            </Timeline> 
            </Grid>
        </Grid> 
            : <ErrorPage/>)
            : <LoadingScreen/> 
    )
  }