'use strict';

const ERROR = Object.freeze({
    USER_EMAIL_IS_USED: {
        errorCode: 211,
        httpStatusCode: 400,
        errorMessage: 'You are attempting to use an email address that already exist in the system.',
        description: 'Register user, Link user'
    },
    USER_EMAIL_NOT_SPECIFIED: {
        errorCode: 213,
        httpStatusCode: 400,
        errorMessage: 'The requested operation requires an email address to be set for the user.',
        description: 'Change password, Set password, Reset password, Register user, Resend verification'
    },
    USER_PASSWORD_NOT_SPECIFIED: {
        errorCode: 202,
        httpStatusCode: 400,
        errorMessage: 'You are trying to register a user without specifying a password.',
        description: 'Register user'
    },
    USER_NOT_AUTHORIZED: {
        errorCode: 604,
        httpStatusCode: 401,
        errorMessage: 'You did not provide authorization which is required for this operation.',
        description: 'All'
    }
});

module.exports = ERROR;