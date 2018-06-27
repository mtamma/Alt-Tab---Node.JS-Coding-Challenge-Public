'use strict';

const signinCtrl = require('../controllers').accountCtrl;

module.exports = function (router) {
    router.post('/login', signinCtrl);
};