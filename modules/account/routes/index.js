'use strict';

module.exports = function (router) {
    require('./account.signin.route')(router);
    require('./account.signup.route')(router);
    require('./account.profile.route')(router);
};