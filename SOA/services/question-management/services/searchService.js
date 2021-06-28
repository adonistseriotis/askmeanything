const axiosInstance = require('../config/axiosDAL');

const answer = async (body) => {
    return await axiosInstance.post('/search', {...body})
    .then(res => {
        console.log('Yoo',res.data)
        return {
            data: {
                questions: res.data.questions
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