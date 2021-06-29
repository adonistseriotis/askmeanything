const axiosInstance = require("../config/axiosInstance");

const healthcheck = async () => {
    return await axiosInstance.get('/healthcheck')
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
                error: err.response.data,
            },
            status: err.response.status
        }
    })
}

module.exports = healthcheck;