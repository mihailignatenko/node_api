var connectionPool;
var mysql = require('mysql');
var crypto = require('crypto');
var functions = require('../functions');
var randomString = functions.randomString;
var nts = functions.nts;
function getProfileById(id, cb) {
    connectionPool.getConnection(function (err, connection) {
        connection.query('SELECT p.`ID`, p.`NickName`, p.`Email`, p.`Status`, p.`Role`, p.`Couple`, p.`Sex`,' +
                ' p.`LookingFor`, p.`Headline`, p.`DescriptionMe`, ' + ' p.`Country`, p.`City`, p.`DateOfBirth`,' +
                ' p.`Featured`, p.`DateReg`, p.`DateLastEdit`, p.`DateLastLogin`, p.`DateLastNav`, p.`aff_num`,' +
                ' p.`Tags`, p.`zip`, p.`EmailNotify`, p.`LangID`, p.`UpdateMatch`, p.`Views`, p.`Rate`, p.`RateCount`,' +
                ' p.`CommentsCount`, p.`PrivacyDefaultGroup`, p.`allow_view_to`, p.`UserStatus`, p.`UserStatusMessage`,' +
                ' p.`UserStatusMessageWhen`, p.`Avatar`, p.`Height`, p.`Weight`, p.`Income`, p.`Occupation`, p.`Religion`,' +
                ' p.`Education`, p.`RelationshipStatus`, p.`Hobbies`, p.`Interests`, p.`Ethnicity`, p.`FavoriteSites`,' +
                ' p.`FavoriteMusic`, p.`FavoriteFilms`, p.`FavoriteBooks`, p.`FirstName`, p.`LastName` FROM Profiles as' +
                ' p WHERE p.id = ' + id, function (err, rows, fields) {
                    if (rows.length > 0) {
                        var tmp = rows[0];
                        if (process.boonex_modules['Avatar']) {
                            var sql = 'SELECT bx_photos_main.hash, bx_photos_main.ext FROM  bx_avatar_images,  bx_photos_main WHERE ' +
                                    'bx_avatar_images.id = bx_photos_main.id AND bx_avatar_images.author_id = ';
                            connection.query(sql + id, function (err, rows, fields) {
                                tmp['avatar'] = rows;
                                process.nextTick(function () {
                                    cb(null, tmp);
                                });
                            });
                        } else {
                            process.nextTick(function () {
                                cb(null, tmp);
                            });
                        }
                        connection.release();
                    } else {
                        cb('user not found');
                    }
                });
    });
}

