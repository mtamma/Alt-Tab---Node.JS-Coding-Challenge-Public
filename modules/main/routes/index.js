'use strict';

const router = require('express').Router();
const expressJwt = require('express-jwt');

const auth = expressJwt({
    secret: 'TEMPORARY_PASS',
    userProperty: 'payload'
});
require('../../account/routes')(router, auth);

module.exports = router;