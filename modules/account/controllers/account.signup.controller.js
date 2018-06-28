'use strict';

const async = require('async');
const mongoose = require('mongoose');
const shortid = require('shortid');
const UserAccount = mongoose.model('UserAccount');
const ErrorStatus = require('./account.error');

const isEmailBeenUsed = function (data, callback) {
    const query = {
        email: data.email
    };
    const callbackFn = function (err, account) {
        if (!_.isEmpty(account)) {
            callback();
            return;
        }

        callback(true);
    }
    UserAccount.findOne(query, callbackFn);
};

const isEmailSpecified = function (data) {
    const email = data.email;
    return !_.isEmpty(email);
};

const isPasswordSpecified = function (data) {
    const password = data.password;
    return !_.isEmpty(password);
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
        if (!isEmailSpecified(accountData)) {
            statusCode = ErrorStatus.USER_EMAIL_IS_USED.httpStatusCode;
            responseObject = ErrorStatus.USER_EMAIL_NOT_SPECIFIED;
            error = true;
        } else if (!isPasswordSpecified(accountData)) {
            statusCode = ErrorStatus.USER_PASSWORD_NOT_SPECIFIED.httpStatusCode;
            responseObject = ErrorStatus.USER_PASSWORD_NOT_SPECIFIED;
            error = true;
        }
        
        if (error) {
            res.status(statusCode)
            res.json(responseObject);
            return;
        }

        isEmailBeenUsed(accountData, function (err) {
            if (err) {
                statusCode = ErrorStatus.USER_EMAIL_IS_USED.httpStatusCode;
                responseObject = ErrorStatus.USER_EMAIL_IS_USED;
                res.status(statusCode);
                res.json(responseObject);
                return;
            }
            callback();
        });
    };

    const saveAccountDataFn = function (callback) {
        const callbackFn = function (err) {
            if (err) {
                const statusCode = ErrorStatus.UNEXPECTED.httpStatusCode;
                res.status(statusCode);
                res.json({
                    'err': err
                });
                return;
            }

            const responseObject = {
                token: account.generateJwt()
            };
            res.status(201);
            res.json(responseObject);
            callback();
        };

        let account = new UserAccount();
        account.name = accountData.name;
        account.email = accountData.email;
        account.token = shortid.generate();
        account.setPassword(accountData.password);

        account.save(callbackFn);
    };

    async.waterfall([
        validateAccountDataFn,
        saveAccountDataFn
    ]);
};

module.exports = signupCtrl;