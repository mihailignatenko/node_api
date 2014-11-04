var connectionPool;
var mysql = require('mysql');
var crypto = require('crypto');
var functions = require('../functions');
var randomString = functions.randomString;
var nts = functions.nts;
var async = require('async');

function sysCategories(cb) {
  try {
    connectionPool.getConnection(function(err, connection){
      connection.query("SELECT * FROM `sys_categories`", function(err, rows, fields){
        process.nextTick(function(){
          cb(null, rows);
        });
        connection.release();
      });
    });
  } catch(e) {
    res.end(e);
  }
};
function sysCatsByModules(module, cb){
  try{
    connectionPool.getConnection(function(err, connection){
      connection.query("SELECT * FROM `sys_categories` WHERE");
    });
  } catch(e) {
    res.end(e);
  }
}

module.exports = function (_connectionPool) {
    connectionPool = _connectionPool;

    return {
        sysCategories: sysCategories

    };
};