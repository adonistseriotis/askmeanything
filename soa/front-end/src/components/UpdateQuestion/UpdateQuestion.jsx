import { Typography,Container, TextField ,Button,makeStyles,Grid, Box , Chip} from "@material-ui/core";
import {React, useState ,useEffect} from "react";
import NavigationBar from '../NavigationBar/NavigationBar';
import Autocomplete , {createFilterOptions} from '@material-ui/lab/Autocomplete';
//import { UpdateQuestion } from '../../Services/axiosConfig'
import { getQuestion, getKeywords } from '../../Services/axiosConfig'



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
    },
    chip: {
        margin: theme.spacing(0.5),
      },
    chips: { 'list-style' : 'none' 
    }

}));


export default function UpdateQuestion() {
  
 
  
    

    
    const classes = useStyles();
    const [question, setQuestion] = useState(null);
    const [title, setTitle] = useState(null);
    const [content, setContent] = useState(null);
    const [keywords, setKeywords] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [error, setError] = useState(false);
    const [dbKeywords,setDbKeywords] = useState('')
    const [NewKeywords,setNewKeywords] = useState('')


        


    useEffect(() => {
        
        getKeywords()
            .then(data => {
                setDbKeywords(data.keywords)
            })
            .catch(err => console.error(err))

        const params = new URLSearchParams(window.location.search);
        const id = params.has('id') ? params.get('id') : -1;
        if(id < 1)
            {
                window.history.push("/home");
            }
    
        getQuestion(id)
        .then(res => {
                setQuestion(res.question[0])
                console.log("hi",res.question[0].keywords)
                setTitle(res.question[0].questiontitle)
                setKeywords(res.question[0].keywords)
                setContent(res.question[0].questionbody)
            })
            .catch(err => {
                console.log(err)
            })

    }, [])

    const handleDelete = (chipToDelete) => () => {
        setKeywords((keywords) => keywords.filter((keyw) => keyw.value !== chipToDelete.value));
        console.log(chipToDelete)
      };

    
    

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
                <Grid item container direction={'row'} xs={12} > 
                    {keywords.map((keyword) => {
                        
                        return (
                        <li key={keyword.value} className = {classes.chips}>
                            <Chip
                            label={keyword.label}
                            onDelete={handleDelete(keyword)}
                            className={classes.chip}
                            />
                        </li>
                        );
                    })}
                        
                        
                </Grid>
                <form noValidate>
                    <TextField
                    className= {classes.field}
                    id = "title"
                    //label="Title"
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
                        id="tags-filled"
                        options={dbKeywords}
                        getOptionLabel={(option) => {
                            // e.g value selected with enter, right from the input
                            if (typeof option === 'string') {
                                return option;
                            }
                            if (option.inputValue) {
                                return option.inputValue;
                            }
                            if (option.label) {
                                return option.label;
                            }
                            return option.label;
                        }}
                        renderOption={(option) => option.label}
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
                            setNewKeywords(newValue.map((item, num) => {
                                if (typeof item === 'string')
                                    return {
                                        label: item,
                                        value: num,
                                        '_isNew_': true
                                    }
                                if (item.inputValue)
                                    return {
                                        label: item.inputValue,
                                        value: num,
                                        "__isNew__": true
                                    }
                                if (item.value)
                                    return {
                                        label: item.label,
                                        value: num
                                    }
                            }))
                    
                        }}
                        renderInput={(params) => (
                            <TextField {...params} variant="outlined" label="Keywords" className={classes.field} />
                        )}
                    />
                    <TextField
                        className = {classes.field}
                        id = "content"
                        //label = "Content"
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