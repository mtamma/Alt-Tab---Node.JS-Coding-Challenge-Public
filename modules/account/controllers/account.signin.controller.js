'use strict';

const mongoose = require('mongoose');
const UserAccount = mongoose.model('UserAccount');

const signinCtrl = function (req, res) {
    const requestBody = req.body;
    const accountData = {
        email: requestBody.email,
        password: requestBody.password
    };

};

module.exports = signinCtrl;