import { Typography,Container, TextField ,Button,makeStyles,Grid, Box } from "@material-ui/core";
import {React, useState ,useEffect} from "react";
import NavigationBar from '../NavigationBar/NavigationBar';
import Autocomplete , {createFilterOptions} from '@material-ui/lab/Autocomplete';
//import { UpdateQuestion } from '../../Services/axiosConfig'



const filter = createFilterOptions();

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
    }

}));

const data = [
    {label: "sports", value: 1},
    {label: "music", value: 2},
    {label: "Tech", value: 3},
    {label: "Sex", value: 4}
]






export default function UpdateQuestion({oldtitle,oldcontent,oldkeywords}) {
  
 
    oldtitle = 'adsfdsd'
    oldcontent = 'asdfasdf'
    oldkeywords = [
        {label: "music", value: 2},
        {label: "Tech", value: 3},
        {label: "Sex", value: 4}
    ]
    
    


    const classes = useStyles();

    const [title, setTitle] = useState(oldtitle);
    const [content, setContent] = useState(oldcontent);
    const [keywords, setKeywords] = useState(oldkeywords);



    const [errorMessage, setErrorMessage] = useState('');
    const [error, setError] = useState(false);

    const handleKeywordChange = (value) => {
        setKeywords(value)
        console.log(value)
        
    }

    const onTitleChange = e => {
        setTitle(e.target.value);
    }

    const onContentChange = e => {
        setContent(e.target.value);
    }


    const handleSubmit = () => {
        console.log(keywords)
        
    }
    const handleEnter = (e) => {
        if(e.code === "Enter")
            handleSubmit()
    }

    
    
    
  
    return (
        <Grid>
            <Container>
                <Typography
                    variant = "h6"
                    color = "primary"
                    component = "h2"
                >
                    Edit your Question!
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
                    color = "primary"
                    fullWidth
                    required
                    onChange={onTitleChange}
                    />
                    <Autocomplete
                        multiple
                        id="keywords"
                        label="Keywords"
                        name = "keywords"
                        value = {keywords}
                        options={data}
                        getOptionLabel={(option) => {
                            // e.g value selected with enter, right from the input
                            if (typeof option === 'string') {
                              return option;
                            }
                            if (option){
                            if (option.inputValue === null) {
                                return option;
                            }
                            if(option.inputValue & option){
                                return option.inputValue;
                            }
                            if (option.label) {
                              return option.label;
                            }
                            return option.label;
                        }
                            
                          }}
                        renderOption={(option)=> option.label}
                        freeSolo
                        filterOptions={(options, params) => {
                            const filtered = filter(options, params);
                            if (params.inputValue !== '') {
                              filtered.push({
                                inputValue: params.inputValue,
                                label: `Add "${params.inputValue}"`,
                                
                              });
                            }
                  
                            return filtered;
                          }}
                        onChange={(event, newValue) => {
                            setKeywords(newValue.map((item, num) => {
                                if(typeof item === 'string')
                                    return {
                                        label:item,
                                        value:num,
                                        '_isNew_': true
                                    }
                                if(item.inputValue)
                                    return {
                                        label:item.inputValue,
                                        value:num ,
                                        "__isNew__": true
                                    }
                                if(item.value)
                                    return {
                                        label:item.label,
                                        value:num
                                    }   
                            }
                            ))
                            console.log(keywords)
                          }}
                        renderInput={(params) => (
                        <TextField {...params} variant="outlined" label="Keywords" className = {classes.field}/>
                        )}
                    />
                    <TextField
                        className = {classes.field}
                        id = "content"
                        label = "Content"
                        name="content"
                        value= {content}
                        variant="outlined"
                        color = "primary"
                        multiline
                        rows = {12}
                        fullWidth
                        required
                        onChange={onContentChange}
                    />
                    <Box 
                        className = {classes.centerBox}
                        component = "span" 
                        m = {1} >
                        <Button 
                            variant ="outlined"
                            onClick={handleSubmit}
                            >
                            
                            Submit
                        </Button>
                    </Box>
                </form>
            </Container>
        </Grid>
    );
  }