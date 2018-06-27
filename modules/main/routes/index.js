'use strict';

const router = require('express').Router();
const jwt = require('express-jwt');

require('../../account/routes')(router);

module.exports = router;