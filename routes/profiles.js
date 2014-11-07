var mysql = require('mysql');
var crypto = require('crypto');
var model;
var functions = require('../functions');
var randomString = functions.randomString;

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
      res.send(404, {'err': 'user not found'});
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
    model.profileRegister(req.body, function(err, data) {
      if(err) {
        res.send(500, {'err': err});
      } else {
        req.session.user = {
          ID: data.ID,
          NickName: req.body.NickName,
          Role: 1 // default for just registered user
        };
        req.session.save();

        res.send(200, data)
      }
    });
}
function profileAuth(req, res) {
  model.profileAuth(req.body.NickName, req.body.Password, function (err, data) {
    if (err) {
      res.send(401, {'ok': false, 'err': 'auth failed'})
    } else {
      req.session.user = {
        ID: data.ID,
        NickName: data.NickName,
        Role: data.Role
      };
      req.session.save();

      res.send(200, { 'ID': data.ID })
    }
  });
}

function profileFields(req, res){
  model.profileFields(req, function(err, data){
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