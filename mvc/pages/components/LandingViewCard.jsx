import React, {useEffect, useState} from 'react'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { makeStyles } from '@material-ui/core/styles';
import PieChart from './PieChart';

const cardStyle = {
  anchor: {
      heigth: '25vh',
      width :'30vw',
      margin: 10,
      cursor:'pointer',
      justify:'center'
  },
  root:{
      height: '50vh',
      width :'30vw',
      margin: 10,
      cursor:'pointer',
      justify:'center'
  },
  rootChart: {
      height: '50vh',
      width :'30vw',
      margin: 10,
      justify:'center',
  },
  calendar: {
      height: '50vh',
      width: '50vw',
      margin: 10,
      justify:'center',
      spacing: 0
  }
}

const useStyles = makeStyles(cardStyle);

const LandingViewCard = ({title, rawChartData=[], subtitle, chartType, chartTitle, link, isChart, isAnchor=false, onClick=null}) => {
    const classes = useStyles();
    const [chartData, setChartData] = useState(null)
    let format;
    // getChartData();

    const getChartData = () => {
      switch(chartTitle){
        case "QuestionsPerKeyword":
          // getQuestionsPerKeyword()
          // .then(data => {
          //   console.log(data)
            format = rawChartData.map(row => ([row.name, parseInt(row.count)]))
            format.unshift(['Keywords','Questions Per Keyword'])
            setChartData(format)
            // console.log(format)
          // })
          // .catch(err => console.log(err))
          break;
        
        case "QuestionsPerDay":
          // getQuestionsPerDay()
          // .then(data => {
          //   console.log(data)
          //   const format = data.data.map(row => ([new Date(row.day), parseInt(row.count)]))
          //   format.unshift([{ type: 'date', id: 'Date' }, { type: 'number', id: 'Questions/Day' }] )
          //   console.log("data to be inserted",format)
          //   setChartData(format)
          // })
          // .catch(err => console.log(err))
            format = rawChartData.map(row => ([new Date(row.day), parseInt(row.count)]))
            format.unshift([{ type: 'date', id: 'Date' }, { type: 'number', id: 'Questions/Day' }] )
            setChartData(format)
          break;
        
        case "MyQuestionsPerDay":
          // myQuestionsPerDay()
          // .then(data => {
          //   console.log(data)
            format = rawChartData.map(row => ([new Date(row.day), parseInt(row.count)]))
            format.unshift([{ type: 'date', id: 'Date' }, { type: 'number', id: 'Questions/Day' }] )
          //   console.log("data to be inserted",format)
            setChartData(format)
          // })
          // .catch(err => console.log(err))
          break;

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