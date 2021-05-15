const express = require('express');
const { knex } = require('../config/bookshelf');
const router = express.Router();
const User = require('../models/user');
const logger = require('../services/logger');

/* GET users listing. */
router.get('/', async (req, res) => {
  // await new User().fetchAll().then((users) => {
  //   res.json(users);
  // }).catch((error) => {
  //   logger.error(error);
  //   console.log(error);
  // });
  knex.raw('SELECT * FROM users').then((result) => {
    res.json(result.rows)
  })
});

module.exports = router;

