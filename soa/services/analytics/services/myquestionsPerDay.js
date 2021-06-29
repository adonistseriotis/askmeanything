const axiosInstance = require("../config/axiosDAL");

const myquestionsPerKeyword = async (body, authHeader) => {
    return await axiosInstance.post('/myquestionsperday', {...body}, {
        headers: {
            Authorization: authHeader
        }
    })
    .then(res => {
        return {
            data: {
                data: res.data.chartData
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

module.exports = myquestionsPerKeyword;