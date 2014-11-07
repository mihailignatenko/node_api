var connectionPool;
var mysql = require('mysql');
var crypto = require('crypto');
var functions = require('../functions');
var randomString = functions.randomString;
var nts = functions.nts;
function getProfileById(id, cb) {
    connectionPool.getConnection(function(err, connection) {
        var fb = process.boonex_modules['FacebookProfile'] ? '  p.FacebookProfile , ' : ' ';
        var av = process.boonex_modules['Avatar'] ? '  p.Avatar, ' : '  ';
        connection.query('SELECT p.`ID`, p.`NickName`, p.`Email`, p.`Status`, p.`Role`, p.`Couple`, p.`Sex`,' +
                ' p.`LookingFor`, p.`Headline`, p.`DescriptionMe`, ' + ' p.`Country`, p.`City`, p.`DateOfBirth`,' +
                ' p.`Featured`, p.`DateReg`, p.`DateLastEdit`, p.`DateLastLogin`, p.`DateLastNav`, p.`aff_num`,' +
                ' p.`Tags`, p.`zip`, p.`EmailNotify`, p.`LangID`, p.`UpdateMatch`, p.`Views`, p.`Rate`, p.`RateCount`,' +
                ' p.`CommentsCount`, p.`PrivacyDefaultGroup`, p.`allow_view_to`, p.`UserStatus`, p.`UserStatusMessage`,' +
                ' p.`UserStatusMessageWhen`, p.`Height`, p.`Weight`, p.`Income`, p.`Occupation`, p.`Religion`,' +
                ' p.`Education`, p.`RelationshipStatus`, p.`Hobbies`, p.`Interests`, p.`Ethnicity`, p.`FavoriteSites`,' +
                ' p.`FavoriteMusic`, p.`FavoriteFilms`, p.`FavoriteBooks`, p.`FirstName`,' + av + fb + ' p.`LastName`  FROM Profiles as' +
                ' p WHERE p.id = ' + id, function(err, rows, fields) {
                    if (rows.length > 0) {
                        var tmp = rows[0];
                        process.nextTick(function() {
                            cb(null, tmp);
                        });
                        //connection.release();
                    } else {
                        cb('user not found');
                    }
                connection.release();
                });
    });
}

function getFriends(id, cb) {
    try {
        connectionPool.getConnection(function (err, connection) {
            console.log('SELECT * FROM `sys_friend_list` WHERE ID = ' + id + ' OR Profile=' + id + ' and `Check`=1');
            connection.query('SELECT * FROM `sys_friend_list` WHERE ID = ' + id + ' OR Profile=' + id + ' and `Check`=1', function (err, rows, fields) {
                console.log(rows);
                process.nextTick(function () {
                    cb(null, rows);
                });
            });
          connection.release();
        });
    } catch (e) {
        res.end(e);
    }
}

// FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUCK!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//function profileRegister(req, cb) {
//    try {
//        connectionPool.getConnection(function (err, connection) {
//            if (!(req.body.NickName) || !(req.body.password_confirm) || !(req.body.FirstName) ||
//                !(req.body.LastName) || !(req.body.Password) || !(req.body.Email) ||
//                !(req.body.Password === req.body.password_confirm)) {
//                console.log('no requirements');
//            } else {
//                var count;
//                try {
//                    connectionPool.getConnection(function (err, connection) {
//                        connection.query("SELECT count(id) as count FROM Profiles WHERE NickName = " + mysql.escape(req.body.NickName), function (err, rows) {
//                            connection.release();
//                        });
//                    });
//                } catch (e) {
//                    res.writeHead(e);
//                }
//                var NickName = Email = Password = Salt = Couple = Sex = LookingFor = Headline = DescriptionMe = Country = City = DateOfBirth = DateReg = Tags = zip = EmailNotify = Height = Weight = Income = Occupation = Religion = Education = RelationshipStatus = Hobbies = Interests = Ethnicity = FavoriteSites = FavoriteMusic = FavoriteFilms = FavoriteBooks = FirstName = LastName = FacebookProfile = "''";
//                NickName = mysql.escape(req.body.NIckName);
//                Email = mysql.escape(req.body.Email);
//                var Pass = crypto.createHash('md5').update(req.body.Password).digest('hex');
//                Salt = randomString(8);
//                Password = crypto.createHash('sha1').update(Pass + Salt).digest('hex');
//                sql = "INSERT INTO `Profiles`(NickName, Email, Password, Salt, Couple, Sex, LookingFor, Headline, DescriptionMe, Country, City, DateOfBirth, DateReg, Tags, zip, EmailNotify, Height, Weight, Income, Occupation, Religion, Education, RelationshipStatus, Hobbies, Interests, Ethnicity, FavoriteSites, FavoriteMusic, FavoriteFilms, FavoriteBooks, FirstName, LastName) VALUES (" + mysql.escape(req.body.NickName) + ", " + mysql.escape(req.body.Email) + ", " + "'" + Password + "'" + ", " + "'" + Salt + "'" + ", " + mysql.escape(nts(req.body.Couple)) + ", " + mysql.escape(nts(req.body.Sex)) + ", " + mysql.escape(nts(req.body.LookingFor)) + ", " + mysql.escape(nts(req.body.Headline)) + ", " + mysql.escape(nts(req.body.DescriptionMe)) + ", " + mysql.escape(nts(req.body.Country)) + ", " + mysql.escape(nts(req.body.City)) + ", " + mysql.escape(nts(req.body.DateOfBirth)) + ", " + mysql.escape(nts(req.body.DateReg)) + ", " + mysql.escape(nts(req.body.Tags)) + ", " + mysql.escape(nts(req.body.zip)) + ", " + mysql.escape(nts(req.body.EmailNotify)) + ", " + mysql.escape(nts(req.body.Height)) + ", " + mysql.escape(nts(req.body.Weight)) + ", " + mysql.escape(nts(req.body.Income)) + ", " + mysql.escape(nts(req.body.Occupation)) + ", " + mysql.escape(nts(req.body.Religion)) + ", " + mysql.escape(nts(req.body.Education)) + ", " + mysql.escape(nts(req.body.RelationshipStatus)) + ", " + mysql.escape(nts(req.body.Hobbies)) + ", " + mysql.escape(nts(req.body.Interests)) + ", " + mysql.escape(nts(req.body.Ethnicity)) + ", " + mysql.escape(nts(req.body.FavoriteSites)) + ", " + mysql.escape(nts(req.body.FavoriteMusic)) + ", " + mysql.escape(nts(req.body.FavoriteFilms)) + ", " + mysql.escape(nts(req.body.FavoriteBooks)) + ", " + mysql.escape(nts(req.body.FirstName)) + ", " + mysql.escape(nts(req.body.LastName)) + ")";
//                try {
//                    connectionPool.getConnection(function (err, connection, sql) {
//                        console.log(sql);
//                        connection.query("SELECT count(id) as count FROM Profiles WHERE NickName = " + mysql.escape(req.body.NickName), req.body.NickName, function (err, rows, fields) {
//                            console.log(sql);
//                            var count = rows[0].count;
//                            if (count == 0) {
//                                console.log('count printed');
//                                connectionPool.getConnection(function (err, connection, sql) {
//                                    connection.query("INSERT INTO `Profiles`(NickName, Email, Password, Salt, Couple, Sex, LookingFor, Headline, DescriptionMe, Country, City, DateOfBirth, DateReg, Tags, zip, EmailNotify, Height, Weight, Income, Occupation, Religion, Education, RelationshipStatus, Hobbies, Interests, Ethnicity, FavoriteSites, FavoriteMusic, FavoriteFilms, FavoriteBooks, FirstName, LastName) VALUES (" + mysql.escape(req.body.NickName) + ", " + mysql.escape(req.body.Email) + ", " + "'" + Password + "'" + ", " + "'" + Salt + "'" + ", " + mysql.escape(nts(req.body.Couple)) + ", " + mysql.escape(nts(req.body.Sex)) + ", " + mysql.escape(nts(req.body.LookingFor)) + ", " + mysql.escape(nts(req.body.Headline)) + ", " + mysql.escape(nts(req.body.DescriptionMe)) + ", " + mysql.escape(nts(req.body.Country)) + ", " + mysql.escape(nts(req.body.City)) + ", " + mysql.escape(nts(req.body.DateOfBirth)) + ", " + mysql.escape(nts(req.body.DateReg)) + ", " + mysql.escape(nts(req.body.Tags)) + ", " + mysql.escape(nts(req.body.zip)) + ", " + mysql.escape(nts(req.body.EmailNotify)) + ", " + mysql.escape(nts(req.body.Height)) + ", " + mysql.escape(nts(req.body.Weight)) + ", " + mysql.escape(nts(req.body.Income)) + ", " + mysql.escape(nts(req.body.Occupation)) + ", " + mysql.escape(nts(req.body.Religion)) + ", " + mysql.escape(nts(req.body.Education)) + ", " + mysql.escape(nts(req.body.RelationshipStatus)) + ", " + mysql.escape(nts(req.body.Hobbies)) + ", " + mysql.escape(nts(req.body.Interests)) + ", " + mysql.escape(nts(req.body.Ethnicity)) + ", " + mysql.escape(nts(req.body.FavoriteSites)) + ", " + mysql.escape(nts(req.body.FavoriteMusic)) + ", " + mysql.escape(nts(req.body.FavoriteFilms)) + ", " + mysql.escape(nts(req.body.FavoriteBooks)) + ", " + mysql.escape(nts(req.body.FirstName)) + ", " + mysql.escape(nts(req.body.LastName)) + ")", req.body.NickName, function (err, rows, fields) {
//                                      connection.release();
//                                    });
//                                });
//                                connectionPool.getConnection(function (err, connection, sql) {
//                                    connection.query("SELECT id FROM Profiles WHERE NickName = " + mysql.escape(req.body.NickName), req.body.NickName, function (err, rows, fields) {
//                                        process.nextTick(function () {
//                                            cb(null, rows);
//                                        });
//                                      connection.release();
//                                    });
//                                });
//                            }
//                            else {
//                                process.nextTick(function () {
//                                    cb(null, -1);
//                                });
//                            }
//                            connection.release();
//                        });
//                    });
//                } catch (e) {
//                    res.end(e);
//                    console.log(e);
//                }
//            }
//        });
//    } catch (e) {
//        res.end(e);
//    }
//}

