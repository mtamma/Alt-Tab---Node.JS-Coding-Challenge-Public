'use strict';

let mongoose = require('mongoose');

module.exports.connectDB = function () {
    const dbName = 'backendTest';
    const dbConnectionString = `mongodb://localhost:27017/ ${ dbName }`;
    mongoose.connect(dbConnectionString);
    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection to db error'));
    db.once('open', function () {
        console.log('mongoDB connected');
    });
};

module.exports.disconnectDB = function () {
    mongoose.connection.db
    .close(function (err) {
        console.info('Disconnect from MongoDB');
        return callback(err);
    });
};

module.exports.loadModels = function (callback) {
    require('../../account/model').userAccount;
    if (callback) {
        callback();
    }
};

module.exports.init = function (callback) {
    const _this = this;
    _this.connectDB(function (db) {
        _this.loadModels();
    });
};