import React from 'react';
import { Link } from 'react-router-dom';
import PageNotFound from '../../assets/images/404.png'

class ErrorPage extends React.Component{
    render(){
        return <div style={{display:'flex', justifyContent: 'center'}}>
            <img src={PageNotFound} style={{height:'80vh'}}/>
          </div>;
    }
}

export default ErrorPage;