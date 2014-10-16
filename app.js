var connect_params = require('./connect');
var crypto = require('crypto');
var express = require('express'),
        app = express(),
        mysql = require('mysql'),
        connectionpool = mysql.createPool(connect_params.connection);
//---------------------------------------------------------------------
var where_field =1;
var order_field = 1;
var limit;
var offset;
var boonex_modules = [];
var bodyParser = require('body-parser');
var sql;
//var sql = "INSERT INTO `Profiles`(NickName, Email, Password, Salt, Couple, Sex, LookingFor, Headline, DescriptionMe, Country, City, DateOfBirth, DateReg, Tags, zip, EmailNotify, Height, Weight, Income, Occupation, Religion, Education, RelationshipStatus, Hobbies, Interests, Ethnicity, FavoriteSites, FavoriteMusic, FavoriteFilms, FavoriteBooks, FirstName, LastName) VALUES ("+mysql.escape(request.body.NickName)+", "+mysql.escape(request.body.Email)+", "+"'"+Password+"'"+", "+"'"+Salt+"'"+", "+mysql.escape(nts(request.body.Couple))+", "+mysql.escape(nts(request.body.Sex))+", "+mysql.escape(nts(request.body.LookingFor))+", "+mysql.escape(nts(request.body.Headline))+", "+mysql.escape(nts(request.body.DescriptionMe))+", "+mysql.escape(nts(request.body.Country))+", "+mysql.escape(nts(request.body.City))+", "+mysql.escape(nts(request.body.DateOfBirth))+", "+mysql.escape(nts(request.body.DateReg))+", "+mysql.escape(nts(request.body.Tags))+", "+mysql.escape(nts(request.body.zip))+", "+mysql.escape(nts(request.body.EmailNotify))+", "+mysql.escape(nts(request.body.Height))+", "+mysql.escape(nts(request.body.Weight))+", "+mysql.escape(nts(request.body.Income))+", "+mysql.escape(nts(request.body.Occupation))+", "+mysql.escape(nts(request.body.Religion))+", "+mysql.escape(nts(request.body.Education))+", "+mysql.escape(nts(request.body.RelationshipStatus))+", "+mysql.escape(nts(request.body.Hobbies))+", "+mysql.escape(nts(request.body.Interests))+", "+mysql.escape(nts(request.body.Ethnicity))+", "+mysql.escape(nts(request.body.FavoriteSites))+", "+mysql.escape(nts(request.body.FavoriteMusic))+", "+mysql.escape(nts(request.body.FavoriteFilms))+", "+mysql.escape(nts(request.body.FavoriteBooks))+", "+mysql.escape(nts(request.body.FirstName))+", "+mysql.escape(nts(request.body.LastName))+")";
app.use( bodyParser.json());       // to support JSON-encoded bodies
app.use( bodyParser.urlencoded() ); // to support URL-encoded bodies
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
function nts(val){
    if(typeof val === 'undefined'){
        return '';
        conslole.log(1);
    }
    else {
        return val;
        //console.log(2);
    }
}
function randomString(len, charSet) {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
}

// profile creation

//comment for events
//SELECT cmt.*, p.id, p.FirstName, p.LastName, p.NickName, avatar.hash, avatar.ext FROM `bx_events_cmts` as cmt LEFT JOIN Profiles as p ON cmt.cmt_author_id  = p.id LEFT JOIN bx_avatar_images ON bx_avatar_images.author_id = p.id LEFT JOIN bx_photos_main AS avatar ON bx_avatar_images.id = avatar.id  WHERE `cmt_object_id` = 1 

app.listen(8000);
//console.log('Rest Demo Listening on port 8000');