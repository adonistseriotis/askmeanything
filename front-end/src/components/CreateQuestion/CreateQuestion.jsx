import { Typography,Container, TextField ,Button,makeStyles,Grid } from "@material-ui/core";
import {React, useState} from "react";
import NavigationBar from '../NavigationBar/NavigationBar';

const useStyles = makeStyles((theme) => ({
    field: {
        marginTop: 20,
        marginBottom: 20,
        display: 'block'
    } ,
    submit:  {
        margin: theme.spacing(3, 0, 2),
      }
}));




export default function CreateQuestion() {
    const classes = useStyles();


    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [keywords, setKeywords] = useState('');

    const [errorMessage, setErrorMessage] = useState('');
    const [error, setError] = useState(false);

    const onTitleChange = e => {
        setTitle(e.target.value);
    }

    const onContentChange = e => {
        setContent(e.target.value);
    }

    const onKeywordsChange = e => {
        setKeywords(e.target.value);
    }

    // const handleSubmit = async () => {
    //     await createQuestion(questionTitle,questionContent,questionKeywords)
    //     .then(response => {
    //     if(response.statusText === 'OK'){
    //         setError(false);
    //         setErrorMessage("");
    //     }
    // })
    // .catch(error => {
    //     setError(true);
    //     setErrorMessage(error.response.statusText);
    // });
    // }

    // const handleEnter = (e) => {
    //     if(e.code === "Enter")
    //         handleSubmit()
    // }

  
  
  
    return (
        <Grid>
            <NavigationBar/>
            <Container>
                <Typography
                    variant = "h6"
                    color = "secondary"
                    component = "h2"
                    align = "center"
                >
                    Add a new question!
                </Typography>
                <form noValidate>
                    <TextField
                    className= {classes.field}
                    id = "title"
                    label="Title"
                    name="title"
                    autoFocus
                    value = {title}
                    variant= "outlined"
                    color = "secondary"
                    fullWidth
                    required
                    onChange={onTitleChange}
                    />
                    <TextField
                    className = {classes.field}
                    id = "content"
                    label = "Content"
                    name="content"
                    value= {content}
                    variant="outlined"
                    color = "secondary"
                    multiline
                    rows = {8}
                    fullWidth
                    required
                    onChange={onContentChange}
                    />
                    <TextField
                    className = {classes.field}
                    id = "keywords"
                    label = "Keywords"
                    name = "keywords"
                    autoFocus
                    variant="outlined"
                    color = "secondary"
                    multiline
                    fullWidth
                    required
                    onChange={onKeywordsChange}
                    />
                    <Button
                        className = {classes.submit}
                        variant ="outlined"
                        //onClick={handleSubmit}
                    >
                    
                        Submit
                    </Button>
                </form>
            </Container>
        </Grid> 
            
    );
  }