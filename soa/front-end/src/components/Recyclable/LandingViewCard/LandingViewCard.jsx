import React, {useEffect, useState} from 'react'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import {Redirect} from 'react-router-dom';
import Link from '@material-ui/core/Link'

import cardStyle from './LandingViewCardStyle';
import { Typography } from '@material-ui/core';
import PieChart from '../../Charts/PieChart';
import { getQuestionsPerKeyword, getQuestionsPerDay, myQuestionsPerDay } from '../../../Services/axiosConfig';

const useStyles = makeStyles(cardStyle);

const LandingViewCard = ({title, subtitle, chartType, chartTitle, link, isChart, isAnchor=false, onClick=null}) => {
    const classes = useStyles();
    const [chartData, setChartData] = useState(null)

    const getChartData = () => {
      switch(chartTitle){
        case "QuestionsPerKeyword":
          getQuestionsPerKeyword()
          .then(data => {
            console.log(data)
            const format = data.data.map(row => ([row.name, parseInt(row.count)]))
            format.unshift(['Keywords','Questions Per Keyword'])
            console.log("data to be inserted",format)
            setChartData(format)
          })
          .catch(err => console.log(err))
          break;
        
        case "QuestionsPerDay":
          getQuestionsPerDay()
          .then(data => {
            console.log(data)
            const format = data.data.map(row => ([new Date(row.day), parseInt(row.count)]))
            format.unshift([{ type: 'date', id: 'Date' }, { type: 'number', id: 'Questions/Day' }] )
            console.log("data to be inserted",format)
            setChartData(format)
          })
          .catch(err => console.log(err))
        
        case "MyQuestionsPerDay":
          myQuestionsPerDay()
          .then(data => {
            console.log(data)
            const format = data.data.map(row => ([new Date(row.day), parseInt(row.count)]))
            format.unshift([{ type: 'date', id: 'Date' }, { type: 'number', id: 'Questions/Day' }] )
            console.log("data to be inserted",format)
            setChartData(format)
          })
          .catch(err => console.log(err))
        default:
          break;
      }
    }

    useEffect(() => {
      getChartData();
    }, [])

    return (
        <Card 
          className={isChart ? ( chartType==="Calendar" ? classes.calendar : classes.rootChart) : isAnchor ? classes.anchor : classes.root}
          onClick={onClick ? onClick : void(0)}
          >
            <CardHeader
              title={title}
              subheader={subtitle}
            /> 
            {isChart ?
            <PieChart 
                chartType={chartType}
                title={chartTitle}
                data={chartData}
                label='Keywords'
                header='Questions Per Keyword'
              /> : null}
        </Card>
    )
}

export default LandingViewCard