var should = require('should');
var supertest = require('supertest');
var request = require('supertest');
var assert = require('assert');

describe('predefined', function(){
  var url = 'http://localhost:3000';
  it('should check for first predefined value', function(done){
        request(url)
          .get('/predefined')
          .send()
          .end(function(err, res){
          if(err){
            throw err;
          }
          res.body[0].should.have.property('Key');
          done();
        });
  });
});