const dbConfig = require('./db');


module.exports = require('knex')(dbConfig);