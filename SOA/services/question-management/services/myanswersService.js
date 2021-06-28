const axiosInstance = require('../config/axiosDAL');

const myanswers = async (body) => {
    return await axiosInstance.post('/myanswers', {...body})
    .then(res => {
        return {
            data: {
                answers: res.data.answers
            },
            status: res.status
        }
    })
    .catch(err => {
        console.log(err.response.data)
        return {
            data: {
                error: err.response.data.error
            },
            status: err.response.status
        }
    })
}

module.exports = myanswers;