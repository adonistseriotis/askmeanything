var express = require('express');
var router = express.Router();
const questionFeed = require('../services/questionFeedService.js');

/* POST new question */
router.get('/', async (req, res, next) => {
    const body = req.body;

    await questionFeed(body)
    .then(result => res.status(result.status).send({...result.data}))
    .catch(error => res.status(error.status || 400).send({...error.data}))

  });
  
  module.exports = router;
  