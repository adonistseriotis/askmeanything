const axiosInstance = require('../config/axiosDAL');

const keywords = async (param) => {
    return await axiosInstance.get('/keywords')
    .then(res => {
        return {
            data: {
                keywords: res.data.keywords
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

module.exports = keywords;