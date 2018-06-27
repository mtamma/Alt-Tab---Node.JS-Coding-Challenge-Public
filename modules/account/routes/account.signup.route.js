'use strict';

const accountCtrl = require('../controllers');

module.exports = function (router) {
    router.post('/register', accountCtrl);
};



