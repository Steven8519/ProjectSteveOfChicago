/**
 * Created by stevenmcdonald on 2/26/17.
 */
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/database');

// Authentication setup with passport.
module.exports = function(passport) {
    let options = {};
    options.jwtFromRequest = ExtractJwt.fromAuthHeader();
    options.secretOrKey = config.secret;
    passport.use(new JwtStrategy(options, function(jwt_payload, done) {
        User.getUserById(jwt_payload._doc._id, function(error, user) {
            if(error){
                return done(error, false);
            }

            if(user){
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }));
};