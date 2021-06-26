const axios = require('axios');

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:4000',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

module.exports = axiosInstance;