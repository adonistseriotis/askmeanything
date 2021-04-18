var dbConfig = require('./db');
var knex = require('knex')(dbConfig);

module.exports = knex;