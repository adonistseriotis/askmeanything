const axiosInstance = require("../config/axiosInstance");

const createQuestion = async (body, authHeader) => {
    return await axiosInstance.post('/createQuestion', {...body}, {
        headers: {
            Authorization: authHeader
        }
    })
    .then(res => {
        return {
            data: {
                questionID: res.data.message
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