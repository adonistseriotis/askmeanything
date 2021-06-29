var express = require('express');
var router = express.Router();
const questionFeed = require('../services/questionFeedService.js');
const authorizedFeed = require('../middleware/authorizedFeed');

/* POST new question */
router.get('/', authorizedFeed, async (req, res, next) => {
    const body = req.params;
    console.log('Bodt filter by middleware',body)

    await questionFeed(body)
    .then(result => res.status(result.status).send({...result.data}))
    .catch(error => res.status(error.status || 400).send({...error.data}))

  });
  
  module.exports = router;
  