function profileRegister(req, cb) {
    try {
        connectionPool.getConnection(function (err, connection) {
            if (!(req.body.NickName) || !(req.body.password_confirm) || !(req.body.FirstName) || !(req.body.LastName) || !(req.body.Password) || !(req.body.Email) || !(req.body.Password === req.body.password_confirm)) {
                console.log('no requirements');
            } else {
                var count;
                try {
                    connectionPool.getConnection(function (err, connection) {
                        connection.query("SELECT count(id) as count FROM Profiles WHERE NickName = " + mysql.escape(req.body.NickName), function (err, rows) {
                            connection.release();
                        });
                    });
                } catch (e) {
                    res.writeHead(e);
                }
                var NickName = Email = Password = Salt = Couple = Sex = LookingFor = Headline = DescriptionMe = Country = City = DateOfBirth = DateReg = Tags = zip = EmailNotify = Height = Weight = Income = Occupation = Religion = Education = RelationshipStatus = Hobbies = Interests = Ethnicity = FavoriteSites = FavoriteMusic = FavoriteFilms = FavoriteBooks = FirstName = LastName = FacebookProfile = "''";
                NickName = mysql.escape(req.body.NIckName);
                Email = mysql.escape(req.body.Email);
                var Pass = crypto.createHash('md5').update(req.body.Password).digest('hex');
                Salt = randomString(8);
                Password = crypto.createHash('sha1').update(Pass + Salt).digest('hex');
                sql = "INSERT INTO `Profiles`(NickName, Email, Password, Salt, Couple, Sex, LookingFor, Headline, DescriptionMe, Country, City, DateOfBirth, DateReg, Tags, zip, EmailNotify, Height, Weight, Income, Occupation, Religion, Education, RelationshipStatus, Hobbies, Interests, Ethnicity, FavoriteSites, FavoriteMusic, FavoriteFilms, FavoriteBooks, FirstName, LastName) VALUES (" + mysql.escape(req.body.NickName) + ", " + mysql.escape(req.body.Email) + ", " + "'" + Password + "'" + ", " + "'" + Salt + "'" + ", " + mysql.escape(nts(req.body.Couple)) + ", " + mysql.escape(nts(req.body.Sex)) + ", " + mysql.escape(nts(req.body.LookingFor)) + ", " + mysql.escape(nts(req.body.Headline)) + ", " + mysql.escape(nts(req.body.DescriptionMe)) + ", " + mysql.escape(nts(req.body.Country)) + ", " + mysql.escape(nts(req.body.City)) + ", " + mysql.escape(nts(req.body.DateOfBirth)) + ", " + mysql.escape(nts(req.body.DateReg)) + ", " + mysql.escape(nts(req.body.Tags)) + ", " + mysql.escape(nts(req.body.zip)) + ", " + mysql.escape(nts(req.body.EmailNotify)) + ", " + mysql.escape(nts(req.body.Height)) + ", " + mysql.escape(nts(req.body.Weight)) + ", " + mysql.escape(nts(req.body.Income)) + ", " + mysql.escape(nts(req.body.Occupation)) + ", " + mysql.escape(nts(req.body.Religion)) + ", " + mysql.escape(nts(req.body.Education)) + ", " + mysql.escape(nts(req.body.RelationshipStatus)) + ", " + mysql.escape(nts(req.body.Hobbies)) + ", " + mysql.escape(nts(req.body.Interests)) + ", " + mysql.escape(nts(req.body.Ethnicity)) + ", " + mysql.escape(nts(req.body.FavoriteSites)) + ", " + mysql.escape(nts(req.body.FavoriteMusic)) + ", " + mysql.escape(nts(req.body.FavoriteFilms)) + ", " + mysql.escape(nts(req.body.FavoriteBooks)) + ", " + mysql.escape(nts(req.body.FirstName)) + ", " + mysql.escape(nts(req.body.LastName)) + ")";
                try {
                    connectionPool.getConnection(function (err, connection, sql) {
                        console.log(sql);
                        connection.query("SELECT count(id) as count FROM Profiles WHERE NickName = " + mysql.escape(req.body.NickName), req.body.NickName, function (err, rows, fields) {
                            console.log(sql);
                            var count = rows[0].count;
                            if (count == 0) {
                                console.log('count printed');
                                connectionPool.getConnection(function (err, connection, sql) {
                                    connection.query("INSERT INTO `Profiles`(NickName, Email, Password, Salt, Couple, Sex, LookingFor, Headline, DescriptionMe, Country, City, DateOfBirth, DateReg, Tags, zip, EmailNotify, Height, Weight, Income, Occupation, Religion, Education, RelationshipStatus, Hobbies, Interests, Ethnicity, FavoriteSites, FavoriteMusic, FavoriteFilms, FavoriteBooks, FirstName, LastName) VALUES (" + mysql.escape(req.body.NickName) + ", " + mysql.escape(req.body.Email) + ", " + "'" + Password + "'" + ", " + "'" + Salt + "'" + ", " + mysql.escape(nts(req.body.Couple)) + ", " + mysql.escape(nts(req.body.Sex)) + ", " + mysql.escape(nts(req.body.LookingFor)) + ", " + mysql.escape(nts(req.body.Headline)) + ", " + mysql.escape(nts(req.body.DescriptionMe)) + ", " + mysql.escape(nts(req.body.Country)) + ", " + mysql.escape(nts(req.body.City)) + ", " + mysql.escape(nts(req.body.DateOfBirth)) + ", " + mysql.escape(nts(req.body.DateReg)) + ", " + mysql.escape(nts(req.body.Tags)) + ", " + mysql.escape(nts(req.body.zip)) + ", " + mysql.escape(nts(req.body.EmailNotify)) + ", " + mysql.escape(nts(req.body.Height)) + ", " + mysql.escape(nts(req.body.Weight)) + ", " + mysql.escape(nts(req.body.Income)) + ", " + mysql.escape(nts(req.body.Occupation)) + ", " + mysql.escape(nts(req.body.Religion)) + ", " + mysql.escape(nts(req.body.Education)) + ", " + mysql.escape(nts(req.body.RelationshipStatus)) + ", " + mysql.escape(nts(req.body.Hobbies)) + ", " + mysql.escape(nts(req.body.Interests)) + ", " + mysql.escape(nts(req.body.Ethnicity)) + ", " + mysql.escape(nts(req.body.FavoriteSites)) + ", " + mysql.escape(nts(req.body.FavoriteMusic)) + ", " + mysql.escape(nts(req.body.FavoriteFilms)) + ", " + mysql.escape(nts(req.body.FavoriteBooks)) + ", " + mysql.escape(nts(req.body.FirstName)) + ", " + mysql.escape(nts(req.body.LastName)) + ")", req.body.NickName, function (err, rows, fields) {
                                    });
                                });
                                connectionPool.getConnection(function (err, connection, sql) {
                                    connection.query("SELECT id FROM Profiles WHERE NickName = " + mysql.escape(req.body.NickName), req.body.NickName, function (err, rows, fields) {
                                        process.nextTick(function () {
                                            cb(null, rows);
                                        });
                                    });
                                });
                            }
                            else {
                                process.nextTick(function () {
                                    cb(null, -1);
                                });
                            }
                            connection.release();
                        });
                    });
                } catch (e) {
                    res.writeHead(e);
                    console.log(e);
                }
            }
        });
    } catch (e) {
        res.end(e);
    }
}
;


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
        });
    } catch (e) {
        res.end(e);
    }
}
;

