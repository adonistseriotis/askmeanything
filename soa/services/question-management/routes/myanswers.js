var express = require('express');
var router = express.Router();
const myanswers = require('../services/myanswersService');
const getUsername = require('../middleware/getUsername');

/* POST new question */
router.get('/', getUsername, async (req, res) => {
    const body = req.body;

    await myanswers(body)
    .then(result => res.status(result.status).send({...result.data}))
    .catch(error => res.status(error.status || 400).send({...error.data}))

  });
  
  module.exports = router;
  