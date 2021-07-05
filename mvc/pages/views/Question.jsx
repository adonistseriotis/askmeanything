import { Typography,Chip, TextField ,Button,makeStyles,Grid, Box, Divider } from "@material-ui/core";
import React, {useState, useEffect} from "react";
import LoadingScreen from '../components/LoadingScreen';
import ErrorPage from '../components/ErrorPage';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import CreateIcon from '@material-ui/icons/Create'
import Paper from '@material-ui/core/Paper';
import { Link } from "@material-ui/core";
import Tooltip from '@material-ui/core/Tooltip';
import { answer } from '../config/axiosConfig';
import { getUsername } from "../config/auth";


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
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block'
    } ,
  submit:  {
    margin: theme.spacing(2, 5, 0),
  },
}));

function GetQuestion(props) {
    const question = props.question;
    console.log(props)
    // const [question, setQuestion] = useState(null);
    const [newAnswer, setNewAnswer] = useState('');
    // const [refresh, setRefresh] = useState(false);

    const onNewAnswerChange = (e) => {
        setNewAnswer(e.target.value)
    }

    const handleSubmit = () => {
        answer(question.questionid, newAnswer)
        .then(res => {
            console.log(res);
            // setRefresh(prev => !prev)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const handleUpdate = () => {
        // history.push('/update-question?id='+question.questionid)
    }
    
    // useEffect(() => {
    //     const params = new URLSearchParams(window.location.search);
    //     const id = params.has('id') ? params.get('id') : -1;
    //     if(id < 1)
    //     {
    //         // history.push("/home");
    //     }

    //     getQuestion(id)
    //     .then(res => {
    //         setQuestion(res.question[0])
    //         console.log(res.question[0])
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
    // }, [refresh])

    const classes = useStyles();

    return (
        question ?
        (question.questionid ?
            <Grid container alignContent={'center'} justify={'center'} /* style={{backgroundColor:'blue'}} */>
                <Grid item container xs={10} /* style={{backgroundColor:'red'}} */>
                    <Grid item container>
                        <Typography variant='h4' color='textPrimary'>{question.questiontitle}</Typography>
                    </Grid>

                    <Grid item container direction={'row'} xs={12} /* style={{backgroundColor:'red'}} */ >
                        {question.keywords[0].label ? question.keywords.map(keyword => (
                            <Chip style={{margin:5}} label={keyword.label} key={keyword.value} />
                        )) : null}
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
                        <div style={{flex: 1}} />
                        <Tooltip title="Update question">
                            <Link href={"/update-question?id=" + question.questionid}>
                                <CreateIcon />
                            </Link>
                        </Tooltip>
                    </Grid>

                    <Grid item container xs={12} style={{backgroundColor:'black'}}>
                        <Divider variant="middle"/>
                    </Grid>
                <Grid item container className={classes.questionBody}>
                    <Typography variant='body2' color='primary' style={{fontSize: '1.5rem'}}>{question.questionbody}</Typography>
                </Grid>
            </Grid>
                <Grid item container xs={10} /* style={{backgroundColor:'red'}} */>
                <Timeline align="alternate">
                    {question.answers[0].answerID ? question.answers.map((answer, row) => {
                        const isOdd = row % 2 === 0 ? false : true;
                        const isLast = (row === question.answers.length-1);
                        return (
                            <TimelineItem key={answer.answerID}>
                            <TimelineOppositeContent>
                            <Typography variant="body2" color="textSecondary">
                                {answer.datetime}
                            </Typography>
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                            <TimelineDot color={isOdd ? "secondary" : "primary"}>
                                <QuestionAnswerIcon/>
                            </TimelineDot>
                            {isLast ? null : <TimelineConnector />}
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
                        }): null}
                </Timeline> 
                
            </Grid>
                <Grid item container xs={10} /* style={{backgroundColor:'red'}} */>
                    <form noValidate style={{width:'100%'}} id='newAnswer' action='/answer' method="post">
                        <TextField
                            className = {classes.field}
                            id = "answer"
                            label = "Answer"
                            name="body"
                            value= {newAnswer}
                            variant="outlined"
                            color = "primary"
                            multiline
                            rows = {3}
                            fullWidth
                            required
                            onChange={onNewAnswerChange}
                        />
                        <TextField
                            id="questionid"
                            name="qid"
                            value={question.questionid}
                            hidden={true}
                            type="hidden"
                        />
                        <TextField
                            id="username"
                            name="username"
                            value={'babis'}
                            hidden={true}
                            type="hidden"
                        />
                        <Box 
                            className={classes.centerBox}
                            component="span" 
                            m={1}
                            >
                            <Button
                                variant="outlined"
                                onClick={()=> setNewAnswer('')}
                                style={{marginRight:5}}
                            >
                                Never Mind
                            </Button>
                            <Button 
                                variant ="outlined"
                                type="submit"
                                form="newAnswer"
                                value="Submit"
                            >
                                Submit
                            </Button>
                        </Box>
                    </form>
                </Grid>
            </Grid> 
                : <ErrorPage/>)
                : <LoadingScreen/> 
    )
  }

  GetQuestion.getInitialProps = res => {
    const { query } = res;
    return { ...query };
  };

export default GetQuestion;