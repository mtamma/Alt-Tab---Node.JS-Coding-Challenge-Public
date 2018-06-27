'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./modules/main/routes');
global._ = require('lodash');

require('./modules/main/model').init;
let app = express();

app.use('/api', routes);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

module.exports = app;
