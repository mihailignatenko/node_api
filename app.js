var connect_params = require('./connect');
var express = require('express'),
        app = express(),
        mysql = require('mysql'),
        connectionpool = mysql.createPool(connect_params.connection);
//---------------------------------------------------------------------
var where_field =1;
var order_field = 1;
var limit;
var offset;
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
app.get('/profiles/:id/friends', function(req, res) {
    try {
    connectionpool.getConnection(function(err, connection) { 
        connection.query('SELECT  friends.`ID`, friends.`NickName`, friends.`Email`, friends.`Status`, friends.`Role`, friends.`Couple`, friends.`Sex`, friends.`LookingFor`, friends.`Headline`, friends.`DescriptionMe`, friends.`Country`, friends.`City`, friends.`DateOfBirth`, friends.`Featured`, friends.`DateReg`, friends.`DateLastEdit`, friends.`DateLastLogin`, friends.`DateLastNav`, friends.`aff_num`, friends.`Tags`, friends.`zip`, friends.`EmailNotify`, friends.`LangID`, friends.`UpdateMatch`, friends.`Views`, friends.`Rate`, friends.`RateCount`, friends.`CommentsCount`, friends.`PrivacyDefaultGroup`, friends.`allow_view_to`, friends.`UserStatus`, friends.`UserStatusMessage`, friends.`UserStatusMessageWhen`, friends.`Avatar`, friends.`Height`, friends.`Weight`, friends.`Income`, friends.`Occupation`, friends.`Religion`, friends.`Education`, friends.`RelationshipStatus`, friends.`Hobbies`, friends.`Interests`, friends.`Ethnicity`, friends.`FavoriteSites`, friends.`FavoriteMusic`, friends.`FavoriteFilms`, friends.`FavoriteBooks`, friends.`FirstName`, friends.`LastName`, friends.`FacebookProfile` FROM Profiles as friends INNER JOIN sys_friend_list as sys ON sys.Profile = friends.id INNER JOIN Profiles as p ON sys.id = p.id WHERE p.id = '+req.params.id, req.params.id, function(err, rows, fields) {
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
    } catch(e) {
        res.writeHead(err);
    }    
});
//CONCAT('SELECT ', (SELECT REPLACE(GROUP_CONCAT(COLUMN_NAME), 'id,', '') FROM  INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'products' AND TABLE_SCHEMA = 'doplacu'), ' FROM     products');
//
//
//
//
//
//
//SELECT * FROM Profiles as friends LEFT JOIN sys_friend_list as sys ON sys.Profile = friends.ID LEFT JOIN Profiles as p ON sys.id = p.id WHERE p.id = 1 AND sys.check = 1
        
//app.get('/:table', function(req, res) {
//    connectionpool.getConnection(function(err, connection) {
//        if (err) {
//            console.error('CONNECTION error: ', err);
//            res.statusCode = 503;
//            res.send({
//                result: 'error',
//                err: err.code
//            });
//        } else {
//            connection.query('SELECT * FROM ' + req.params.table + ' ', req.params.id, function(err, rows, fields) {
//                if (err) {
//                    console.error(err);
//                    res.statusCode = 500;
//                    res.send({
//                        result: 'error',
//                        err: err.code
//                    });
//                }
//                res.send({
//                    result: 'success',
//                    err: '',
//                    //fields: fields,
//                    json: rows,
//                    length: rows.length
//                });
//                connection.release();
//            });
//        }
//    });
//});
//app.get('/:table/:id', function(req, res) {
//    connectionpool.getConnection(function(err, connection) {
//        if (err) {
//            console.error('CONNECTION error: ', err);
//            res.statusCode = 503;
//            res.send({
//                result: 'error',
//                err: err.code
//            });
//        } else {
//            connection.query('SELECT * FROM ' + req.params.table + ' WHERE id ='+req.params.id, req.params.id, function(err, rows, fields) {
//                if (err) {
//                    console.error(err);
//                    res.statusCode = 500;
//                    res.send({
//                        result: 'error',
//                        err: err.code
//                    });
//                }
//                res.send({
//                    result: 'success',
//                    err: '',
//                    //fields: fields,
//                    json: rows,
//                    //length: rows.length
//                });
//                connection.release();
//            });
//        }
//    });
//});
app.post('/:table', function(req, res) {
    
});
app.put('/:table/:id', function(req, res) {
});
app.delete('/:table/:id', function(req, res) {
});

//------------------------------------------------------------------------------
// Profiles/:id
app.get('/profiles/:id', function(req, res) {
    try {
    connectionpool.getConnection(function(err, connection) { 
        connection.query('SELECT `ID`, `NickName`, `Email`, `Status`, `Role`, `Couple`, `Sex`, `LookingFor`, `Headline`, `DescriptionMe`, `Country`, `City`, `DateOfBirth`, `Featured`, `DateReg`, `DateLastEdit`, `DateLastLogin`, `DateLastNav`, `aff_num`, `Tags`, `zip`, `EmailNotify`, `LangID`, `UpdateMatch`, `Views`, `Rate`, `RateCount`, `CommentsCount`, `PrivacyDefaultGroup`, `allow_view_to`, `UserStatus`, `UserStatusMessage`, `UserStatusMessageWhen`, `Avatar`, `Height`, `Weight`, `Income`, `Occupation`, `Religion`, `Education`, `RelationshipStatus`, `Hobbies`, `Interests`, `Ethnicity`, `FavoriteSites`, `FavoriteMusic`, `FavoriteFilms`, `FavoriteBooks`, `FirstName`, `LastName`, `FacebookProfile` FROM Profiles WHERE id = '+req.params.id, req.params.id, function(err, rows, fields) {
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
    } catch(e) {
        res.writeHead(err);
    }    
});
app.get('/profiles', function(req, res) {
    try {
    connectionpool.getConnection(function(err, connection) { 
        connection.query('SELECT `ID`, `NickName`, `Email`, `Status`, `Role`, `Couple`, `Sex`, `LookingFor`, `Headline`, `DescriptionMe`, `Country`, `City`, `DateOfBirth`, `Featured`, `DateReg`, `DateLastEdit`, `DateLastLogin`, `DateLastNav`, `aff_num`, `Tags`, `zip`, `EmailNotify`, `LangID`, `UpdateMatch`, `Views`, `Rate`, `RateCount`, `CommentsCount`, `PrivacyDefaultGroup`, `allow_view_to`, `UserStatus`, `UserStatusMessage`, `UserStatusMessageWhen`, `Avatar`, `Height`, `Weight`, `Income`, `Occupation`, `Religion`, `Education`, `RelationshipStatus`, `Hobbies`, `Interests`, `Ethnicity`, `FavoriteSites`, `FavoriteMusic`, `FavoriteFilms`, `FavoriteBooks`, `FirstName`, `LastName`, `FacebookProfile` FROM Profiles', req.params.id, function(err, rows, fields) {
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
    } catch(e) {
        res.writeHead(err);
    }    
});
app.listen(8000);
console.log('Rest Demo Listening on port 8000');