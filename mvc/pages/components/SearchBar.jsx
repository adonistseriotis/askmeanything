import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent:'center',
    width: '50vw',
  },
  input: {
    marginLeft: theme.spacing(1),
    width:'100%',
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function SearchBar({handleSearch, filter, setFilter}) {
  const classes = useStyles();

  return (
    <Paper className={classes.root} elevation={3}>
      <form action='/search' method='post' style={{display:'flex', width:'100%'}}>
        <TextField
          className={classes.input}
          placeholder="Search Questions"
          name="filter"
          value={filter}
          onChange={(e) => {setFilter(e.target.value)}}
          // onKeyPress={(e) => {
          //     if(e.key==='Enter')
          //         handleSearch()
          // }}
        />
        <IconButton onClick={handleSearch} className={classes.iconButton} type="submit">
          <SearchIcon />
        </IconButton>
      </form>
    </Paper>
  );
}