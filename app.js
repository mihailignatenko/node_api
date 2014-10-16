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
app.use( bodyParser.json());       // to support JSON-encoded bodies
app.use( bodyParser.urlencoded() ); // to support URL-encoded bodies
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
function nts(val){
    if(val===NULL){
        return '';
    }
    else {
        return val;
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
connectionpool.getConnection(function(err, connection){
    connection.query("SELECT * FROM `sys_modules`", null, function(err, rows){
        //console.log(rows);
        rows.forEach(function(row){
           //boonex_modules.push(row.title);
           boonex_modules[row.title] = row.title;
        });
    });
        
});
// profile creation
app.post('/register', function(request, response){
    if(!(request.body.NickName) || !(request.body.password_confirm) || !(request.body.FirstName) || !(request.body.LastName) || !(request.body.Password) || !(request.body.Password===request.body.password_confirm)){
        console.log('no requirements');
    } else {
            var count;
            try {
            connectionpool.getConnection(function(err, connection) { 
                connection.query("SELECT count(id) as count FROM Profiles WHERE NickName = "+mysql.escape(request.body.NickName), request.body.NickName, function(err, rows, fields) {
                    //console.log(rows[0].count);
                    count = rows[0].count;
                    connection.release();
                });
            });
            } catch(e) {
                res.writeHead(err);
            }         
        
        var NickName = Email = Password = Salt = Couple = Sex = LookingFor = Headline = DescriptionMe = Country = City = DateOfBirth = DateReg = Tags = zip = EmailNotify = Height = Weight = Income = Occupation = Religion = Education = RelationshipStatus = Hobbies = Interests = Ethnicity = FavoriteSites = FavoriteMusic = FavoriteFilms = FavoriteBooks = FirstName = LastName = FacebookProfile = "''";
        NickName =mysql.escape(request.body.NIckName);
        Email = mysql.escape(request.body.Email);
        var Pass = crypto.createHash('md5').update(request.body.Password).digest('hex');
        Salt = randomString(8);
        Password = crypto.createHash('sha1').update(Pass+Salt).digest('hex');
        //console.log(Password, Salt);
        var sql = "INSERT INTO `Profiles`(NickName, Email, Password, Salt, Couple, Sex, LookingFor, Headline, DescriptionMe, Country, City, DateOfBirth, DateReg, Tags, zip, EmailNotify, Height, Weight, Income, Occupation, Religion, Education, RelationshipStatus, Hobbies, Interests, Ethnicity, FavoriteSites, FavoriteMusic, FavoriteFilms, FavoriteBooks, FirstName, LastName) VALUES ("+mysql.escape(request.body.NickName)+", "+mysql.escape(request.body.Email)+", "+"'"+Password+"'"+", "+"'"+Salt+"'"+", "+nts(mysql.escape(request.body.Couple))+", "+nts(mysql.escape(request.body.Sex))+", "+nts(mysql.escape(request.body.LookingFor))+", "+nts(mysql.escape(request.body.Headline))+", "+nts(mysql.escape(request.body.DescriptionMe))+", "+nts(mysql.escape(request.body.Country))+", "+nts(mysql.escape(request.body.City))+", "+nts(mysql.escape(request.body.DateOfBirth))+", "+nts(mysql.escape(request.body.DateReg))+", "+nts(mysql.escape(request.body.Tags))+", "+nts(mysql.escape(request.body.zip))+", "+nts(mysql.escape(request.body.EmailNotify))+", "+nts(mysql.escape(request.body.Height))+", "+nts(mysql.escape(request.body.Weight))+", "+nts(mysql.escape(request.body.Income))+", "+nts(mysql.escape(request.body.Occupation))+", "+nts(mysql.escape(request.body.Religion))+", "+nts(mysql.escape(request.body.Education))+", "+nts(mysql.escape(request.body.RelationshipStatus))+", "+nts(mysql.escape(request.body.Hobbies))+", "+nts(mysql.escape(request.body.Interests))+", "+nts(mysql.escape(request.body.Ethnicity))+", "+nts(mysql.escape(request.body.FavoriteSites))+", "+nts(mysql.escape(request.body.FavoriteMusic))+", "+nts(mysql.escape(request.body.FavoriteFilms))+", "+nts(mysql.escape(request.body.FavoriteBooks))+", "+nts(mysql.escape(request.body.FirstName))+", "+nts(mysql.escape(request.body.LastName))+")";
        console.log(sql);
            res.send({
                result: 'success',
                err: '',
                //fields: fields,
                json: 'ok'
                //length: rows.length
            });         
            try {
            connectionpool.getConnection(function(err, connection) { 
                connection.query("SELECT count(id) as count FROM Profiles WHERE NickName = "+mysql.escape(request.body.NickName), request.body.NickName, function(err, rows, fields) {
                    //console.log(rows[0].count);
                    count = rows[0].count;
                    if(count<1){
                        console.log(count);
                    }
                    connection.release();
                });
            });
            } catch(e) {
                res.writeHead(err);
            }    
        //console.log(sql);
        //console.log(request.body);
    }
});
// profile friends
app.get('/profile/:id/friends', function(req, res) {
    try {
    connectionpool.getConnection(function(err, connection) { 
        connection.query('SELECT  friends.`ID`, friends.`NickName`, friends.`Email`, friends.`Status`, friends.`Role`, friends.`Couple`, friends.`Sex`, friends.`LookingFor`, friends.`Headline`, friends.`DescriptionMe`, friends.`Country`, friends.`City`, friends.`DateOfBirth`, friends.`Featured`, friends.`DateReg`, friends.`DateLastEdit`, friends.`DateLastLogin`, friends.`DateLastNav`, friends.`aff_num`, friends.`Tags`, friends.`zip`, friends.`EmailNotify`, friends.`LangID`, friends.`UpdateMatch`, friends.`Views`, friends.`Rate`, friends.`RateCount`, friends.`CommentsCount`, friends.`PrivacyDefaultGroup`, friends.`allow_view_to`, friends.`UserStatus`, friends.`UserStatusMessage`, friends.`UserStatusMessageWhen`, friends.`Avatar`, friends.`Height`, friends.`Weight`, friends.`Income`, friends.`Occupation`, friends.`Religion`, friends.`Education`, friends.`RelationshipStatus`, friends.`Hobbies`, friends.`Interests`, friends.`Ethnicity`, friends.`FavoriteSites`, friends.`FavoriteMusic`, friends.`FavoriteFilms`, friends.`FavoriteBooks`, friends.`FirstName`, friends.`LastName`, friends.`FacebookProfile`, bx_photos_main.hash, bx_photos_main.ext FROM Profiles as friends INNER JOIN sys_friend_list as sys ON sys.Profile = friends.id INNER JOIN Profiles as p ON sys.id = p.id LEFT JOIN bx_avatar_images ON bx_avatar_images.author_id = p.id LEFT JOIN bx_photos_main ON bx_avatar_images.id = bx_photos_main.id  WHERE p.id = '+req.params.id, req.params.id, function(err, rows, fields) {
            res.send({
                result: 'success',
                err: '',
                //fields: fields,
                json: rows
                //length: rows.length
            });
            connection.release();
        });
    });
    } catch(e) {
        res.writeHead(err);
    }    
});
//app.post('/:table', function(req, res) {
//    
//});
//app.put('/:table/:id', function(req, res) {
//});
//app.delete('/:table/:id', function(req, res) {
//});


// if FaceBook module installed
function isFaceBook(){
    if(boonex_modules['Facebook connect']){
        return ' p.`FacebookProfile` ';
    }
    else return ' ';
}
//------------------------------------------------------------------------------
// Profiles/:id
app.get('/profile/:id', function(req, res) {    
    try {
    connectionpool.getConnection(function(err, connection) {
        var fb = isFaceBook();
        //console.log(fb);
        console.log('SELECT p.`ID`, p.`NickName`, p.`Email`, p.`Status`, p.`Role`, p.`Couple`, p.`Sex`, p.`LookingFor`, p.`Headline`, p.`DescriptionMe`, '+fb+' p.`Country`, p.`City`, p.`DateOfBirth`, p.`Featured`, p.`DateReg`, p.`DateLastEdit`, p.`DateLastLogin`, p.`DateLastNav`, p.`aff_num`, p.`Tags`, p.`zip`, p.`EmailNotify`, p.`LangID`, p.`UpdateMatch`, p.`Views`, p.`Rate`, p.`RateCount`, p.`CommentsCount`, p.`PrivacyDefaultGroup`, p.`allow_view_to`, p.`UserStatus`, p.`UserStatusMessage`, p.`UserStatusMessageWhen`, p.`Avatar`, p.`Height`, p.`Weight`, p.`Income`, p.`Occupation`, p.`Religion`, p.`Education`, p.`RelationshipStatus`, p.`Hobbies`, p.`Interests`, p.`Ethnicity`, p.`FavoriteSites`, p.`FavoriteMusic`, p.`FavoriteFilms`, p.`FavoriteBooks`, p.`FirstName`, p.`LastName` FROM Profiles as p WHERE p.id = ');
        
        connection.query('SELECT p.`ID`, p.`NickName`, p.`Email`, p.`Status`, p.`Role`, p.`Couple`, p.`Sex`, p.`LookingFor`, p.`Headline`, p.`DescriptionMe`, '+' p.`Country`, p.`City`, p.`DateOfBirth`, p.`Featured`, p.`DateReg`, p.`DateLastEdit`, p.`DateLastLogin`, p.`DateLastNav`, p.`aff_num`, p.`Tags`, p.`zip`, p.`EmailNotify`, p.`LangID`, p.`UpdateMatch`, p.`Views`, p.`Rate`, p.`RateCount`, p.`CommentsCount`, p.`PrivacyDefaultGroup`, p.`allow_view_to`, p.`UserStatus`, p.`UserStatusMessage`, p.`UserStatusMessageWhen`, p.`Avatar`, p.`Height`, p.`Weight`, p.`Income`, p.`Occupation`, p.`Religion`, p.`Education`, p.`RelationshipStatus`, p.`Hobbies`, p.`Interests`, p.`Ethnicity`, p.`FavoriteSites`, p.`FavoriteMusic`, p.`FavoriteFilms`, p.`FavoriteBooks`, p.`FirstName`, p.`LastName` FROM Profiles as p WHERE p.id = '+req.params.id, req.params.id, function(err, rows, fields) {
            var tmp = rows[0];
//            res.send({
//                result: 'success',
//                err: '',
//                //fields: fields
//                json: rows
//                //length: rows.length
//            });            
            if(boonex_modules['Avatar']){
                console.log(1);
                var sql = 'SELECT bx_photos_main.hash, bx_photos_main.ext FROM  bx_avatar_images,  bx_photos_main WHERE bx_avatar_images.id = bx_photos_main.id AND bx_avatar_images.author_id = ';
                connection.query(sql+req.params.id, req.params.id, function(err, rows, fields){
                    //console.log(tmp);
                    tmp['avatar'] = rows;
                    res.send({
                        json: tmp
                    });
                });
            } else {
                res.send({
                    result: 'success',
                    err: '',
                    //fields: fields
                    json: rows
                    //length: rows.length
                });                 
            }
            connection.release();
        });
    });
    } catch(e) {
        res.writeHead(err);
    }    
});
app.get('/profiles/:perpage/:page', function(req, res) {
    try {
    connectionpool.getConnection(function(err, connection) { 
        connection.query("SELECT * FROM `sys_modules`", req.params.id, function(err, rows) {
            //console.log(boonex_modules);
            
                //console.log(boonex_modules);
            
            if(false){
                // connection.query('SELECT p.`ID`, p.`NickName`, p.`Email`, p.`Status`, p.`Role`, p.`Couple`, p.`Sex`, p.`LookingFor`, p.`Headline`, p.`DescriptionMe`, p.`Country`, p.`City`, p.`DateOfBirth`, p.`Featured`, p.`DateReg`, p.`DateLastEdit`, p.`DateLastLogin`, p.`DateLastNav`, p.`aff_num`, p.`Tags`, p.`zip`, p.`EmailNotify`, p.`LangID`, p.`UpdateMatch`, p.`Views`, p.`Rate`, p.`RateCount`, p.`CommentsCount`, p.`PrivacyDefaultGroup`, p.`allow_view_to`, p.`UserStatus`, p.`UserStatusMessage`, p.`UserStatusMessageWhen`, p.`Avatar`, p.`Height`, p.`Weight`, p.`Income`, p.`Occupation`, p.`Religion`, p.`Education`, p.`RelationshipStatus`, p.`Hobbies`, p.`Interests`, p.`Ethnicity`, p.`FavoriteSites`, p.`FavoriteMusic`, p.`FavoriteFilms`, p.`FavoriteBooks`, p.`FirstName`, p.`LastName`, p.`FacebookProfile`, bx_photos_main.hash, bx_photos_main.ext FROM Profiles as p LEFT JOIN bx_avatar_images ON bx_avatar_images.author_id = p.id LEFT JOIN bx_photos_main ON bx_avatar_images.id = bx_photos_main.id LIMIT '+req.params.perpage*req.params.page + ', '+req.params.page, req.params.id, function(err, rows, fields) 
                
                connection.query('SELECT p.`ID`, p.`NickName`, p.`Email`, p.`Status`, p.`Role`, p.`Couple`, p.`Sex`, p.`LookingFor`, p.`Headline`, p.`DescriptionMe`, p.`Country`, p.`City`, p.`DateOfBirth`, p.`Featured`, p.`DateReg`, p.`DateLastEdit`, p.`DateLastLogin`, p.`DateLastNav`, p.`aff_num`, p.`Tags`, p.`zip`, p.`EmailNotify`, p.`LangID`, p.`UpdateMatch`, p.`Views`, p.`Rate`, p.`RateCount`, p.`CommentsCount`, p.`PrivacyDefaultGroup`, p.`allow_view_to`, p.`UserStatus`, p.`UserStatusMessage`, p.`UserStatusMessageWhen`, p.`Avatar`, p.`Height`, p.`Weight`, p.`Income`, p.`Occupation`, p.`Religion`, p.`Education`, p.`RelationshipStatus`, p.`Hobbies`, p.`Interests`, p.`Ethnicity`, p.`FavoriteSites`, p.`FavoriteMusic`, p.`FavoriteFilms`, p.`FavoriteBooks`, p.`FirstName`, p.`LastName`, p.`FacebookProfile`, bx_photos_main.hash, bx_photos_main.ext FROM Profiles as p LEFT JOIN bx_avatar_images ON bx_avatar_images.author_id = p.id LEFT JOIN bx_photos_main ON bx_avatar_images.id = bx_photos_main.id LIMIT '+req.params.perpage*req.params.page + ', '+req.params.page, req.params.id, function(err, rows, fields){
                    res.send({
                        result: 'success',
                        err: '',
                        //fields: fields,
                        json: rows
                        //length: rows.length
                    });                    
                }); 
            } else {
                connection.query('SELECT p.`ID`, p.`NickName`, p.`Email`, p.`Status`, p.`Role`, p.`Couple`, p.`Sex`, p.`LookingFor`, p.`Headline`, p.`DescriptionMe`, p.`Country`, p.`City`, p.`DateOfBirth`, p.`Featured`, p.`DateReg`, p.`DateLastEdit`, p.`DateLastLogin`, p.`DateLastNav`, p.`aff_num`, p.`Tags`, p.`zip`, p.`EmailNotify`, p.`LangID`, p.`UpdateMatch`, p.`Views`, p.`Rate`, p.`RateCount`, p.`CommentsCount`, p.`PrivacyDefaultGroup`, p.`allow_view_to`, p.`UserStatus`, p.`UserStatusMessage`, p.`UserStatusMessageWhen`, p.`Avatar`, p.`Height`, p.`Weight`, p.`Income`, p.`Occupation`, p.`Religion`, p.`Education`, p.`RelationshipStatus`, p.`Hobbies`, p.`Interests`, p.`Ethnicity`, p.`FavoriteSites`, p.`FavoriteMusic`, p.`FavoriteFilms`, p.`FavoriteBooks`, p.`FirstName`, p.`LastName`, p.`FacebookProfile` FROM Profiles as p  LIMIT '+req.params.perpage*req.params.page + ', '+req.params.page, req.params.id, function(err, rows, fields){
                    res.send({
                        result: 'success',
                        err: '',
                        //fields: fields,
                        json: rows
                        //length: rows.length
                    });                    
                });                 
            }
            connection.release();       
        });
    });
    } catch(e) {
        
    }       
//    try {
//    connectionpool.getConnection(function(err, connection) { 
//        connection.query('SELECT p.`ID`, p.`NickName`, p.`Email`, p.`Status`, p.`Role`, p.`Couple`, p.`Sex`, p.`LookingFor`, p.`Headline`, p.`DescriptionMe`, p.`Country`, p.`City`, p.`DateOfBirth`, p.`Featured`, p.`DateReg`, p.`DateLastEdit`, p.`DateLastLogin`, p.`DateLastNav`, p.`aff_num`, p.`Tags`, p.`zip`, p.`EmailNotify`, p.`LangID`, p.`UpdateMatch`, p.`Views`, p.`Rate`, p.`RateCount`, p.`CommentsCount`, p.`PrivacyDefaultGroup`, p.`allow_view_to`, p.`UserStatus`, p.`UserStatusMessage`, p.`UserStatusMessageWhen`, p.`Avatar`, p.`Height`, p.`Weight`, p.`Income`, p.`Occupation`, p.`Religion`, p.`Education`, p.`RelationshipStatus`, p.`Hobbies`, p.`Interests`, p.`Ethnicity`, p.`FavoriteSites`, p.`FavoriteMusic`, p.`FavoriteFilms`, p.`FavoriteBooks`, p.`FirstName`, p.`LastName`, p.`FacebookProfile`, bx_photos_main.hash, bx_photos_main.ext FROM Profiles as p LEFT JOIN bx_avatar_images ON bx_avatar_images.author_id = p.id LEFT JOIN bx_photos_main ON bx_avatar_images.id = bx_photos_main.id LIMIT '+req.params.perpage*req.params.page + ', '+req.params.page, req.params.id, function(err, rows, fields) {
//            res.send({
//                result: 'success',
//                err: '',
//                //fields: fields,
//                json: rows
//                //length: rows.length
//            });
//            connection.release();
//        });
//    });
//    } catch(e) {
//        res.writeHead(err);
//    }    
});
//events
//SELECT e . * , p.id AS user_id, p.FirstName, p.LastName, p.NickName, avatar.hash, avatar.ext 
//FROM bx_events_main AS e
//LEFT JOIN Profiles AS p ON e.responsibleid = p.id LEFT JOIN bx_avatar_images ON bx_avatar_images.author_id = p.id LEFT JOIN bx_photos_main as avatar ON bx_avatar_images.id = avatar.id LEFT JOIN bx_events_images ON e.id = bx_events_images.entry_id LEFT JOIN bx_photos_main as images ON bx_events_images.media_id GROUP BY e.id
//
app.get('/events/:perpage/:page', function(req, res) {
    try {
    connectionpool.getConnection(function(err, connection) { 
        connection.query('SELECT e.*, p.id AS user_id, p.FirstName, p.LastName, p.NickName, avatar.hash, avatar.ext FROM bx_events_main AS e LEFT JOIN Profiles AS p ON e.responsibleid = p.id LEFT JOIN bx_avatar_images ON bx_avatar_images.author_id = p.id LEFT JOIN bx_photos_main AS avatar ON bx_avatar_images.id = avatar.id LEFT JOIN bx_events_images ON e.id = bx_events_images.entry_id LEFT JOIN bx_photos_main AS images ON bx_events_images.media_id GROUP BY e.id LIMIT '+req.params.perpage*req.params.page + ', '+req.params.page, req.params.id, function(err, rows, fields){
            res.send({
                result: 'success',
                err: '',
                //fields: fields,
                json: rows
                //length: rows.length
            });
            connection.release();
        });
    });
    } catch(e) {
        res.writeHead(err);
    }    
});
//events/:id
app.get('/event/:id', function(req, res) {
    try {
    connectionpool.getConnection(function(err, connection) { 
        connection.query('SELECT e. * , p.id AS user_id, p.FirstName, p.LastName, p.NickName, avatar.hash, avatar.ext FROM bx_events_main AS e LEFT JOIN Profiles AS p ON e.responsibleid = p.id LEFT JOIN bx_avatar_images ON bx_avatar_images.author_id = p.id LEFT JOIN bx_photos_main AS avatar ON bx_avatar_images.id = avatar.id LEFT JOIN bx_events_images ON e.id = bx_events_images.entry_id LEFT JOIN bx_photos_main AS images ON bx_events_images.media_id WHERE e.id='+req.params.id+' GROUP BY e.id', req.params.id, function(err, rows, fields){
            res.send({
                result: 'success',
                err: '',
                //fields: fields,
                json: rows
                //length: rows.length
            });
            connection.release();
        });
    });
    } catch(e) {
        res.writeHead(err);
    }    
});
//event's posts
app.get('/event/:id/posts/:perpage/:page', function(req, res) {
    try {
    connectionpool.getConnection(function(err, connection) { 
        connection.query('SELECT cmt.*, p.id, p.FirstName, p.LastName, p.NickName, avatar.hash, avatar.ext FROM `bx_events_cmts` as cmt LEFT JOIN Profiles as p ON cmt.cmt_author_id  = p.id LEFT JOIN bx_avatar_images ON bx_avatar_images.author_id = p.id LEFT JOIN bx_photos_main AS avatar ON bx_avatar_images.id = avatar.id  WHERE `cmt_object_id` = '+req.params.id+' LIMIT '+req.params.perpage*req.params.page + ', '+req.params.page, req.params.id, function(err, rows, fields){
            res.send({
                result: 'success',
                err: '',
                //fields: fields,
                json: rows
                //length: rows.length
            });
            connection.release();
        });
    });
    } catch(e) {
        res.writeHead(err);
    }    
});
//comment for events
//SELECT cmt.*, p.id, p.FirstName, p.LastName, p.NickName, avatar.hash, avatar.ext FROM `bx_events_cmts` as cmt LEFT JOIN Profiles as p ON cmt.cmt_author_id  = p.id LEFT JOIN bx_avatar_images ON bx_avatar_images.author_id = p.id LEFT JOIN bx_photos_main AS avatar ON bx_avatar_images.id = avatar.id  WHERE `cmt_object_id` = 1 

app.listen(8000);
console.log('Rest Demo Listening on port 8000');