const express = require('express');
const router = express.Router();

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const jwt = require('jsonwebtoken');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const JWT_SECRET = 'sheerosheero';

const User = require('../models/user');
const bcrypt = require('bcrypt');

passport.use('signin', new LocalStrategy(
    (username, password, done) => {
        
        return new User({'username':username}).fetch()
        .then(async user => {
            const authenticate = await bcrypt.compare(password, user.get('password'));
            console.log('Im here', authenticate)
            authenticate ? done(null, {message: `${user.get('username')} is now authorized`}) : done(null,false, { message: 'Invalid password'});
           
        })
        .catch(err => done(null,false, { message: 'No such user'}))
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
