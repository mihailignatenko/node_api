var connect_params = require('./connect');
var Cookies = require("cookies");
var express = require('express'),
        app = express(),
        mysql = require('mysql'),
        connectionpool = mysql.createPool(connect_params.connection);


// routes--------------------------------------------------------------
//---------------------------------------------------------------------
var where_field = 1;
var order_field = 1;
var limit;
var offset;
var boonex_modules = [];
var bodyParser = require('body-parser');
var sql;
//var sql = "INSERT INTO `Profiles`(NickName, Email, Password, Salt, Couple, Sex, LookingFor, Headline, DescriptionMe, Country, City, DateOfBirth, DateReg, Tags, zip, EmailNotify, Height, Weight, Income, Occupation, Religion, Education, RelationshipStatus, Hobbies, Interests, Ethnicity, FavoriteSites, FavoriteMusic, FavoriteFilms, FavoriteBooks, FirstName, LastName) VALUES ("+mysql.escape(request.body.NickName)+", "+mysql.escape(request.body.Email)+", "+"'"+Password+"'"+", "+"'"+Salt+"'"+", "+mysql.escape(nts(request.body.Couple))+", "+mysql.escape(nts(request.body.Sex))+", "+mysql.escape(nts(request.body.LookingFor))+", "+mysql.escape(nts(request.body.Headline))+", "+mysql.escape(nts(request.body.DescriptionMe))+", "+mysql.escape(nts(request.body.Country))+", "+mysql.escape(nts(request.body.City))+", "+mysql.escape(nts(request.body.DateOfBirth))+", "+mysql.escape(nts(request.body.DateReg))+", "+mysql.escape(nts(request.body.Tags))+", "+mysql.escape(nts(request.body.zip))+", "+mysql.escape(nts(request.body.EmailNotify))+", "+mysql.escape(nts(request.body.Height))+", "+mysql.escape(nts(request.body.Weight))+", "+mysql.escape(nts(request.body.Income))+", "+mysql.escape(nts(request.body.Occupation))+", "+mysql.escape(nts(request.body.Religion))+", "+mysql.escape(nts(request.body.Education))+", "+mysql.escape(nts(request.body.RelationshipStatus))+", "+mysql.escape(nts(request.body.Hobbies))+", "+mysql.escape(nts(request.body.Interests))+", "+mysql.escape(nts(request.body.Ethnicity))+", "+mysql.escape(nts(request.body.FavoriteSites))+", "+mysql.escape(nts(request.body.FavoriteMusic))+", "+mysql.escape(nts(request.body.FavoriteFilms))+", "+mysql.escape(nts(request.body.FavoriteBooks))+", "+mysql.escape(nts(request.body.FirstName))+", "+mysql.escape(nts(request.body.LastName))+")";
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded()); // to support URL-encoded bodies
var Cookies = require("cookies");
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});


connectionpool.getConnection(function (err, connection) {
    connection.query("SELECT * FROM `sys_modules`", null, function (err, rows) {
        for (i = 0; i < rows.length; ++i) {
            boonex_modules[rows[i].title] = rows[i].title;
        }
        // now it's ready to create routes

        var testRoutes = require('./routes/test');
        var profilesRoutes = require('./routes/profiles')(connectionpool, boonex_modules);

        app.get('/profile/:id', profilesRoutes.get.profileById);
        app.get('/profiles/:page/:perpage', profilesRoutes.get.profilesPerPage);
        app.get('/profiles/:id/friends', profilesRoutes.get.profileFriends);
        app.post('/register', profilesRoutes.post.register);
    });
});


//app.post('/:table', function(req, res) {
//    
//});
//app.put('/:table/:id', function(req, res) {
//});
//app.delete('/:table/:id', function(req, res) {
//});


// if FaceBook module installed
function isFaceBook() {
    if (boonex_modules['Facebook connect']) {
        return ' p.`FacebookProfile` ';
    }
    else
        return ' ';
}
//------------------------------------------------------------------------------
// Profiles/:id

//events
//SELECT e . * , p.id AS user_id, p.FirstName, p.LastName, p.NickName, avatar.hash, avatar.ext 
//FROM bx_events_main AS e
//LEFT JOIN Profiles AS p ON e.responsibleid = p.id LEFT JOIN bx_avatar_images ON bx_avatar_images.author_id = p.id LEFT JOIN bx_photos_main as avatar ON bx_avatar_images.id = avatar.id LEFT JOIN bx_events_images ON e.id = bx_events_images.entry_id LEFT JOIN bx_photos_main as images ON bx_events_images.media_id GROUP BY e.id
//
app.get('/events/:perpage/:page', function (req, res) {
    try {
        connectionpool.getConnection(function (err, connection) {
            connection.query('SELECT e.*, p.id AS user_id, p.FirstName, p.LastName, p.NickName, avatar.hash, avatar.ext FROM bx_events_main AS e LEFT JOIN Profiles AS p ON e.responsibleid = p.id LEFT JOIN bx_avatar_images ON bx_avatar_images.author_id = p.id LEFT JOIN bx_photos_main AS avatar ON bx_avatar_images.id = avatar.id LEFT JOIN bx_events_images ON e.id = bx_events_images.entry_id LEFT JOIN bx_photos_main AS images ON bx_events_images.media_id GROUP BY e.id LIMIT ' + req.params.perpage * req.params.page + ', ' + req.params.page, req.params.id, function (err, rows, fields) {
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
});
//events/:id
app.get('/event/:id', function (req, res) {
    try {
        connectionpool.getConnection(function (err, connection) {
            connection.query('SELECT e. * , p.id AS user_id, p.FirstName, p.LastName, p.NickName, avatar.hash, avatar.ext FROM bx_events_main AS e LEFT JOIN Profiles AS p ON e.responsibleid = p.id LEFT JOIN bx_avatar_images ON bx_avatar_images.author_id = p.id LEFT JOIN bx_photos_main AS avatar ON bx_avatar_images.id = avatar.id LEFT JOIN bx_events_images ON e.id = bx_events_images.entry_id LEFT JOIN bx_photos_main AS images ON bx_events_images.media_id WHERE e.id=' + req.params.id + ' GROUP BY e.id', req.params.id, function (err, rows, fields) {
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
});
//event's posts
app.get('/event/:id/posts/:perpage/:page', function (req, res) {
    try {
        connectionpool.getConnection(function (err, connection) {
            connection.query('SELECT cmt.*, p.id, p.FirstName, p.LastName, p.NickName, avatar.hash, avatar.ext FROM `bx_events_cmts` as cmt LEFT JOIN Profiles as p ON cmt.cmt_author_id  = p.id LEFT JOIN bx_avatar_images ON bx_avatar_images.author_id = p.id LEFT JOIN bx_photos_main AS avatar ON bx_avatar_images.id = avatar.id  WHERE `cmt_object_id` = ' + req.params.id + ' LIMIT ' + req.params.perpage * req.params.page + ', ' + req.params.page, req.params.id, function (err, rows, fields) {
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
});
//comment for events
//SELECT cmt.*, p.id, p.FirstName, p.LastName, p.NickName, avatar.hash, avatar.ext FROM `bx_events_cmts` as cmt LEFT JOIN Profiles as p ON cmt.cmt_author_id  = p.id LEFT JOIN bx_avatar_images ON bx_avatar_images.author_id = p.id LEFT JOIN bx_photos_main AS avatar ON bx_avatar_images.id = avatar.id  WHERE `cmt_object_id` = 1 

app.listen(8000);
//console.log('Rest Demo Listening on port 8000');