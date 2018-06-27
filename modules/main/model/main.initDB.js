'use strict';

let mongoose = require('mongoose');

const dbName = 'backendTest';
const dbConnectionString = `mongodb://localhost:27017/ ${ dbName }`;
mongoose.connect(dbConnectionString);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection to db error'));
db.once('open', function () {
    console.log('mongoDB connected');
});

// bring in your schema & models