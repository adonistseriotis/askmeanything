const axiosInstance = require('../config/axiosInstance');

const getUsername = (req,res,next) => {
    axiosInstance.get('/authorize', {
        headers: {
            Authorization: req.headers.authorization
        }
    })
    .then(res => {
        req.body.username = res.data.username
        next();
    })
    .catch(err => {
        console.log(err.response.data)
        res.status(401).json({
            error: err.response.data.error || err
        })
    })
}

module.exports = getUsername;