'use strict';

const profileCtrl = require('../controllers').profileCtrl;

module.exports = function (router, auth) {
    router.get('/profile', profileCtrl);
};