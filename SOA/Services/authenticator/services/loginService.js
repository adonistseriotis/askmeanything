const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const JWT_SECRET = process.env.JWT_SECRET;

const User = require('../models/user');
const bcrypt = require('bcrypt');
const axiosInstance = require('../config/axiosInstance');


let pressure = process.env.PRESSURE;

passport.use('signin', new LocalStrategy(
    (username, password, done) => {
        
        // return new User({'username':username}).fetch()
        return axiosInstance.post('/getUser', { "username": username })
        .then(async res => {
            console.log(res.data['username']);
            const authenticate = await bcrypt.compare(password, res.data['password']);
            console.log('Im here', authenticate)
            const username = res.data['username'];
            const sodium = pressure + username;
            const successObject = {
                username: `${username}`, 
                sodium: `${Buffer.from(sodium).toString('base64')}`
            }
            authenticate ? done(null, successObject) : done(null,false, { message: 'Invalid password'});
           
        })
        .catch(err => {
            done(null,false, { message: err.error})
        })
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

module.exports = passport;