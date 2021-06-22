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

const options = [
    {name: "sports", ID: 1},
    {name: "music", ID: 2},
    {name: "Tech", ID: 3},
    {name: "Sex", ID: 4}
]

export default function UpdateQuestion({oldtitle, oldcontent, oldkeywords}) {
  
 
    oldtitle = 'adsfdsd'
    oldcontent = 'asdfasdf'
    oldkeywords = [
        {name: "music", ID: 2},
        {name: "Tech", ID: 3},
        {name: "Sex", ID: 4}
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

    const getMax = () => {
        return options.length + 1
    }

    useEffect(() => {
        console.log(keywords)
    },[keywords])

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
                        options={options}
                        getOptionLabel={(selected) => {
                            // e.g value selected with enter, right from the input
                            return selected.name
                        }}
                        // renderOption={(option)=> option.label}
                        freeSolo
                        filterOptions={(options, params) => {
                            const re = new RegExp(`.*${params.inputValue}.*`)
                            const filtered = options.filter(option => re.test(option.name))
                            
                            if(filtered.length === 0){
                                filtered.push({
                                    name: `Add keyword "${params.inputValue}"`,
                                    ID: getMax()
                                })
                            }
                            
                            return filtered
                        }}
                        onChange={(event, keywords) => {
                            const newKeywords = keywords.map(keyword => {
                                if(typeof keyword === 'string'){
                                    //means it's new
                                    return {
                                        name: keyword,
                                        ID: getMax()
                                    }
                                }
                            })
                            
                            setKeywords(newKeywords)
                        }}
                        renderInput={(params) => {
                            return <TextField {...params} variant="outlined" label="Keywords" className = {classes.field}/>
                        }}
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