var express = require('express');
const axiosInstance = require('../../authenticator/config/axiosInstance');
var router = express.Router();
const answer = require('../services/answerService');

/* POST new answer */
router.post('/', async (req, res, next) => {
    const body = req.body;

    if(!req.headers.authorization)
        res.status(401).send({error: "Unauthorized"});
    else{

        // Service bus request for authentication 
        
        await answer(body, req.headers.authorization)
        .then(result => res.status(result.status).send({...result.data}))
        .catch(error => res.status(error.status || 400).send({...error.data}))
    }

  });
  
  module.exports = router;
  