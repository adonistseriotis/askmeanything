const axiosInstance = require("../../authenticator/config/axiosInstance");


const createQuestion = (body, authHeader) => {
    return await axiosInstance.post('/dal/createQuestion', {...body}, {
        headers: {
            Authorization: authHeader
        }
    })
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

module.exports = createQuestion;