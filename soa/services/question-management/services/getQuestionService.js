const axiosInstance = require('../config/axiosDAL');

const getQuestion = async (param) => {
    return await axiosInstance.get('/getQuestion', {params: { questionID: param.questionID}})
    .then(res => {
        return {
            data: {
                question: res.data.question
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

module.exports = getQuestion;