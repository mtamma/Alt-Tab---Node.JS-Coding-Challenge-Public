'use strict';

const mongoose = require('mongoose');
const UserAccount = mongoose.model('UserAccount');

const profileCtrl = function (req, res) {
    const requestBody = req.body;
    const query = {
        email: requestBody.email
    };
    const callbackFn = function (err, result) {
        if (err) {
            return;
        }
        const responseObject = {
            name: result.name,
            email: result.email
        }
        res.status(200);
        res.json(responseObject);
    };
    UserAccount.findOne(query, callbackFn);
};

module.exports = profileCtrl;;