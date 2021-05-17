const express = require('express');
const router = express.Router();
const passport = require('../services/loginService');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;


router.post('/', passport.authenticate('signin', {session:false}),
(req, res) => {
    res.json({token: jwt.sign(req.user, JWT_SECRET, {expiresIn: 3600 })});
}
);

module.exports = router;
