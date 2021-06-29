var express = require('express');
var router = express.Router();
const myquestionsPerDay = require('../services/myquestionsPerDay');
const getUsername = require('../middleware/getUsername');

/* GET questions per keyword*/
router.get('/', getUsername, async (req, res, next) => {
    const body = req.body;

    await myquestionsPerDay(body, req.headers.authorization)
    .then(result => res.status(result.status).send({...result.data}))
    .catch(error => res.status(error.status || 400).send({...error.data}))

  });
  
  module.exports = router;
  