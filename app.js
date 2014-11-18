var express = require('express')
  , mysql = require('mysql')
  , mongoose = require('mongoose')
  , cookieParser = require('cookie-parser')
  , bodyParser = require('body-parser')
  //, swagger = require('swagger-express')
  , path = require('path')
  , expressSession = require('express-session')
  , mongo = require('mongoose')
  , config = require('./config'),
    url = require("url");
    


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
// ---------swagger---------
cors = require("cors");
var corsOptions = {
  credentials: true,
  origin: function(origin,callback) {
    if(origin===undefined) {
      callback(null,false);
    } else {
      // change wordnik.com to your allowed domain.
      var match = origin.match("^(.*)?.wordnik.com(\:[0-9]+)?");
      var allowed = (match!==null && match.length > 0);
      callback(null,allowed);
    }
  }
};
app.use(cors(corsOptions));
swagger = require('./lib').createNew(app);
var petResources = require("./swagger/resources.js");
var models = require("./swagger/models.js");
swagger.addValidator(
  function validate(req, path, httpMethod) {
    //  example, only allow POST for api_key="special-key"
    if ("POST" == httpMethod || "DELETE" == httpMethod || "PUT" == httpMethod) {
      var apiKey = req.headers["api_key"];
      if (!apiKey) {
        apiKey = url.parse(req.url,true).query["api_key"]; }
      if ("special-key" == apiKey) {
        return true;
      }
      return false;
    }
    return true;
  }
);
swagger.addModels(models)
        .addGet(petResources.findByTags)    // - /pet/findByTags
        .addGet(petResources.findByStatus)  // - /pet/findByStatus
        .addGet(petResources.findById)      // - /pet/{petId}
        .addPost(petResources.addPet)
        .addPut(petResources.updatePet)
        .addDelete(petResources.deletePet);
        //.addGet(petResources.topmenu);

swagger.configureDeclaration("pet", {
    description: "Operations about Pets",
    authorizations: ["oauth2"],
    produces: ["application/json"]
});
swagger.setApiInfo({
    title: "Swagger Sample App",
    description: "This is a sample server Petstore server. You can find out more about Swagger at <a href=\"http://swagger.wordnik.com\">http://swagger.wordnik.com</a> or on irc.freenode.net, #swagger.  For this sample, you can use the api key \"special-key\" to test the authorization filters",
    termsOfServiceUrl: "http://helloreverb.com/terms/",
    contact: "apiteam@wordnik.com",
    license: "Apache 2.0",
    licenseUrl: "http://www.apache.org/licenses/LICENSE-2.0.html"
});

swagger.setAuthorizations({
    apiKey: {
        type: "apiKey",
        passAs: "header"
    }
});
// Configures the app's base path and api version.
swagger.configureSwaggerPaths("", "api-docs", "");
swagger.configure("http://localhost:3000", "1.0.0");

// Serve up swagger ui at /docs via static route
//app.use(express.static(path.join(__dirname, 'public')));
var docs_handler = express.static(__dirname + '/swagger-ui/');
app.get(/^\/docs(\/.*)?$/, function(req, res, next) {
  if (req.url === '/docs') { // express static barfs on root url w/o trailing slash
    res.writeHead(302, { 'Location' : req.url + '/' });
    res.end();
    return;
  }
  // take off leading /docs so that connect locates file correctly
  req.url = req.url.substr('/docs'.length);
  return docs_handler(req, res, next);
});
//----------swgger end------

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');  
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'accept, origin, content-type, cookie');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  next();
});
app.use(bodyParser.json());	  // to support JSON-encoded bodies
app.use(bodyParser.urlencoded()); // to support URL-encoded bodies
//app.use(swagger.init(app, config.swagger));



connectionpool = mysql.createPool(config.mysql.development);
connectionpool.getConnection(function (err, connection) {
  connection.query("SELECT * FROM `sys_modules`", null, function (err, rows) {
    for (i = 0; i < rows.length; ++i) {
      boonex_modules[rows[i].title] = rows[i].title;
    }
    // now it's ready to create routes
    //DEBUG[[---------------------------------------------------
    console.log('boonex modules:', boonex_modules);
    process.boonex_modules = boonex_modules;
    app.connectionPool = connectionpool;
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
var server = require('http').createServer(app);
mongo.connection.on('open', function () {
  console.log('connected to mongo');
  server.listen(3000);
});
var io = require('socket.io').listen(server);

io.set("origins", "localhost:*");
io.sockets.on('connection', function(socket){
    socket.on('message', function(text, cb){
        console.log(text);
        socket.broadcast.emit('message', text);
        cb && cb();
    });
});




