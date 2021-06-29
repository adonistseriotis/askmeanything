var express = require('express');
var router = express.Router();
const getQuestion = require('../services/getQuestionService');

/* POST new question */
router.get('/', async (req, res) => {
    const params = req.query;

    await getQuestion(params)
    .then(result => res.status(result.status).send({...result.data}))
    .catch(error => res.status(error.status || 400).send({...error.data}))

  });
  
  module.exports = router;
  