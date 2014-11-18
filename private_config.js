var secret_config = {
  mysql: {
    production: {
      //
    },
    development: {
      host: 'localhost',
      user: 'root',
      password: 'sax4071505',
      database: '1to1'
    }
  },
  mongo: {
    development: {
      db: 'test',
      host: 'localhost',
      port: 27017,  // optional, default: 27017
      collection: 'mySessions' // optional, default: sessions
    }
  },
  session: {
    secret: '076ee61d63aa10a125ea872411e433b9',
    "key": "sid",
    "cookie": {
        "httpOnly": true
//        "maxAge": null,
//        "path": "/"
    }
  }
};

module.exports = secret_config;