function profileRegister(userData, cb) {
  // select required fields:
  // SELECT `ID`, `Name`, `Mandatory`,`JoinOrder` FROM `sys_profile_fields` WHERE `JoinOrder` > 0 and `Mandatory`=1
  var requiredFields = ['NickName', 'FirstName', 'LastName', 'Email', 'Password', 'PasswordConfirm'];

  // check if all required fields were set
  var isAllFilled = true;
  for (var i = 0; i < requiredFields.length; ++i) {
    if(!userData.hasOwnProperty(requiredFields[i])) {
      isAllFilled = false;
      break;
    }
  }

  if(isAllFilled) {
    if(userData.Password === userData.PasswordConfirm) {
      connectionPool.getConnection(function (err, conn) {
        conn.query("SELECT count(ID) as `count` FROM `Profiles`" +
          "WHERE `NickName` = ? union all select count(ID)" +
          "as `count` from `Profiles` where `Email` = ?", [userData.NickName, userData.Email], function(err, rows) {

          if(err) {
            conn.release();
            setImmediate(cb, err);
          } else {
            // check if nickname and email are unique
            // if rows[0].count == 0 => nickname is unique (ok).
            // if rows[1].count == 0 => email is not in use (ok).
            if(rows[0].count != 0 || rows[1].count != 0) {
              err = rows[0].count ? 'nickname' : '';
              err += (rows[0].count && rows[1].count) ? ' and ' : '';
              err += rows[1].count ? 'email' : '';
              err += ' already in use';

              conn.release();
              setImmediate(cb, err);
            } else {
              // now, we can generate hash, and save data
              hashedPass = crypto.createHash('md5').update(userData.Password).digest('hex');
              userData.Salt = randomString(8);
              userData.Password = crypto.createHash('sha1').update(hashedPass + userData.Salt).digest('hex');
              delete userData.PasswordConfirm;

              conn.query('insert into `Profiles` SET ? ', userData, function(err, data){
                console.log(data);

                conn.release();
                setImmediate(cb, null, {ID: data.insertId});
              })
            }
          }
        });

      })
    } else {
        setImmediate(cb,"passwords doesn't match");
    }
  } else {
    setImmediate(cb, 'some of required fields were not set');
  }


}

