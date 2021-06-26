const axiosInstance = require('../config/axiosDAL');

const answer = async (body, authHeader) => {
    return await axiosInstance.post('/answer', {...body})
    .then(res => {
        console.log('Yoo',res.data)
        return {
            data: {
                questionID: res.data.questionID
            },
            status: res.status
        }
    })
    .catch(err => {
        console.log(err)
        console.log(err.response.data)
        return {
            data: {
                error: err.response.data.error
            },
            status: err.response.status
        }
    })
}

module.exports = answer;