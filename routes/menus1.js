var connectionPool;
var mysql = require('mysql');
var crypto = require('crypto');
var functions = require('../functions');
var randomString = functions.randomString;
var nts = functions.nts;
var async = require('async');
(function (exports) {
  'use strict';

  var Sequence = exports.Sequence || require('sequence').Sequence
    , sequence = Sequence.create()
    , err
    ;
function getTopMenu(cb) {
    
//    try {
//        connectionPool.getConnection(function (err, connection) {
//            connection.query("SELECT * FROM `sys_menu_top` WHERE `Type` = 'top' AND Active = 1 ORDER BY `Order`", function (err, rows, fields) {
////                console.log(rows);
//                if (rows) {
//                    async.each(rows, function (row, callback) {
//
//                        row_id = row.ID;
//                        //console.log(row_id);
//                        row.children = [];
//                        console.log("SELECT * FROM `sys_menu_top` WHERE `Type` = 'top' AND Parent = " + row_id);
//                        connectionPool.getConnection(function (err, connection, sql) {
//                            connection.query("SELECT * FROM `sys_menu_top` WHERE `Type` = 'top' AND Parent = " + row_id, function (err, children, fields) {
//                                if (!err) {
//                                    //console.log("SELECT * FROM `sys_menu_top` WHERE `Type` = 'top' AND Parent = " + row_id);
//                                    row.children.push(children);
//                                }
//                                else {
//                                    console.log(err);
//                                }
//                            });
//                        });
//                        callback();
//                    }, function (err) {
//                        if (!err) {
//                            console.log('end looping array\n\n');
//                            process.nextTick(function () {
//                                console.log("callback is freezed");
//                                cb(null, rows);
//                            });
//                        } else
//                            console.error('error looping array\n\n');
//                    });
////                    rows.forEach(function(row){
////                        row_id = row.ID;
////                        //console.log(row_id);
////                        row.children = [];
////                        console.log("SELECT * FROM `sys_menu_top` WHERE `Type` = 'top' AND Parent = "+ row_id);
////                        connection.query("SELECT * FROM `sys_menu_top` WHERE `Type` = 'top' AND Parent = "+ row_id,function(err, children, fields){
////                            if(!err) {
////                                console.log("SELECT * FROM `sys_menu_top` WHERE `Type` = 'top' AND Parent = "+ row_id);
////                                row.children.push(children);
////                            }
////                            else{
////                               console.log(err);
////                            }
////                        });                        
////                    });
//                    //console.log(rows);
//                }
//
//            });
//        });
//    } catch (e) {
//        res.end(e);
//    }
}

module.exports = function (_connectionPool) {
    connectionPool = _connectionPool;

    return {
        getTopMenu: getTopMenu
    };
};