function profileAuth(nickname, password, cb) {
  connectionPool.getConnection(function (err, connection) {
    connection.query('SELECT * FROM Profiles WHERE NickName = ' + mysql.escape(nickname) + 'LIMIT 1', function (err, rows, fields) {
      user = rows[0];
      if (user) {
        var Pass = crypto.createHash('md5').update(password).digest('hex');
        var Password = crypto.createHash('sha1').update(Pass + user["Salt"]).digest('hex');
        if (user["Password"] == Password) {
          process.nextTick(function() {
            cb(null, user)
          })
        } else {
          process.nextTick(function() {
            cb('failed', false)
          })
        }
      } else {
        process.nextTick(function() {cb('failed', false)})
      }
      connection.release();
    });
  });
}

function getProfilesPerPage(page, perPage, cb) {
    if (process.boonex_modules['Avatar']) {
        try {
            connectionPool.getConnection(function (err, connection) {
                connection.query('SELECT * FROM Profiles', null, function (err, rows, fields) {
                    console.log(rows);
                    process.nextTick(function () {
                        cb(null, rows);
                    });
                  connection.release();
                });
            });

        } catch (e) {
            cb(null, e);
        }
    } else {
        try {
            connectionPool.getConnection(function (err, connection) {
                connection.query('SELECT p.`ID`, p.`NickName`, p.`Email`, p.`Status`, p.`Role`, p.`Couple`, p.`Sex`,' +
                        ' p.`LookingFor`, p.`Headline`, p.`DescriptionMe`, ' + ' p.`Country`, p.`City`, p.`DateOfBirth`,' +
                        ' p.`Featured`, p.`DateReg`, p.`DateLastEdit`, p.`DateLastLogin`, p.`DateLastNav`, p.`aff_num`,' +
                        ' p.`Tags`, p.`zip`, p.`EmailNotify`, p.`LangID`, p.`UpdateMatch`, p.`Views`, p.`Rate`, p.`RateCount`,' +
                        ' p.`CommentsCount`, p.`PrivacyDefaultGroup`, p.`allow_view_to`, p.`UserStatus`, p.`UserStatusMessage`,' +
                        ' p.`UserStatusMessageWhen`, p.`Height`, p.`Weight`, p.`Income`, p.`Occupation`, p.`Religion`,' +
                        ' p.`Education`, p.`RelationshipStatus`, p.`Hobbies`, p.`Interests`, p.`Ethnicity`, p.`FavoriteSites`,' +
                        ' p.`FavoriteMusic`, p.`FavoriteFilms`, p.`FavoriteBooks`, p.`FirstName`, p.`LastName` FROM Profiles as' +
                        ' p', null, function (err, rows, fields) {
                            process.nextTick(function () {
                                cb(null, rows);
                            });
                          connection.release();
                        });
            });
        } catch (e) {
            cb(null, e);
        }
    }
}
function profileFields(cb){
  try{
    connectionPool.getConnection(function(err, connection){
      connection.query('SELECT * FROM `sys_profile_fields`', function(err, rows, fields){
        process.nextTick(function(){
          cb(null, rows);
        });
        connection.release();
      });
    });
  }catch(e){
    cb(null, e);
  }
}

module.exports = function (_connectionPool) {
    connectionPool = _connectionPool;

    return {
        getProfileById: getProfileById,
        getProfilesPerPage: getProfilesPerPage,
        getFriends: getFriends,
        profileFields: profileFields,
        profileRegister: profileRegister,
        profileAuth: profileAuth
    };
};