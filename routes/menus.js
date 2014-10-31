var mysql = require('mysql');
var crypto = require('crypto');
var model;
var functions = require('../functions');
var randomString = functions.randomString;

function getTopMenu(req, res) {
    model.getTopMenu(function (err, data) {
        if (err) {
            res.writeHead(500);
            res.send({'err': 'menu not found'});
        } else {
            res.send(data);
        }
    });
}
function getServiceMenu(req, res) {
    model.getServiceMenu(function (err, data) {
        if (err) {
            res.writeHead(500);
            res.send({'err': 'menu not found'});
        } else {
            res.send(data);
        }
    });
};


function getMenuMember(req, res) {
  model.getMenuMember(function (err, data){
      if(err) {
          res.writeHead(500);
          res.send({'err': 'menu not found'});
      } else {
          res.send(data);
      }
  });
}

module.exports = function (app) {
    model = require('../models/menus')(app.connectionPool);
    return {
        get: {
            getTopMenu: getTopMenu,
            getServiceMenu: getServiceMenu,
            getMenuMember: getMenuMember
        },
        post: {
        }
    };
};