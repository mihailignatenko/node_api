var connectionPool;
var mysql = require('mysql');
var crypto = require('crypto');
var functions = require('../functions');
var randomString = functions.randomString;
var nts = functions.nts;
var async = require('async');




function getTopMenu(req, res, cb) {
    try {
        connectionPool.getConnection(function (err, connection) {
            connection.query("SELECT * FROM `sys_menu_top` WHERE `Type` = 'top' AND Active = 1 ORDER BY `Order`", function (err, rows, fields) {
                if (rows) {
                    var count = 1;
                    async.each(rows, function (row, callback) {
                        row.children = [];
                        if(req.session && req.session.user){
                            console.log(req.session.user.NickName); //!!!!                            
                        }
                        connectionPool.getConnection(function (err, connection, sql) {
                            connection.query("SELECT * FROM `sys_menu_top` WHERE Parent = " + row.ID, function (err, children, fields) {
                                //console.log(children);
                                if (!err || (children.length > 0) ) {
                                    //console.log(children.length);
                                    children.forEach(function (child) {
                                        row.children.push(child);
                                    });
                                    //row.children.push(children);
                                    if (++count == rows.length) {
                                        process.nextTick(function () {
                                            cb(null, rows);
                                        });
                                    }
                                }
                                else {
                                    console.log(err);
                                }
                              connection.release();
                            });
                        });
                        callback();
                    }, function (err) {
                        if (err)
                            console.error('error looping array\n\n');
                    });
                }
                //console.log(req.session);
            });
            
          connection.release();
        });
    } catch (e) {
        res.end(e);
    }
}

function getServiceMenu(cb) {
    try {
        connectionPool.getConnection(function (err, connection) {
            connection.query("SELECT * FROM `sys_menu_service`", function (err, rows, fields) {
                process.nextTick(function () {
                    cb(null, rows);
                });
            });
          connection.release();
        });
    } catch (e) {
        res.end(e);
    }
};

function getMenuMember(cb){
  try{
      connectionPool.getConnection(function(err, connection){
        connection.query("SELECT * FROM `sys_menu_member`", function (err, rows, fields){
                process.nextTick(function () {
                    cb(null, rows);
                });
        connection.release();
        });
      });
  }catch (e) {
    res.end(e);
  }
}
function getBottomMenu (cb) {
  try {
    connectionPool.getConnection(function(err, connection){
      connection.query("SELECT * FROM `sys_menu_bottom`", function (err, rows, fields){
                process.nextTick(function () {
                    cb(null, rows);
                });
        connection.release();
      });
    });
  }
  catch (e) {
    res.end(e);
  }
}

module.exports = function (_connectionPool) {
    connectionPool = _connectionPool;
    return {
        getTopMenu: getTopMenu,
        getServiceMenu: getServiceMenu,
        getMenuMember: getMenuMember,
        getBottomMenu: getBottomMenu
    };
};
