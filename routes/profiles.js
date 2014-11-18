var mysql = require('mysql');
var crypto = require('crypto');
var model;
var functions = require('../functions');
var randomString = functions.randomString;

//function randomString(len, charSet) {
//  charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//  var randomString = '';
//  for (var i = 0; i < len; i++) {
//    var randomPoz = Math.floor(Math.random() * charSet.length);
//    randomString += charSet.substring(randomPoz, randomPoz + 1);
//  }
//  return randomString;
//}

function nts(val) {
  if (typeof val === 'undefined') {
    return '';
  }
  else {
    return val;
  }
}

function profileById(req, res) {
  model.getProfileById(req.params.id, function (err, data) {
    if (err) {
      res.send({'err': 'user not found'});
    } else {
      res.send(data);
    }
  });
}

function profilesPerPage(req, res) {
  model.getProfilesPerPage(req.params.page, req.params.perpage, function (err, data) {      
    res.send(data);
  });
}

function profileFriends(req, res) {
    model.getFriends(req.params.id, function(err, data){
        res.send(data);
    });
}
function profileRegister(req, res){
    model.profileRegister(req, function(err, data){
      if(err){
        res.send(err);
      } else {
        res.send(data);
      }
    });
}
function profileAuth(req, res){
    //console.log(req.body);
    model.profileAuth(req.body.NickName, req.body.Password, req.session, function(err, data){
      if(err){
          res.send(401);
          res.end(err);
      } else {
          res.send({auth: 'ok'});
          req.session.auth = true;
          req.session.save();
      }
    });
}

function profileFields(req, res){
  model.profileFields(function(err, data){
    res.send(data);
  });
}

module.exports = function (app) {
  model = require('../models/profiles')(app.connectionPool);
  return {
    get: {
      profileById: profileById,
      profilesPerPage: profilesPerPage,
      profileFriends: profileFriends,
      profileFields: profileFields
    },
    post: {
      profileRegister: profileRegister,
      profileAuth: profileAuth
    }
  };
};
//module.exports = function (app) {
//
//    return {
//        get: functions.routing(['profileById', 'profilesPerPage', 'profileFriends'], require('../models/profiles')(app.connectionPool)),
//        post: functions.routing(['profileRegister', 'profileAuth'], require('../models/profiles')(app.connectionPool))
//
//    };
//};