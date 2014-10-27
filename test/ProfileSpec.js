var application =require('../application');
var app = application.app;
var should = require('should');
var supertest = require('supertest');
var profilesRoutes = require('../routes/profiles')(app);
var request = require('supertest');
var assert = require('assert');
//describe('flights', function(){
//    it('should pass', function(done){
//        done();
//    });
//    it('should not pass', function(done){
//        throw "don't pass";
//        done();
//    });
//});
describe('profiles', function(){
    var url = 'http://localhost:8000';
    it('should return user with id=1', function(done){
        request(url)
       .get('/profile/1')
       .send()
       .end(function(err, res){
           if(err) {
               throw err;
           }
           res.body.json.ID.should.equal(1);
           console.log(res.body.json.ID);
           done();
       });        
    });
});