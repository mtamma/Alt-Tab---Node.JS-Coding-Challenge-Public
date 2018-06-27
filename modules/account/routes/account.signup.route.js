'use strict';

const signupCtrl = require('../controllers').signupCtrl;

module.exports = function (router) {
    router.post('/register', signupCtrl);
};