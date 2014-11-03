var application = require('../application');
var app = application.app;
var should = require('should');
var supertest = require('supertest');
var profilesRoutes = require('../routes/profiles')(app);
var request = require('supertest');
var assert = require('assert');
describe('menus', function () {
    var url = 'http://localhost:3000';
    it('should check for id of 1-st element in service menu', function (done) {
        request(url)
                .get('/servicemenu')
                .send()
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body[0].should.have.property('ID');                    
                    done();
                });
    });
    it('should check for id of 1-st element in top menu', function(done){
        request(url)
                .get('/topmenu')
                .send()
                .end(function(err, res){
                    if (err){
                        throw err;
                    }
                    res.body[0].should.have.property('ID');
                    done();
                });
    });
    it('should check for id of 1-st element in menumember', function(done){
        request(url)
                .get('/menumember')
                .send()
                .end(function(err, res){
                    if (err){
                        throw err;
                    }
                    res.body[0].should.have.property('ID');
                    done();
                });
    });
});