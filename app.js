'use strict';

let express = require('express');
const routes = require('./modules/main/routes');

require('./modules/main/model').init;
let app = express();

app.use('/api', routes);
//catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

module.exports = app;
