'use strict';

let router = require('express').Router();

require('../../account/routes')(router);

module.exports = router;