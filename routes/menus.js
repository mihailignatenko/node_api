var mysql = require('mysql');
var crypto = require('crypto');
var model;
var functions = require('../functions');
var randomString = functions.randomString;

module.exports = function (app) {
    model = require('../models/menus')(app.connectionPool);
    var result = {
        get: functions.routing(['getTopMenu', 'getServiceMenu', 'getMenuMember', 'getBottomMenu'], require('../models/menus')(app.connectionPool)),
        post: {}
    };
    result.get["getTopMenu"] = function(req, res) {
        model.getTopMenu(req, res, function (err, data) {
            res.send(data);
        });
    };
    return result;
};