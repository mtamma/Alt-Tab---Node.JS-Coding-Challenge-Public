'use strict';

const passport = require('passport');
const ErrorStatus = require('./account.error');

const signinCtrl = function (req, res) {
    const callbackFn = function (err, result, message) {
        if (err) {
            res.status(404);
            res.json({
                err: err
            });
            return;
        }

        if (result) {
            const token = result.generateJwt();
            res.status(200);
            res.json({
                token: token
            });
            return;
        }

        res.status(401);
        res.json(message);
    }
    passport.authenticate('local', callbackFn)(req, res);
};

module.exports = signinCtrl;