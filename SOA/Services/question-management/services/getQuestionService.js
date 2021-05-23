const axiosInstance = require("../../authenticator/config/axiosInstance");


const getQuestion = (body) => {
    return await axiosInstance.post('/getQuestion', {...body})
    .then(res => {
        return {
            data: {
                message: res.data.message
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