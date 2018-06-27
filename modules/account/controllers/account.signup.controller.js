'use strict';
const async = require('async');
const mongoose = require('mongoose');
const UserAccount = mongoose.model('UserAccount');
const ErrorStatus = require('./account.error');

const isEmailBeenUsed = function (data) {
    const query = {
        email: data.email
    };
    const callbackFn = function (err, account) {
        if (account) {
            return true;
        }
        return false;
    }
    UserAccount.findOne(query, callbackFn);
};

const isEmailSpecified = function (data) {
    const email = data.email;
    return _.isEmpty(email);
};

const isPasswordSpecified = function (data) {
    const password = data.password;
    return _.isEmpty(password);
};

const signupCtrl = function (req, res) {
    const requestBody = req.body;
    const accountData = {
        name: requestBody.name,
        email: requestBody.email,
        password: requestBody.password
    };
    const validateAccountDataFn = function (callback) {
        let error = false;
        let statusCode, responseObject;
        if (isEmailSpecified(accountData)) {
            statusCode = ErrorStatus.USER_EMAIL_IS_USED.httpStatusCode;
            responseObject = ErrorStatus.USER_EMAIL_NOT_SPECIFIED;
            error = true;
        } elseif (isPasswordSpecified(accountData)) {
            statusCode = ErrorStatus.USER_PASSWORD_NOT_SPECIFIED.httpStatusCode;
            responseObject = ErrorStatus.USER_PASSWORD_NOT_SPECIFIED;
            error = true;
        } elseif (isEmailBeenUsed(accountData)) {
            statusCode = ErrorStatus.USER_EMAIL_IS_USED.httpStatusCode;
            responseObject = ErrorStatus.USER_EMAIL_IS_USED;
            error = true;
        } 

        if (error) {
            res.status(statusCode)
            res.json(responseObject);
            return;
        }
        callback();
    };

    const saveAccountDataFn = function (callback) {
        const callbackFn = function (err, result) {
            const responseObject = {
                token = result.token
            };
            res.status(201);
            res.json(responseObject);
            callback();
        }
        UserAccount.collection.insert(accountData, callbackFn);
    }

    async.waterfall([
        validateAccountDataFn,
        saveAccountDataFn
    ]);
};

module.exports = signupCtrl;