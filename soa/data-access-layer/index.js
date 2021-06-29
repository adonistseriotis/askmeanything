const knex = require('./config/knex');
const logger = require('./services/logger');

let appInstance;

knex.raw('SELECT 1').then(() => {
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