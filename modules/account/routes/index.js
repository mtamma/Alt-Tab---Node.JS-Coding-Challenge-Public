'use strict';

const expressJwt = require('express-jwt');

module.exports = function (router) {
    const auth = expressJwt({
        secret: 'TEMPORARY_PASS',
        userProperty: 'payload'
    });
    require('./account.signin.route')(router);
    require('./account.signup.route')(router);
    require('./account.profile.route')(router, auth);
};