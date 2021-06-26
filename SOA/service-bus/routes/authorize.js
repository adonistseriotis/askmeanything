var express = require('express');
var router = express.Router();
const authorize = require('../services/authorize');

/* GET questions per keyword*/
router.get('/', async (req, res, next) => {
    const body = req.body;

    await authorize(body, req.headers.authorization)
    .then(result => res.status(result.status).send({...result.data}))
    .catch(error => res.status(error.status || 400).send({...error.data}))

  });
  
  module.exports = router;
  