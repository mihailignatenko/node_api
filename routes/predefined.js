var mysql = require('mysql');
var crypto = require('crypto');
var model;
var functions = require('../functions');
var randomString = functions.randomString;





module.exports = function (app) {

    return {
        get: functions.routing(['getPredefined'], require('../models/predefined')(app.connectionPool)),
        post: {}
    };
};