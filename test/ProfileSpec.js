var application = require('../application');
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
describe('profiles', function () {
    var url = 'http://localhost:3000';
    it('should return user with id=1', function (done) {
        request(url)
                .get('/profile/1')
                .send()
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body.ID.should.equal(1);
                    //console.log(res.body.ID);
                    done();
                });
    });
    it('should get array of user id=1 friends and fist friend should have ID', function (done) {
        request(url)
                .get('/profile/1/friends')
                .send()
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    res.body[0].should.have.property('ID');
                    done();
                });
    });
    it('should register user and return id', function (done) {
//        curl -d 'NickName=test15&password_confirm=123&FirstName=Name1&LastName=Last1&Password=123&Email=aa@aa.com' localhost:8000/register
        var testname ='test'+ new Date().getTime();
        var profile = {
            NickName: testname,
            password_confirm: '123',
            FirstName: 'Name',
            LastName: 'Last',
            Password: '123',
            Email: 'aa@aa.com'
        };
        request(url)
                .post('/register')
                .send(profile)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    done();                    
                });
    });
});