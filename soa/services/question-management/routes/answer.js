var express = require('express');
var router = express.Router();
const answer = require('../services/answerService');
const auth = require('../middleware/authorizeFirst');

/* POST new answer */
router.post('/', auth, async (req, res, next) => {
    const body = req.body;
    console.log(body)
    await answer(body)
    .then(result => res.status(result.status).send({...result.data}))
    .catch(error => res.status(error.status || 400).send({...error.data}))

  });
  
  module.exports = router;
  