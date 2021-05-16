import React, {useState} from 'react'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import {Redirect} from 'react-router-dom';

import cardStyle from './LandingViewCardStyle';

const useStyles = makeStyles(cardStyle);

const LandingViewCard = ({title, subtitle, link}) => {
    const [raised, setRaised] = useState(false);

    const classes = useStyles();

    const toggleRaised = () => {
        setRaised(prev => !prev)
    }

    return (
        <Card 
          raised={raised} 
          onMouseOver={toggleRaised}
          onMouseOut={toggleRaised}
          className={classes.root}
          >
            <CardHeader
              title={title}
              subheader={subtitle}
            />
        </Card>
    )
}

export default LandingViewCard