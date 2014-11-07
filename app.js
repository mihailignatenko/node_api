var express = require('express')
  , mysql = require('mysql')
  , mongoose = require('mongoose')
  , cookieParser = require('cookie-parser')
  , bodyParser = require('body-parser')
  , swagger = require('swagger-express')
  , path = require('path')
  , expressSession = require('express-session')
  , mongo = require('mongoose')
  , config = require('./config');


var app = express()
  , boonex_modules = [];

exports.app = app;
exports.boonex_modules = boonex_modules;

app.use(cookieParser());
var MongoStore = require('connect-mongo')(expressSession);
app.use(cookieParser());
app.use(expressSession({
  secret: config.session.secret,
  maxAge: config.session.maxAge,
  store: new MongoStore(config.mongo.development)
}));


app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded()); // to support URL-encoded bodies
app.use(swagger.init(app, config.swagger));


app.use(express.static(path.join(__dirname, 'public')));
connectionpool = mysql.createPool(config.mysql.development);
connectionpool.getConnection(function (err, connection) {
  connection.query("SELECT * FROM `sys_modules`", null, function (err, rows) {
    for (i = 0; i < rows.length; ++i) {
      boonex_modules[rows[i].title] = rows[i].title;
    }
    // now it's ready to create routes
    //DEBUG[[---------------------------------------------------
    console.log('boonex modules:', boonex_modules)
    process.boonex_modules = boonex_modules;
    app.connectionPool = connectionpool;

    //DEBUG]]---------------------------------------------------

//    require('./routes/test')(app);
    var menuRoutes = require('./routes/menus')(app);
    var profilesRoutes = require('./routes/profiles')(app);
    var predefinedRoutes = require('./routes/predefined')(app);
    app.get('/profile/:id', profilesRoutes.get.profileById);
    app.get('/profile/:id/friends', profilesRoutes.get.profileFriends);
    app.get('/profiles/:page/:perpage', profilesRoutes.get.profilesPerPage);
    app.get('/topmenu', menuRoutes.get.getTopMenu);
    app.get('/servicemenu', menuRoutes.get.getServiceMenu);
    app.get('/bottommenu', menuRoutes.get.getBottomMenu);
    app.get('/menumember', menuRoutes.get.getMenuMember);
    app.get('/predefined', predefinedRoutes.get.getPredefined);
    app.get('/profilefields', profilesRoutes.get.profileFields);
    app.post('/register', profilesRoutes.post.profileRegister);
    app.post('/auth', profilesRoutes.post.profileAuth);


  });
});

// TODO: write and use function config.mongoURI
var dbUrl = 'mongodb://';
//dbUrl += conf.db.username + ':' + conf.db.password + '@';
dbUrl += config.mongo.development.host + ':' + config.mongo.development.port;
dbUrl += '/' + config.mongo.development.db;
console.log(dbUrl);
mongo.connect(dbUrl);
mongo.connection.on('open', function () {
  console.log('connected to mongo');
  app.listen(3000, '0.0.0.0');
});