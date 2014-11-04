secret_config = require('./private_config');

var config = {
  server: {
    host: '0.0.0.0',
    port: 3000
  }
};
config.mysql = {
  development: secret_config.mysql.development
};

config.mongo = {
  development: secret_config.mongo.development
};

config.swagger = {
  apiVersion: '1.0',
  swaggerVersion: '1.0',
  basePath: 'http://localhost:' + config.server.port,
  swaggerURL: '/swagger',
  swaggerJSON: '/api-docs.json',
  swaggerUI: './public/swagger/',
  apis: ['./api.js']
};

config.session = {
  secret: secret_config.session.secret,
  maxAge: 3600000
};

module.exports = config

function createURI(config) {

}

function mongoURI(env) {

}