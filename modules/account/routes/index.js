'use strict';

module.exports = function (router, auth) {
    require('./account.signin.route')(router);
    require('./account.signup.route')(router);
    require('./account.profile.route')(router, auth);
};