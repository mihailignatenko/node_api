var connect_params = require('./connect');
//var Cookies = require("cookies");
var express = require('express'),
        app = express(),
        mysql = require('mysql'),
        connectionpool = mysql.createPool(connect_params.connection);

var boonex_modules = [];
var bodyParser = require('body-parser');

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded()); // to support URL-encoded bodies
//var Cookies = require("cookies");
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
        //DEBUG[[---------------------------------------------------
        process.boonex_modules = boonex_modules;
        app.connectionPool = connectionpool;

        //DEBUG]]---------------------------------------------------

        require('./routes/test')(app);
        var profilesRoutes = require('./routes/profiles')(app);

        app.get('/profile/:id', profilesRoutes.get.profileById);
        app.get('/profiles/:page/:perpage', profilesRoutes.get.profilesPerPage);
        app.get('/profiles/:id/friends', profilesRoutes.get.profileFriends);
        app.post('/register', profilesRoutes.post.register);

    });
});

// if FaceBook module installed
function isFaceBook() {
    if (boonex_modules['Facebook connect']) {
        return ' p.`FacebookProfile` ';
    }
    else
        return ' ';
}

app.listen(8000);
//console.log('Rest Demo Listening on port 8000');