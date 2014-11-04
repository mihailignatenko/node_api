var mysql = require('mysql');
var application = require('./application');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser')
var connect_params = application.connect_params;
var app = application.app;
var bodyParser = require('body-parser');
var boonex_modules = application.boonex_modules;
var path = require('path');
var swagger = require('swagger-express');
var express = application.express;
app.use(cookieParser());
var expressSession = require('express-session');
var MongoStore = require('connect-mongo')(expressSession);
var mongo = require('mongoose');
conf = application.conf;
  app.use(cookieParser());
  app.use(expressSession({
    secret: conf.secret,
    maxAge: new Date(Date.now() + 3600000),
    store: new MongoStore(conf.db)
  }));
  // important that this comes after session management
  //app.use(app.router);
//app.set('view engine', 'jade');


app.use(bodyParser());
//app.use(require('methodOverride'));
app.use(swagger.init(app, {
    apiVersion: '1.0',
    swaggerVersion: '1.0',
    basePath: 'http://localhost:3000',
    swaggerURL: '/swagger',
    swaggerJSON: '/api-docs.json',
    swaggerUI: './public/swagger/',
    apis: ['./api.js']
}));
//app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
connectionpool = mysql.createPool(connect_params.connection);
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
        var menuRoutes = require('./routes/menus')(app);
        var profilesRoutes = require('./routes/profiles')(app);
        var predefinedRoutes = require('./routes/predefined')(app);
        var categoryRoutes = require('./routes/categories')(app);
        app.get('/profile/:id', profilesRoutes.get.profileById);
        app.get('/profile/:id/friends', profilesRoutes.get.profileFriends);
        app.get('/profiles/:page/:perpage', profilesRoutes.get.profilesPerPage);
        app.get('/topmenu', menuRoutes.get.getTopMenu);
        app.get('/servicemenu', menuRoutes.get.getServiceMenu);
        app.get('/bottommenu', menuRoutes.get.getBottomMenu);
        app.get('/menumember', menuRoutes.get.getMenuMember);
        app.get('/predefined', predefinedRoutes.get.getPredefined);
        app.get('/profilefields', profilesRoutes.get.profileFields);
        app.get('/syscategories', categoryRoutes.get.sysCategories);
        //app.get('/syscatsbymodules/:id', categoryRoutes.get.sysCatsByModules);
        app.post('/register', profilesRoutes.post.profileRegister);
        app.post('/auth', profilesRoutes.post.profileAuth);
        

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


var dbUrl = 'mongodb://';
//dbUrl += conf.db.username + ':' + conf.db.password + '@';
dbUrl += conf.db.host + ':' + conf.db.port;
dbUrl += '/' + conf.db.db;
console.log(dbUrl);
mongo.connect(dbUrl);
mongo.connection.on('open', function () {
    console.log('connected to mongo');
  app.listen(3000);
});