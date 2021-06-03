const axiosInstance = require("../../authenticator/config/axiosInstance");


const answer = async (body, authHeader) => {
    return await axiosInstance.post('/answer', {...body}, {
        headers: {
            Authorization: authHeader
        }
    })
    .then(res => {
        return {
            data: {
                message: res.data.questionID
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

module.exports = answer;