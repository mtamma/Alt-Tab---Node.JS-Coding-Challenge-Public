'use strict';

const signinCtrl = require('../controllers').signinCtrl;

module.exports = function (router) {
    router.post('/login', signinCtrl);
};