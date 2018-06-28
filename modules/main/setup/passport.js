'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const UserAccount = mongoose.model('UserAccount');

const localStrategy = new LocalStrategy({
    usernameField: 'email'
}, function (email, password, callback) {
    const query = {
        email: email
    };
    const callbackFn = function (err, result) {
        if (err) {
            callback(err);
            return;
        }

        if (!result) {
            callback(null, null, {
                message: 'User not found'
            });
            return;
        }

        if (!result.isValidPassword(password)) {
            callback(null, null, {
                message: 'invalid password'
            });
            return;
        }

        callback(null, result);
    };
    UserAccount.findOne(query, callbackFn);
});

passport.use(localStrategy);