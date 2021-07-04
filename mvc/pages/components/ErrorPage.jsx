import React from 'react';

class ErrorPage extends React.Component{
    render(){
        return <div style={{display:'flex', justifyContent: 'center'}}>
            <img src={PageNotFound} style={{height:'80vh'}}/>
          </div>;
    }
}

export default ErrorPage;