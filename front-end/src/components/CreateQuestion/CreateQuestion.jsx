import { Typography,Container, TextField ,Button,makeStyles,Grid } from "@material-ui/core";
import {React, useState , Component } from "react";
import NavigationBar from '../NavigationBar/NavigationBar';
import CreatableSelect from 'react-select/creatable';

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

const data = [
    {label: "sports", value: 1},
    {label: "music", value: 2},
    {label: "Tech", value: 3},
    {label: "Sex", value: 4}
]




export default function CreateQuestion() {
  
    

    const classes = useStyles();


    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [keywords, setKeywords] = useState('');

    const [errorMessage, setErrorMessage] = useState('');
    const [error, setError] = useState(false);

    const handleKeywordChange = (field,value) => {
        setKeywords(value)
        
    }

    const onTitleChange = e => {
        setTitle(e.target.value);
    }

    const onContentChange = e => {
        setContent(e.target.value);
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
                    rows = {12}
                    fullWidth
                    required
                    onChange={onContentChange}
                    />
                    <CreatableSelect
                    isMulti
                    isClearable
                    options = {data}
                    value ={keywords}
                    onChange = {(value) => handleKeywordChange('data',value)}
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