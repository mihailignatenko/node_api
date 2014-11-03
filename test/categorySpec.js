var application = require('../application');
var app = application.app;
var should = require('should');
var supertest = require('supertest');
var profilesRoutes = require('../routes/profiles')(app);
var request = require('supertest');
var assert = require('assert');

describe('categories', function(){
  var url = 'http://localhost:3000';
  it('should check for id of 1-st category', function(done){
        request(url)
                .get('/syscategories')
                .send()
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body[0].should.have.property('ID');
                    done();
                });
  });
});