import { Typography,Container, TextField ,Button,makeStyles,Grid, Box, Chip } from "@material-ui/core";
import React, {useState ,useEffect} from "react";
// import NavigationBar from '../NavigationBar/NavigationBar';
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

const UpdateQuestion = ({question, DBkeywords}) => {
    // console.log(question)
 
    // oldtitle = 'adsfdsd'
    // oldcontent = 'asdfasdf'
    // oldkeywords = [
    //     {name: "music", ID: 2},
    //     {name: "Tech", ID: 3},
    //     {name: "Sex", ID: 4}
    // ]
    
    const classes = useStyles();

    const [title, setTitle] = useState(question.questiontitle);
    const [content, setContent] = useState(question.questionbody);
    const [prevKeywords, setPrevKeywords] = useState(question.keywords)
    const [dbKeywords, setDbKeywords] = useState(DBkeywords)
    const [keywords, setKeywords] = useState([]);
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
                <form noValidate action='/update-question' method="POST">
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
                    
                    {prevKeywords.map(keyword => (
                        keyword ? <Chip style={{margin:5}} key={keyword.value} label={keyword.label} onDelete={() => setPrevKeywords(prev => prev.filter(row => row.value !== keyword.value))} /> : null
                    ))}

                    <Autocomplete
                        multiple
                        id="tags-filled"
                        name='keywords'
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
                            setKeywords(newValue.map((item, num) => {
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
                        label = "Content"
                        name="body"
                        value= {content}
                        variant="outlined"
                        color = "primary"
                        multiline
                        rows = {12}
                        fullWidth
                        required
                        onChange={onContentChange}
                    />

                    <TextField 
                        value={JSON.stringify([...prevKeywords, ...keywords])}
                        name="keywords"
                        id="formkeywds"
                        type="hidden"
                    />

                    <TextField
                        value={question.questionid}
                        name="id"
                        id='qid'
                        type='hidden'
                    />

                    <TextField
                        value='babis'
                        name='username'
                        id='username'
                        type='hidden'
                    />

                    <Box 
                        className = {classes.centerBox}
                        component = "span" 
                        m = {1} >
                        <Button 
                            variant ="outlined"
                            // onClick={handleSubmit}
                            type="submit">
                            Submit
                        </Button>
                    </Box>
                </form>
            </Container>
        </Grid>
    );
  }

  UpdateQuestion.getInitialProps = res => {
    const { query } = res;
    return { ...query };
  };

  export default UpdateQuestion;