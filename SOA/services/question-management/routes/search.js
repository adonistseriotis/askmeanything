var express = require('express');
var router = express.Router();
const search = require('../services/searchService');
const auth = require('../middleware/authorizeFirst');

/* POST new answer */
router.post('/', async (req, res) => {
    const body = req.body;
    console.log(body)
    await search(body)
    .then(result => res.status(result.status).send({...result.data}))
    .catch(error => res.status(error.status || 400).send({...error.data}))

  });
  
  module.exports = router;
  