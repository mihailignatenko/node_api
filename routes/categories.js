//var mysql = require('mysql');
//module.exports = function (connectionPool, boonex_modules) {
//    return {
//        get: {
//            categories: function (req, res) {
//                try {
//                    connectionPool.getConnection(function (err, connection) {
//                        connection.query('SELECT * FROM  sys_categories', null, function () {
//                            res.send({
//                                result: 'success',
//                                json: rows
//                            });
//                            connection.release();
//                        });
//                    });
//                } catch (e) {
//                    res.send({
//                        result: 'error',
//                        json: e
//                    });
//                }
//
//            },
//            catsByModules: function (req, res) {
//                try {
//                    //console.log('SELECT * FROM `sys_categories` WHERE Type = ' + mysql.escape(req.params.module));
//                    connectionPool.getConnection(function (err, connection) {
//                        connection.query('SELECT * FROM `sys_categories` WHERE Type = ' + mysql.escape(req.params.module), null, function (err, rows, fields) {
//                            res.send({
//                                result: 'success',
//                                err: '',
//                                json: rows
//                            });
//                          connection.release();
//                        });
//                    });
//
//                } catch (e) {
//                    res.send({
//                        result: 'error',
//                        json: e
//                    });
//                }
//            }
//        },
//        post: {
//            category: function (req, res) {
//                if (!(req.params.Category) && !(req.params.id) && !(req.params.Type)) {
//                    try {
//                        connectionPool.getConnection(function (err, connection) {
//                            connection.query("INSERT INTO `sys_categories`(`Category`, `ID`, `Type`, `Owner`, `Status`) VALUES (" + mysql.escape(nts(req.params.Category)) + "," + mysql.escape(nts(req.params.id)) + "," + mysql.escape(nts(req.params.Type)) + "," + mysql.escape(nts(req.params.Owner)) + "," + mysql.escape(nts(req.params.status)) + ")", null, function () {
//                                res.send({
//                                    result: 'success',
//                                    json: 'ok'
//                                });
//                                connection.release();
//                            });
//                        });
//                    } catch (e) {
//                        res.send({
//                            result: 'error'
//                        });
//                    }
//                } else {
//                    res.send({
//                        result: 'invalid data'
//                    });
//                }
//            }
//        }
//    };
//};

function sysCategories(req, res){
  model.sysCategories(function(err, data){
    if(err) {
      console.log('err', err)
      res.send(err)
    } else {
      res.send(data);
    }
  });
}

var mysql = require('mysql');
var crypto = require('crypto');
var model;
var functions = require('../functions');
var randomString = functions.randomString;

module.exports = function (app) {
  model = require('../models/categories')(app.connectionPool);
  return {
    get: {
        sysCategories: sysCategories
    },
    post: {

    }
  };
};