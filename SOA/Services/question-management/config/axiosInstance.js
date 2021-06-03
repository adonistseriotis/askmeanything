const axios = require('axios');

// DAL 

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:3001',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

module.exports = axiosInstance;