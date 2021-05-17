const express = require('express');
const router = express.Router();
const User = require('../models/user');

const bcrypt = require('bcrypt');

const signup = require('../services/signupService');

router.post('/', async (req, res) => {
    const body = req.body;
    
    if(!(body.username && body.password && body.email)) {
        return res.status(400).send({error: "Not valid input"});
    }

    await signup(body)
    .then(result => res.status(result.status).send({...result.data}))
    .catch(error => res.status(error.status || 400).send({...error.data}))

})

module.exports = router;
