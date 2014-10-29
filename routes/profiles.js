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
        res.send(data);
    });
}

//function register(req, res) {
//  if (!(req.body.NickName) || !(req.body.password_confirm) || !(req.body.FirstName) || !(req.body.LastName) || !(req.body.Password) || !(req.body.Email) || !(req.body.Password === req.body.password_confirm)) {
//    console.log('no requirements');
//  } else {
//    var count;
//    try {
//      connectionPool.getConnection(function (err, connection) {
//        connection.query("SELECT count(id) as count FROM Profiles WHERE NickName = " + mysql.escape(req.body.NickName), function (err, rows) {
//          connection.release();
//        });
//      });
//    } catch (e) {
//      res.writeHead(e);
//    }
//    var NickName = Email = Password = Salt = Couple = Sex = LookingFor = Headline = DescriptionMe = Country = City = DateOfBirth = DateReg = Tags = zip = EmailNotify = Height = Weight = Income = Occupation = Religion = Education = RelationshipStatus = Hobbies = Interests = Ethnicity = FavoriteSites = FavoriteMusic = FavoriteFilms = FavoriteBooks = FirstName = LastName = FacebookProfile = "''";
//    NickName = mysql.escape(req.body.NIckName);
//    Email = mysql.escape(req.body.Email);
//    var Pass = crypto.createHash('md5').update(req.body.Password).digest('hex');
//    Salt = randomString(8);
//    Password = crypto.createHash('sha1').update(Pass + Salt).digest('hex');
//    sql = "INSERT INTO `Profiles`(NickName, Email, Password, Salt, Couple, Sex, LookingFor, Headline, DescriptionMe, Country, City, DateOfBirth, DateReg, Tags, zip, EmailNotify, Height, Weight, Income, Occupation, Religion, Education, RelationshipStatus, Hobbies, Interests, Ethnicity, FavoriteSites, FavoriteMusic, FavoriteFilms, FavoriteBooks, FirstName, LastName) VALUES (" + mysql.escape(req.body.NickName) + ", " + mysql.escape(req.body.Email) + ", " + "'" + Password + "'" + ", " + "'" + Salt + "'" + ", " + mysql.escape(nts(req.body.Couple)) + ", " + mysql.escape(nts(req.body.Sex)) + ", " + mysql.escape(nts(req.body.LookingFor)) + ", " + mysql.escape(nts(req.body.Headline)) + ", " + mysql.escape(nts(req.body.DescriptionMe)) + ", " + mysql.escape(nts(req.body.Country)) + ", " + mysql.escape(nts(req.body.City)) + ", " + mysql.escape(nts(req.body.DateOfBirth)) + ", " + mysql.escape(nts(req.body.DateReg)) + ", " + mysql.escape(nts(req.body.Tags)) + ", " + mysql.escape(nts(req.body.zip)) + ", " + mysql.escape(nts(req.body.EmailNotify)) + ", " + mysql.escape(nts(req.body.Height)) + ", " + mysql.escape(nts(req.body.Weight)) + ", " + mysql.escape(nts(req.body.Income)) + ", " + mysql.escape(nts(req.body.Occupation)) + ", " + mysql.escape(nts(req.body.Religion)) + ", " + mysql.escape(nts(req.body.Education)) + ", " + mysql.escape(nts(req.body.RelationshipStatus)) + ", " + mysql.escape(nts(req.body.Hobbies)) + ", " + mysql.escape(nts(req.body.Interests)) + ", " + mysql.escape(nts(req.body.Ethnicity)) + ", " + mysql.escape(nts(req.body.FavoriteSites)) + ", " + mysql.escape(nts(req.body.FavoriteMusic)) + ", " + mysql.escape(nts(req.body.FavoriteFilms)) + ", " + mysql.escape(nts(req.body.FavoriteBooks)) + ", " + mysql.escape(nts(req.body.FirstName)) + ", " + mysql.escape(nts(req.body.LastName)) + ")";
//    try {
//      connectionPool.getConnection(function (err, connection, sql) {
//        console.log(sql);
//        connection.query("SELECT count(id) as count FROM Profiles WHERE NickName = " + mysql.escape(req.body.NickName), req.body.NickName, function (err, rows, fields) {
//          console.log(sql);
//          var count = rows[0].count;
//          if (count == 0) {
//            console.log('count printed');
//            connectionPool.getConnection(function (err, connection, sql) {
//              connection.query("INSERT INTO `Profiles`(NickName, Email, Password, Salt, Couple, Sex, LookingFor, Headline, DescriptionMe, Country, City, DateOfBirth, DateReg, Tags, zip, EmailNotify, Height, Weight, Income, Occupation, Religion, Education, RelationshipStatus, Hobbies, Interests, Ethnicity, FavoriteSites, FavoriteMusic, FavoriteFilms, FavoriteBooks, FirstName, LastName) VALUES (" + mysql.escape(req.body.NickName) + ", " + mysql.escape(req.body.Email) + ", " + "'" + Password + "'" + ", " + "'" + Salt + "'" + ", " + mysql.escape(nts(req.body.Couple)) + ", " + mysql.escape(nts(req.body.Sex)) + ", " + mysql.escape(nts(req.body.LookingFor)) + ", " + mysql.escape(nts(req.body.Headline)) + ", " + mysql.escape(nts(req.body.DescriptionMe)) + ", " + mysql.escape(nts(req.body.Country)) + ", " + mysql.escape(nts(req.body.City)) + ", " + mysql.escape(nts(req.body.DateOfBirth)) + ", " + mysql.escape(nts(req.body.DateReg)) + ", " + mysql.escape(nts(req.body.Tags)) + ", " + mysql.escape(nts(req.body.zip)) + ", " + mysql.escape(nts(req.body.EmailNotify)) + ", " + mysql.escape(nts(req.body.Height)) + ", " + mysql.escape(nts(req.body.Weight)) + ", " + mysql.escape(nts(req.body.Income)) + ", " + mysql.escape(nts(req.body.Occupation)) + ", " + mysql.escape(nts(req.body.Religion)) + ", " + mysql.escape(nts(req.body.Education)) + ", " + mysql.escape(nts(req.body.RelationshipStatus)) + ", " + mysql.escape(nts(req.body.Hobbies)) + ", " + mysql.escape(nts(req.body.Interests)) + ", " + mysql.escape(nts(req.body.Ethnicity)) + ", " + mysql.escape(nts(req.body.FavoriteSites)) + ", " + mysql.escape(nts(req.body.FavoriteMusic)) + ", " + mysql.escape(nts(req.body.FavoriteFilms)) + ", " + mysql.escape(nts(req.body.FavoriteBooks)) + ", " + mysql.escape(nts(req.body.FirstName)) + ", " + mysql.escape(nts(req.body.LastName)) + ")", req.body.NickName, function (err, rows, fields) {
//              });
//            });
//            connectionPool.getConnection(function (err, connection, sql) {
//              connection.query("SELECT id FROM Profiles WHERE NickName = " + mysql.escape(req.body.NickName), req.body.NickName, function (err, rows, fields) {
//                res.send({
//                  result: 'success',
//                  err: '',
//                  json: rows
//                });
//              });
//            });
//          }
//          else {
//            res.send({
//              result: 'success',
//              err: '',
//              json: -1
//            });
//          }
//          connection.release();
//        });
//      });
//    } catch (e) {
//      res.writeHead(e);
//      console.log(e);
//    }
//  }
//}

module.exports = function (app) {
  model = require('../models/profiles')(app.connectionPool);
  return {
    get: {
      profileById: profileById,
      profilesPerPage: profilesPerPage,
      profileFriends: profileFriends
    },
    post: {
      profileRegister: profileRegister
    }
  };
};