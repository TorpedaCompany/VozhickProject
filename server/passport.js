const app = new(require('express').Router)();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./database/models').users;
const bCrypt = require('bcryptjs');

module.exports = function(passport) {

    passport.use('login', new LocalStrategy({
            usernameField: 'phone',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, phone, password, done) {
            // check in mongo if a user with username exists or not
            User.findOne({ 'phone': phone },
                function(err, user) {
                    // In case of any error, return using the done method
                    if (err)
                        return done(err);
                    // Username does not exist, log the error and redirect back
                    if (!user) {
                        // console.log('User Not Found with user ' + phone);
                        return done(null, false, req.flash('message', 'User Not found.'));
                    }
                    // User exists but wrong password, log the error
                    if (!isValidPassword(user, password)) {
                        // console.log('Invalid Password');
                        return done(null, false, req.flash('message', 'Invalid Password')); // redirect back to login page
                    }
                    // User and password both match, return user from done method
                    // which will be treated like success
                    return done(null, user);
                }
            );

        }));


    var isValidPassword = function(user, password) {
        return bCrypt.compareSync(password, user.password);
    }

    passport.serializeUser(function(user, done) {
        // console.log('serializing user: ');
        // console.log(user);
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            // console.log('deserializing user:', user.firstName);
            done(err, user);
        });
    });
    passport.isAuthenticated = function(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/');
    }
}