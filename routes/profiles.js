var mysql = require('mysql');
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
        }
    };
};