'use strict';

const profileCtrl = require('../controllers');

module.exports = functio (router, auth) {
    router.get('/profile', profileCtrl);
};