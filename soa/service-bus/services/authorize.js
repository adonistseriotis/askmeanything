const axiosAuthenticator = require("../config/axiosAuthenticator");

const authorize = async (body, authHeader) => {
    return await axiosAuthenticator.post('/authorize', {...body}, {
        headers: {
            Authorization: authHeader
        }
    })
    .then(res => {
        return {
            data: {
                username: res.data.username,
                authorized: true
            },
            status: res.status
        }
    })
    .catch(err => {
        console.log(err.response.data)
        return {
            data: {
                error: err.response.data,
                authorized: false
            },
            status: err.response.status
        }
    })
}

module.exports = authorize;