var express = require('express');
var router = express.Router();
const keywords = require('../services/keywordsService');

/* POST new answer */
router.get('/', async (req, res) => {

    await keywords()
    .then(result => res.status(result.status).send({...result.data}))
    .catch(error => res.status(error.status || 400).send({...error.data}))

  });
  
  module.exports = router;
  