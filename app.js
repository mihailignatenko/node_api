var  mysql = require('mysql');
var application =require('./application');
var connect_params = application.connect_params;
var app = application.app;
app.use(function(req, res, next) {
  res.contentType('application/json');
  next();
});
var boonex_modules = application.boonex_modules;
var path = require('path');
var swagger = require('./lib/swagger-express');
var express = application.express;
app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  //app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
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
});



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
        var profilesRoutes = require('./routes/profiles')(app);

        app.get('/profile/:id', profilesRoutes.get.profileById);
        app.get('/profile/:id/friends', profilesRoutes.get.profileFriends);
        app.get('/profiles/:page/:perpage', profilesRoutes.get.profilesPerPage);        
        app.post('/register', profilesRoutes.post.profileRegister);

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
app.listen(3000);
//console.log('Rest Demo Listening on port 8000');