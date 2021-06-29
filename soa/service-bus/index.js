const logger = require('./services/logger');

let appInstance;

const ExpressLoader = require('./loaders/express');

appInstance = new ExpressLoader();


module.exports = appInstance;