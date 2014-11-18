var connect_params = require('./connect');
//var Cookies = require("cookies");
var express = require('express'),
        app = express(),
        mysql = require('mysql');
        

var boonex_modules = [];
var bodyParser = require('body-parser');

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded()); // to support URL-encoded bodies
//var Cookies = require("cookies");
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    //res.header('Content-Type: application/json');
    next();
});
var conf = {
  db: {
    db: 'test',
    host: 'localhost',
    port: 27017,  // optional, default: 27017
    collection: 'mySessions', // optional, default: sessions
    stringify: false
  },
  secret: '076ee61d63aa10a125ea872411e433b9'
};
exports.app = app;
exports.boonex_modules = boonex_modules;
exports.connect_params = connect_params;
exports.express = express;
exports.conf = conf;