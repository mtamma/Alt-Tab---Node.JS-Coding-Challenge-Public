'use strict';

let mongoose = require('mongoose');

let userAccountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
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

mongoose.model('UserAccount', userAccountSchema);