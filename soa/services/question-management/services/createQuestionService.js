const axiosInstance = require('../config/axiosDAL');

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
        throw {
            data: {
                error: err.response.data.error
            },
            status: err.response.status
        }
    })
    
}

module.exports = createQuestion;