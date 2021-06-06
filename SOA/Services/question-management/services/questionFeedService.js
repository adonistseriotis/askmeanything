const axiosInstance = require("../config/axiosInstance");

const questionFeed = async (body) => {
    return await axiosInstance.get('/questionFeed', {...body})
    .then(res => {
        return {
            data: {

                questions: res.data.questions
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

module.exports = questionFeed;