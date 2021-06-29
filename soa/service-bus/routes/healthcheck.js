var express = require('express');
var router = express.Router();
const healthcheck = require('../services/healthcheck');

/* GET questions per keyword*/
router.get('/', async (req, res, next) => {
    const body = req.body;

    await healthcheck(body)
    .then(result => res.status(result.status).send({...result.data}))
    .catch(error => res.status(error.status || 400).send({...error.data}))

  });
  
  module.exports = router;
  