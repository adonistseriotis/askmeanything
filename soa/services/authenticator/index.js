const axiosInstance = require('./config/axiosInstance');
const logger = require('./services/logger');

let appInstance;

axiosInstance.get('/healthcheck').then((res) => {
    /* Call express loader */
    logger.info('Connected to db successfully');
    const ExpressLoader = require('./loaders/express');

    appInstance = new ExpressLoader();
    
}).catch(err => {
    /* Failed to connect to db */
    console.log(err.response || err)
    console.log('Failed to connect');
    logger.error('Failed to connect to db');
})

module.exports = appInstance;