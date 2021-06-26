var express = require('express');
var router = express.Router();
const createQuestion = require('../services/createQuestionService');
const auth = require('../middleware/authorizeFirst');

/* POST new question */
router.post('/', auth, async (req, res) => {
    const body = req.body;

        // Service bus request for authentication 
        
    await createQuestion(body, req.headers.authorization)
    .then(result => res.status(result.status).send({...result.data}))
    .catch(error => res.status(error.status || 400).send({...error.data}))
});
  
  module.exports = router;
  