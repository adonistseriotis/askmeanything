const logger = require('./services/logger');
const axiosInstance = require('./config/axiosInstance');

let appInstance;

axiosInstance.get('/healthcheck')
.then(() => {
    /* Call express loader */
    logger.info("Database connection successful");
    const ExpressLoader = require('./loaders/express');

    appInstance = new ExpressLoader();
    
}).catch(err => {
    /* Failed to connect to db */
    console.log(err);
    logger.error(err);
})

module.exports = appInstance;
