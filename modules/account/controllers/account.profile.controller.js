'use strict';

const mongoose = require('mongoose');
const UserAccount = mongoose.model('UserAccount');

const profileCtrl = function (req, res) {
    const requestPayload = req.payload || {};
    if (!requestPayload._id) {
        res.status(401);
        res.json({
            message: 'Unauthorized: profile page'
        });
        return;
    }
    const callbackFn = function (err, result) {
        if (err) {
            res.status(400);
            res.json({
                err: err
            });
            return;
        }
        const responseObject = {
            name: result.name,
            email: result.email
        }
        res.status(200);
        res.json(responseObject);
    };
    UserAccount.findById(requestPayload._id, callbackFn);
};

module.exports = profileCtrl;;