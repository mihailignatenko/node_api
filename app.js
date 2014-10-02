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
var bodyParser = require('body-parser');
app.use( bodyParser.json());       // to support JSON-encoded bodies
app.use( bodyParser.urlencoded() ); // to support URL-encoded bodies
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
app.get('/profiles/:id/friends', function(req, res) {
    try {
    connectionpool.getConnection(function(err, connection) { 
        connection.query('SELECT  friends.`ID`, friends.`NickName`, friends.`Email`, friends.`Status`, friends.`Role`, friends.`Couple`, friends.`Sex`, friends.`LookingFor`, friends.`Headline`, friends.`DescriptionMe`, friends.`Country`, friends.`City`, friends.`DateOfBirth`, friends.`Featured`, friends.`DateReg`, friends.`DateLastEdit`, friends.`DateLastLogin`, friends.`DateLastNav`, friends.`aff_num`, friends.`Tags`, friends.`zip`, friends.`EmailNotify`, friends.`LangID`, friends.`UpdateMatch`, friends.`Views`, friends.`Rate`, friends.`RateCount`, friends.`CommentsCount`, friends.`PrivacyDefaultGroup`, friends.`allow_view_to`, friends.`UserStatus`, friends.`UserStatusMessage`, friends.`UserStatusMessageWhen`, friends.`Avatar`, friends.`Height`, friends.`Weight`, friends.`Income`, friends.`Occupation`, friends.`Religion`, friends.`Education`, friends.`RelationshipStatus`, friends.`Hobbies`, friends.`Interests`, friends.`Ethnicity`, friends.`FavoriteSites`, friends.`FavoriteMusic`, friends.`FavoriteFilms`, friends.`FavoriteBooks`, friends.`FirstName`, friends.`LastName`, friends.`FacebookProfile`, bx_photos_main.hash, bx_photos_main.ext FROM Profiles as friends INNER JOIN sys_friend_list as sys ON sys.Profile = friends.id INNER JOIN Profiles as p ON sys.id = p.id LEFT JOIN bx_avatar_images ON bx_avatar_images.author_id = p.id LEFT JOIN bx_photos_main ON bx_avatar_images.id = bx_photos_main.id  WHERE p.id = '+req.params.id, req.params.id, function(err, rows, fields) {
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
//app.post('/:table', function(req, res) {
//    
//});
//app.put('/:table/:id', function(req, res) {
//});
//app.delete('/:table/:id', function(req, res) {
//});

//------------------------------------------------------------------------------
// Profiles/:id
app.get('/profiles/:id', function(req, res) {
    try {
    connectionpool.getConnection(function(err, connection) { 
        connection.query('SELECT p.`ID`, p.`NickName`, p.`Email`, p.`Status`, p.`Role`, p.`Couple`, p.`Sex`, p.`LookingFor`, p.`Headline`, p.`DescriptionMe`, p.`Country`, p.`City`, p.`DateOfBirth`, p.`Featured`, p.`DateReg`, p.`DateLastEdit`, p.`DateLastLogin`, p.`DateLastNav`, p.`aff_num`, p.`Tags`, p.`zip`, p.`EmailNotify`, p.`LangID`, p.`UpdateMatch`, p.`Views`, p.`Rate`, p.`RateCount`, p.`CommentsCount`, p.`PrivacyDefaultGroup`, p.`allow_view_to`, p.`UserStatus`, p.`UserStatusMessage`, p.`UserStatusMessageWhen`, p.`Avatar`, p.`Height`, p.`Weight`, p.`Income`, p.`Occupation`, p.`Religion`, p.`Education`, p.`RelationshipStatus`, p.`Hobbies`, p.`Interests`, p.`Ethnicity`, p.`FavoriteSites`, p.`FavoriteMusic`, p.`FavoriteFilms`, p.`FavoriteBooks`, p.`FirstName`, p.`LastName`, p.`FacebookProfile`, bx_photos_main.hash, bx_photos_main.ext FROM Profiles as p LEFT JOIN bx_avatar_images ON bx_avatar_images.author_id = p.id LEFT JOIN bx_photos_main ON bx_avatar_images.id = bx_photos_main.id  WHERE p.id = '+req.params.id, req.params.id, function(err, rows, fields) {
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
app.get('/profiles/:perpage/:page', function(req, res) {
    try {
    connectionpool.getConnection(function(err, connection) { 
        connection.query('SELECT p.`ID`, p.`NickName`, p.`Email`, p.`Status`, p.`Role`, p.`Couple`, p.`Sex`, p.`LookingFor`, p.`Headline`, p.`DescriptionMe`, p.`Country`, p.`City`, p.`DateOfBirth`, p.`Featured`, p.`DateReg`, p.`DateLastEdit`, p.`DateLastLogin`, p.`DateLastNav`, p.`aff_num`, p.`Tags`, p.`zip`, p.`EmailNotify`, p.`LangID`, p.`UpdateMatch`, p.`Views`, p.`Rate`, p.`RateCount`, p.`CommentsCount`, p.`PrivacyDefaultGroup`, p.`allow_view_to`, p.`UserStatus`, p.`UserStatusMessage`, p.`UserStatusMessageWhen`, p.`Avatar`, p.`Height`, p.`Weight`, p.`Income`, p.`Occupation`, p.`Religion`, p.`Education`, p.`RelationshipStatus`, p.`Hobbies`, p.`Interests`, p.`Ethnicity`, p.`FavoriteSites`, p.`FavoriteMusic`, p.`FavoriteFilms`, p.`FavoriteBooks`, p.`FirstName`, p.`LastName`, p.`FacebookProfile`, bx_photos_main.hash, bx_photos_main.ext FROM Profiles as p LEFT JOIN bx_avatar_images ON bx_avatar_images.author_id = p.id LEFT JOIN bx_photos_main ON bx_avatar_images.id = bx_photos_main.id LIMIT '+req.params.perpage*req.params.page + ', '+req.params.page, req.params.id, function(err, rows, fields) {
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
//events
//SELECT e . * , p.id AS user_id, p.FirstName, p.LastName, p.NickName, avatar.hash, avatar.ext 
//FROM bx_events_main AS e
//LEFT JOIN Profiles AS p ON e.responsibleid = p.id LEFT JOIN bx_avatar_images ON bx_avatar_images.author_id = p.id LEFT JOIN bx_photos_main as avatar ON bx_avatar_images.id = avatar.id LEFT JOIN bx_events_images ON e.id = bx_events_images.entry_id LEFT JOIN bx_photos_main as images ON bx_events_images.media_id GROUP BY e.id
//
app.get('/events/:perpage/:page', function(req, res) {
    try {
    connectionpool.getConnection(function(err, connection) { 
        connection.query('SELECT e.*, p.id AS user_id, p.FirstName, p.LastName, p.NickName, avatar.hash, avatar.ext FROM bx_events_main AS e LEFT JOIN Profiles AS p ON e.responsibleid = p.id LEFT JOIN bx_avatar_images ON bx_avatar_images.author_id = p.id LEFT JOIN bx_photos_main AS avatar ON bx_avatar_images.id = avatar.id LEFT JOIN bx_events_images ON e.id = bx_events_images.entry_id LEFT JOIN bx_photos_main AS images ON bx_events_images.media_id GROUP BY e.id LIMIT '+req.params.perpage*req.params.page + ', '+req.params.page, req.params.id, function(err, rows, fields){
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
//events/:id
app.get('/event/:id', function(req, res) {
    try {
    connectionpool.getConnection(function(err, connection) { 
        connection.query('SELECT e. * , p.id AS user_id, p.FirstName, p.LastName, p.NickName, avatar.hash, avatar.ext FROM bx_events_main AS e LEFT JOIN Profiles AS p ON e.responsibleid = p.id LEFT JOIN bx_avatar_images ON bx_avatar_images.author_id = p.id LEFT JOIN bx_photos_main AS avatar ON bx_avatar_images.id = avatar.id LEFT JOIN bx_events_images ON e.id = bx_events_images.entry_id LEFT JOIN bx_photos_main AS images ON bx_events_images.media_id WHERE e.id='+req.params.id+' GROUP BY e.id', req.params.id, function(err, rows, fields){
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
//event's posts
app.get('/event/:id/posts/:perpage/:page', function(req, res) {
    try {
    connectionpool.getConnection(function(err, connection) { 
        connection.query('SELECT cmt.*, p.id, p.FirstName, p.LastName, p.NickName, avatar.hash, avatar.ext FROM `bx_events_cmts` as cmt LEFT JOIN Profiles as p ON cmt.cmt_author_id  = p.id LEFT JOIN bx_avatar_images ON bx_avatar_images.author_id = p.id LEFT JOIN bx_photos_main AS avatar ON bx_avatar_images.id = avatar.id  WHERE `cmt_object_id` = '+req.params.id+' LIMIT '+req.params.perpage*req.params.page + ', '+req.params.page, req.params.id, function(err, rows, fields){
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
//comment for events
//SELECT cmt.*, p.id, p.FirstName, p.LastName, p.NickName, avatar.hash, avatar.ext FROM `bx_events_cmts` as cmt LEFT JOIN Profiles as p ON cmt.cmt_author_id  = p.id LEFT JOIN bx_avatar_images ON bx_avatar_images.author_id = p.id LEFT JOIN bx_photos_main AS avatar ON bx_avatar_images.id = avatar.id  WHERE `cmt_object_id` = 1 

app.listen(8000);
console.log('Rest Demo Listening on port 8000');