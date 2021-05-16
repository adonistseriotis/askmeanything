const express = require('express');
const router = express.Router();
const User = require('../models/user');

const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    const body = req.body;
    
    if(!(body.username && body.password && body.email)) {
        return res.status(400).send({error: "Not valid input"});
    }

    const newUser = User.forge({
        username: body.username,
        password: body.password,
        email: body.email
    }).save()
    .then((savedModel) => 
        res.status(201).send({...savedModel.toJSON(), message:"User successfully created!"}))
    .catch((error) => {
        console.log(error);
        res.status(400).send({error: error.detail});
    })

})

module.exports = router;
