const express = require('express');
const router = express.Router();

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const jwt = require('jsonwebtoken');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const JWT_SECRET = 'sheerosheero';

const User = require('../models/user');

passport.use('signin', new LocalStrategy(
    (username, password, done) => {
        return User.login(username, password)
                .then(res => done(null, {message: `${res.username} is now authenticated.`}))
                .catch(error => done(error, false))
    }
))

passport.use('token', new JWTstrategy(
    {
        secretOrKey: JWT_SECRET,
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    },
    (token, done) => {
        return done(null, { username: token.username });
    }
));

router.post('/', 
    passport.authenticate('signin', {session:false}),
    (req, res, next) => {
        res.json({token: jwt.sign(req.user, JWT_SECRET, {expiresIn: 3600 })});
    }
);

module.exports = router;
