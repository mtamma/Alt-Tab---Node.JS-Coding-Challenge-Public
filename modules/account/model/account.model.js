'use strict';

const mongoose = require('mongoose');
const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');

const userAccountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    token: {
        type: String
    },
    hash: {
        type: String
    },
    salt: {
        type: String
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    },
    updated_at: {
        type: Date,
        required: true,
        default: Date.now
    }
});

userAccountSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, null).toString('hex');
};

userAccountSchema.methods.isValidPassword = function (password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, null).toString('hex');
    return this.hash === hash;
};

userAccountSchema.methods.generateJwt = function () {
    const expiredDate = new Date();
    expiredDate.setDate(date.getDate() + 7);

    return jsonwebtoken.sign({
        email: this.email,
        name: this.name,
        expired: parseInt(expiredDate.getTime()/1000)
    }, 'TEMPORARY_PASS');
};

mongoose.model('UserAccount', userAccountSchema);