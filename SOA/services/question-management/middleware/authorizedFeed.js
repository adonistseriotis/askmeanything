const axiosInstance = require('../config/axiosInstance');

const authorizedFeed = (req,res,next) => {
    axiosInstance.get('/authorize', {
        headers: {
            Authorization: req.headers.authorization
        }
    })
    .then(res => {
        console.log('Authorized')
        next();
    })
    .catch(err => {
        console.log('Unauthorized')
        req.params.filter = 10;
        console.log('Body request in middle', req.params)
        next();
    })
}

module.exports = authorizedFeed;