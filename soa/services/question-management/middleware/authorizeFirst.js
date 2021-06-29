const axiosInstance = require('../config/axiosInstance');

const authorizeFirst = (req,res,next) => {
    axiosInstance.get('/authorize', {
        headers: {
            Authorization: req.headers.authorization
        }
    })
    .then(res => {
        if(req.body.username != res.data.username){
            throw {
                response: {
                    data: {
                        error:'Invalid username'
                    }
                }
            };
        }
        else
            next();
    })
    .catch(err => {
        console.log(err.response.data)
        res.status(401).json({
            error: err.response.data.error || err
        })
    })
}

module.exports = authorizeFirst;