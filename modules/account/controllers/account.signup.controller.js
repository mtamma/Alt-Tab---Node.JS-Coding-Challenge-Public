'use strict';
const async = require('async');
const mongoose = require('mongoose');
cont UserAccount = mongoose.model('UserAccount');
const ErrorStatus = require('./account.error');

let signupCtrl = function (req, res) {
    let accountData = {};
    const validateAccountDataFn = function ()

    async.waterfall([
        validateAccountDataFn,
        saveAccountDataFn
    ]);
};

module.exports = signupCtrl;