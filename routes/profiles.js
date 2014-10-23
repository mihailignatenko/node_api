var mysql = require('mysql');
var crypto = require('crypto');

function randomString(len, charSet) {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz, randomPoz + 1);
    }
    return randomString;
}

function nts(val) {
    if (typeof val === 'undefined') {
        return '';
        conslole.log(1);
    }
    else {
        return val;
        //console.log(2);
    }
}

module.exports = function(connectionPool, boonex_modules) {
    return {
        get: {
            profileById: function(req, res) {    
                try {
                    connectionPool.getConnection(function (err, connection) {
                        //var fb = isFaceBook();
                        ////console.log(fb);
                        //console.log('SELECT p.`ID`, p.`NickName`, p.`Email`, p.`Status`, p.`Role`, p.`Couple`, p.`Sex`, p.`LookingFor`, p.`Headline`, p.`DescriptionMe`, '+fb+' p.`Country`, p.`City`, p.`DateOfBirth`, p.`Featured`, p.`DateReg`, p.`DateLastEdit`, p.`DateLastLogin`, p.`DateLastNav`, p.`aff_num`, p.`Tags`, p.`zip`, p.`EmailNotify`, p.`LangID`, p.`UpdateMatch`, p.`Views`, p.`Rate`, p.`RateCount`, p.`CommentsCount`, p.`PrivacyDefaultGroup`, p.`allow_view_to`, p.`UserStatus`, p.`UserStatusMessage`, p.`UserStatusMessageWhen`, p.`Avatar`, p.`Height`, p.`Weight`, p.`Income`, p.`Occupation`, p.`Religion`, p.`Education`, p.`RelationshipStatus`, p.`Hobbies`, p.`Interests`, p.`Ethnicity`, p.`FavoriteSites`, p.`FavoriteMusic`, p.`FavoriteFilms`, p.`FavoriteBooks`, p.`FirstName`, p.`LastName` FROM Profiles as p WHERE p.id = ');

                        connection.query('SELECT p.`ID`, p.`NickName`, p.`Email`, p.`Status`, p.`Role`, p.`Couple`, p.`Sex`, p.`LookingFor`, p.`Headline`, p.`DescriptionMe`, ' + ' p.`Country`, p.`City`, p.`DateOfBirth`, p.`Featured`, p.`DateReg`, p.`DateLastEdit`, p.`DateLastLogin`, p.`DateLastNav`, p.`aff_num`, p.`Tags`, p.`zip`, p.`EmailNotify`, p.`LangID`, p.`UpdateMatch`, p.`Views`, p.`Rate`, p.`RateCount`, p.`CommentsCount`, p.`PrivacyDefaultGroup`, p.`allow_view_to`, p.`UserStatus`, p.`UserStatusMessage`, p.`UserStatusMessageWhen`, p.`Avatar`, p.`Height`, p.`Weight`, p.`Income`, p.`Occupation`, p.`Religion`, p.`Education`, p.`RelationshipStatus`, p.`Hobbies`, p.`Interests`, p.`Ethnicity`, p.`FavoriteSites`, p.`FavoriteMusic`, p.`FavoriteFilms`, p.`FavoriteBooks`, p.`FirstName`, p.`LastName` FROM Profiles as p WHERE p.id = ' + req.params.id, req.params.id, function (err, rows, fields) {
                            console.log(rows);
                            if (rows.length > 0) {
                                var tmp = rows[0];
                                //            res.send({
                                //                result: 'success',
                                //                err: '',
                                //                //fields: fields
                                //                json: rows
                                //                //length: rows.length
                                //            });            
                                if (boonex_modules['Avatar']) {
                                    ////console.log(1);
                                    var sql = 'SELECT bx_photos_main.hash, bx_photos_main.ext FROM  bx_avatar_images,  bx_photos_main WHERE bx_avatar_images.id = bx_photos_main.id AND bx_avatar_images.author_id = ';
                                    connection.query(sql + req.params.id, req.params.id, function (err, rows, fields) {
                                        ////console.log(tmp);
                                        tmp['avatar'] = rows;
                                        res.send({
                                            json: tmp
                                        });
                                    });
                                } else {
                                    res.send({
                                        result: 'success',
                                        err: '',
                                        //fields: fields
                                        json: rows
                                                //length: rows.length
                                    });
                                }
                                connection.release();
                            } else {
                                res.status(404);
                                res.send({
                                    json: 'user not found'
                                });
                            }
                        });
                    });
                } catch(e) {
                    res.writeHead(err);
                }    
            },
            profilesPerPage: function(req, res) {
                try {
                    connectionPool.getConnection(function (err, connection) {
                        
                        connection.query('SELECT p.`ID`, p.`NickName`, p.`Email`, p.`Status`, p.`Role`, p.`Couple`, p.`Sex`, p.`LookingFor`, p.`Headline`, p.`DescriptionMe`, p.`Country`, p.`City`, p.`DateOfBirth`, p.`Featured`, p.`DateReg`, p.`DateLastEdit`, p.`DateLastLogin`, p.`DateLastNav`, p.`aff_num`, p.`Tags`, p.`zip`, p.`EmailNotify`, p.`LangID`, p.`UpdateMatch`, p.`Views`, p.`Rate`, p.`RateCount`, p.`CommentsCount`, p.`PrivacyDefaultGroup`, p.`allow_view_to`, p.`UserStatus`, p.`UserStatusMessage`, p.`UserStatusMessageWhen`, p.`Avatar`, p.`Height`, p.`Weight`, p.`Income`, p.`Occupation`, p.`Religion`, p.`Education`, p.`RelationshipStatus`, p.`Hobbies`, p.`Interests`, p.`Ethnicity`, p.`FavoriteSites`, p.`FavoriteMusic`, p.`FavoriteFilms`, p.`FavoriteBooks`, p.`FirstName`, p.`LastName`, p.`FacebookProfile`, bx_photos_main.hash, bx_photos_main.ext FROM Profiles as p LEFT JOIN bx_avatar_images ON bx_avatar_images.author_id = p.id LEFT JOIN bx_photos_main ON bx_avatar_images.id = bx_photos_main.id LIMIT ' + (req.params.page-1) * req.params.perpage + ', ' + req.params.perpage, function (err, rows, fields) {
                            //console.log('SELECT `ID` FROM Profiles LIMIT ' + mysql.escape(req.params.perpage * req.params.page) + ', ' + mysql.escape(req.params.page));
                            res.send({
                                result: 'success',
                                err: '',
                                json: rows
                            });
                            connection.release();
                        });
                    });
                } catch (e) {
                    res.writeHead(e);
                }
            },
            profileFriends: function(req, res) {
                console.log('I am friends');
                try {
                    connectionPool.getConnection(function (err, connection) {
                        var q = 'SELECT * FROM `sys_friend_list` WHERE ID = '+req.params.id+' OR Profile='+req.params.id+' and `Check`=1'
                        connection.query(q,  function (err, rows, fields) {
                            console.log(q)
                            res.send({
                                result: 'success',
                                err: '',
                                //fields: fields,
                                json: rows
                                        //length: rows.length
                            });
                            connection.release();
                        });
                    });
                } catch (e) {
                    res.writeHead(err);
                }
            }
        },
        post: {
            register: function (request, response) {
                if (!(request.body.NickName) || !(request.body.password_confirm) || !(request.body.FirstName) || !(request.body.LastName) || !(request.body.Password) || !(request.body.Email) || !(request.body.Password === request.body.password_confirm)) {
                    console.log('no requirements');
                } else {
                    var count;
                    try {
                        connectionPool.getConnection(function (err, connection) {
                            connection.query("SELECT count(id) as count FROM Profiles WHERE NickName = " + mysql.escape(request.body.NickName), function (err, rows) {
//console.log(rows);
//count = rows[0].count;
                                connection.release();
                            });
                        });
                    } catch (e) {
                        res.writeHead(err);
                    }
                    var NickName = Email = Password = Salt = Couple = Sex = LookingFor = Headline = DescriptionMe = Country = City = DateOfBirth = DateReg = Tags = zip = EmailNotify = Height = Weight = Income = Occupation = Religion = Education = RelationshipStatus = Hobbies = Interests = Ethnicity = FavoriteSites = FavoriteMusic = FavoriteFilms = FavoriteBooks = FirstName = LastName = FacebookProfile = "''";
                    NickName = mysql.escape(request.body.NIckName);
                    Email = mysql.escape(request.body.Email);
                    var Pass = crypto.createHash('md5').update(request.body.Password).digest('hex');
                    Salt = randomString(8);
                    Password = crypto.createHash('sha1').update(Pass + Salt).digest('hex');
////console.log(Password, Salt);
                    sql = "INSERT INTO `Profiles`(NickName, Email, Password, Salt, Couple, Sex, LookingFor, Headline, DescriptionMe, Country, City, DateOfBirth, DateReg, Tags, zip, EmailNotify, Height, Weight, Income, Occupation, Religion, Education, RelationshipStatus, Hobbies, Interests, Ethnicity, FavoriteSites, FavoriteMusic, FavoriteFilms, FavoriteBooks, FirstName, LastName) VALUES (" + mysql.escape(request.body.NickName) + ", " + mysql.escape(request.body.Email) + ", " + "'" + Password + "'" + ", " + "'" + Salt + "'" + ", " + mysql.escape(nts(request.body.Couple)) + ", " + mysql.escape(nts(request.body.Sex)) + ", " + mysql.escape(nts(request.body.LookingFor)) + ", " + mysql.escape(nts(request.body.Headline)) + ", " + mysql.escape(nts(request.body.DescriptionMe)) + ", " + mysql.escape(nts(request.body.Country)) + ", " + mysql.escape(nts(request.body.City)) + ", " + mysql.escape(nts(request.body.DateOfBirth)) + ", " + mysql.escape(nts(request.body.DateReg)) + ", " + mysql.escape(nts(request.body.Tags)) + ", " + mysql.escape(nts(request.body.zip)) + ", " + mysql.escape(nts(request.body.EmailNotify)) + ", " + mysql.escape(nts(request.body.Height)) + ", " + mysql.escape(nts(request.body.Weight)) + ", " + mysql.escape(nts(request.body.Income)) + ", " + mysql.escape(nts(request.body.Occupation)) + ", " + mysql.escape(nts(request.body.Religion)) + ", " + mysql.escape(nts(request.body.Education)) + ", " + mysql.escape(nts(request.body.RelationshipStatus)) + ", " + mysql.escape(nts(request.body.Hobbies)) + ", " + mysql.escape(nts(request.body.Interests)) + ", " + mysql.escape(nts(request.body.Ethnicity)) + ", " + mysql.escape(nts(request.body.FavoriteSites)) + ", " + mysql.escape(nts(request.body.FavoriteMusic)) + ", " + mysql.escape(nts(request.body.FavoriteFilms)) + ", " + mysql.escape(nts(request.body.FavoriteBooks)) + ", " + mysql.escape(nts(request.body.FirstName)) + ", " + mysql.escape(nts(request.body.LastName)) + ")";
//console.log(sql);
                    try {
                        connectionPool.getConnection(function (err, connection, sql) {
                            console.log(sql);
                            connection.query("SELECT count(id) as count FROM Profiles WHERE NickName = " + mysql.escape(request.body.NickName), request.body.NickName, function (err, rows, fields) {
                                console.log(sql);
                                var count = rows[0].count;
//console.log(count);
                                if (count == 0) {
                                    console.log('count printed');
                                    connectionPool.getConnection(function (err, connection, sql) {
                                        connection.query("INSERT INTO `Profiles`(NickName, Email, Password, Salt, Couple, Sex, LookingFor, Headline, DescriptionMe, Country, City, DateOfBirth, DateReg, Tags, zip, EmailNotify, Height, Weight, Income, Occupation, Religion, Education, RelationshipStatus, Hobbies, Interests, Ethnicity, FavoriteSites, FavoriteMusic, FavoriteFilms, FavoriteBooks, FirstName, LastName) VALUES (" + mysql.escape(request.body.NickName) + ", " + mysql.escape(request.body.Email) + ", " + "'" + Password + "'" + ", " + "'" + Salt + "'" + ", " + mysql.escape(nts(request.body.Couple)) + ", " + mysql.escape(nts(request.body.Sex)) + ", " + mysql.escape(nts(request.body.LookingFor)) + ", " + mysql.escape(nts(request.body.Headline)) + ", " + mysql.escape(nts(request.body.DescriptionMe)) + ", " + mysql.escape(nts(request.body.Country)) + ", " + mysql.escape(nts(request.body.City)) + ", " + mysql.escape(nts(request.body.DateOfBirth)) + ", " + mysql.escape(nts(request.body.DateReg)) + ", " + mysql.escape(nts(request.body.Tags)) + ", " + mysql.escape(nts(request.body.zip)) + ", " + mysql.escape(nts(request.body.EmailNotify)) + ", " + mysql.escape(nts(request.body.Height)) + ", " + mysql.escape(nts(request.body.Weight)) + ", " + mysql.escape(nts(request.body.Income)) + ", " + mysql.escape(nts(request.body.Occupation)) + ", " + mysql.escape(nts(request.body.Religion)) + ", " + mysql.escape(nts(request.body.Education)) + ", " + mysql.escape(nts(request.body.RelationshipStatus)) + ", " + mysql.escape(nts(request.body.Hobbies)) + ", " + mysql.escape(nts(request.body.Interests)) + ", " + mysql.escape(nts(request.body.Ethnicity)) + ", " + mysql.escape(nts(request.body.FavoriteSites)) + ", " + mysql.escape(nts(request.body.FavoriteMusic)) + ", " + mysql.escape(nts(request.body.FavoriteFilms)) + ", " + mysql.escape(nts(request.body.FavoriteBooks)) + ", " + mysql.escape(nts(request.body.FirstName)) + ", " + mysql.escape(nts(request.body.LastName)) + ")", request.body.NickName, function (err, rows, fields) {
//console.log("INSERT INTO `Profiles`(NickName, Email, Password, Salt, Couple, Sex, LookingFor, Headline, DescriptionMe, Country, City, DateOfBirth, DateReg, Tags, zip, EmailNotify, Height, Weight, Income, Occupation, Religion, Education, RelationshipStatus, Hobbies, Interests, Ethnicity, FavoriteSites, FavoriteMusic, FavoriteFilms, FavoriteBooks, FirstName, LastName) VALUES ("+mysql.escape(request.body.NickName)+", "+mysql.escape(request.body.Email)+", "+"'"+Password+"'"+", "+"'"+Salt+"'"+", "+mysql.escape(nts(request.body.Couple))+", "+mysql.escape(nts(request.body.Sex))+", "+mysql.escape(nts(request.body.LookingFor))+", "+mysql.escape(nts(request.body.Headline))+", "+mysql.escape(nts(request.body.DescriptionMe))+", "+mysql.escape(nts(request.body.Country))+", "+mysql.escape(nts(request.body.City))+", "+mysql.escape(nts(request.body.DateOfBirth))+", "+mysql.escape(nts(request.body.DateReg))+", "+mysql.escape(nts(request.body.Tags))+", "+mysql.escape(nts(request.body.zip))+", "+mysql.escape(nts(request.body.EmailNotify))+", "+mysql.escape(nts(request.body.Height))+", "+mysql.escape(nts(request.body.Weight))+", "+mysql.escape(nts(request.body.Income))+", "+mysql.escape(nts(request.body.Occupation))+", "+mysql.escape(nts(request.body.Religion))+", "+mysql.escape(nts(request.body.Education))+", "+mysql.escape(nts(request.body.RelationshipStatus))+", "+mysql.escape(nts(request.body.Hobbies))+", "+mysql.escape(nts(request.body.Interests))+", "+mysql.escape(nts(request.body.Ethnicity))+", "+mysql.escape(nts(request.body.FavoriteSites))+", "+mysql.escape(nts(request.body.FavoriteMusic))+", "+mysql.escape(nts(request.body.FavoriteFilms))+", "+mysql.escape(nts(request.body.FavoriteBooks))+", "+mysql.escape(nts(request.body.FirstName))+", "+mysql.escape(nts(request.body.LastName))+")");
                                        });
                                    });
                                    connectionPool.getConnection(function (err, connection, sql) {
                                        connection.query("SELECT id FROM Profiles WHERE NickName = " + mysql.escape(request.body.NickName), request.body.NickName, function (err, rows, fields) {
                                            response.send({
                                                result: 'success',
                                                err: '',
//fields: fields,
                                                json: rows
//length: rows.length
                                            });
                                        });
                                    });
                                }
                                else {
                                    response.send({
                                        result: 'success',
                                        err: '',
//fields: fields,
                                        json: -1
//length: rows.length
                                    });
                                }
//console.log(count);
                                connection.release();
                            });
                        });
                    } catch (e) {
                        res.writeHead(err);
                        console.log(err);
                    }
                    console.log('count = ' + count);
////console.log(request.body);
                }
            }
        }
    };
};