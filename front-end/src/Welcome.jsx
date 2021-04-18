import { Typography } from '@material-ui/core';
import React from 'react';

const Welcome = ({name}) => {
    return (
        <Typography variant="subtitle1" color = 'primary'>Welcome, {name}</Typography>
    )
}

export default Welcome; 