function getProfilesPerPage(page, perPage, cb) {
    try {
        connectionPool.getConnection(function (err, connection) {
            connection.query('SELECT p.`ID`, p.`NickName`, p.`Email`, p.`Status`, p.`Role`, p.`Couple`, p.`Sex`,' +
                    ' p.`LookingFor`, p.`Headline`, p.`DescriptionMe`, p.`Country`, p.`City`, p.`DateOfBirth`, p.`Featured`,' +
                    ' p.`DateReg`, p.`DateLastEdit`, p.`DateLastLogin`, p.`DateLastNav`, p.`aff_num`, p.`Tags`, p.`zip`,' +
                    ' p.`EmailNotify`, p.`LangID`, p.`UpdateMatch`, p.`Views`, p.`Rate`, p.`RateCount`, p.`CommentsCount`,' +
                    ' p.`PrivacyDefaultGroup`, p.`allow_view_to`, p.`UserStatus`, p.`UserStatusMessage`,' +
                    ' p.`UserStatusMessageWhen`, p.`Avatar`, p.`Height`, p.`Weight`, p.`Income`, p.`Occupation`,' +
                    ' p.`Religion`, p.`Education`, p.`RelationshipStatus`, p.`Hobbies`, p.`Interests`, p.`Ethnicity`,' +
                    ' p.`FavoriteSites`, p.`FavoriteMusic`, p.`FavoriteFilms`, p.`FavoriteBooks`, p.`FirstName`,' +
                    ' p.`LastName`, p.`FacebookProfile`, bx_photos_main.hash, bx_photos_main.ext FROM Profiles as' +
                    ' p LEFT JOIN bx_avatar_images ON bx_avatar_images.author_id = p.id LEFT JOIN bx_photos_main ON' +
                    ' bx_avatar_images.id = bx_photos_main.id LIMIT ' + (page - 1) * perPage +
                    ', ' + perPage, function (err, rows) {
                        process.nextTick(function () {
                            cb(null, rows);
                        });
                        connection.release();
                    });
        });
    } catch (e) {
        res.writeHead(e);
    }
}

module.exports = function (_connectionPool) {
    connectionPool = _connectionPool;

    return {
        getProfileById: getProfileById,
        getProfilesPerPage: getProfilesPerPage,
        getFriends: getFriends,
        profileRegister: profileRegister
    };
};