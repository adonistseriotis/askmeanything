var express = require('express');
const axiosInstance = require('../../authenticator/config/axiosInstance');
var router = express.Router();
const questionsPerDay = require('../services/questionsPerDay');

/* GET questions per keyword*/
router.get('/', async (req, res, next) => {
    const body = req.body;

    await questionsPerDay(body, req.headers.authorization)
    .then(result => res.status(result.status).send({...result.data}))
    .catch(error => res.status(error.status || 400).send({...error.data}))

  });
  
  module.exports = router;
  