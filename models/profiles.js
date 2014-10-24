var connectionPool;

function getProfileById(id, cb) {
  connectionPool.getConnection(function (err, connection) {
    connection.query('SELECT p.`ID`, p.`NickName`, p.`Email`, p.`Status`, p.`Role`, p.`Couple`, p.`Sex`,' +
      ' p.`LookingFor`, p.`Headline`, p.`DescriptionMe`, ' + ' p.`Country`, p.`City`, p.`DateOfBirth`,' +
      ' p.`Featured`, p.`DateReg`, p.`DateLastEdit`, p.`DateLastLogin`, p.`DateLastNav`, p.`aff_num`,' +
      ' p.`Tags`, p.`zip`, p.`EmailNotify`, p.`LangID`, p.`UpdateMatch`, p.`Views`, p.`Rate`, p.`RateCount`,' +
      ' p.`CommentsCount`, p.`PrivacyDefaultGroup`, p.`allow_view_to`, p.`UserStatus`, p.`UserStatusMessage`,' +
      ' p.`UserStatusMessageWhen`, p.`Avatar`, p.`Height`, p.`Weight`, p.`Income`, p.`Occupation`, p.`Religion`,' +
      ' p.`Education`, p.`RelationshipStatus`, p.`Hobbies`, p.`Interests`, p.`Ethnicity`, p.`FavoriteSites`,' +
      ' p.`FavoriteMusic`, p.`FavoriteFilms`, p.`FavoriteBooks`, p.`FirstName`, p.`LastName` FROM Profiles as' +
      ' p WHERE p.id = ' + id, function (err, rows, fields) {
      if (rows.length > 0) {
        var tmp = rows[0];
        if (process.boonex_modules['Avatar']) {
          var sql = 'SELECT bx_photos_main.hash, bx_photos_main.ext FROM  bx_avatar_images,  bx_photos_main WHERE ' +
            'bx_avatar_images.id = bx_photos_main.id AND bx_avatar_images.author_id = ';
          connection.query(sql + id, function (err, rows, fields) {
            tmp['avatar'] = rows;
            process.nextTick(function() {
              cb(null, tmp);
            });
          });
        } else {
          process.nextTick(function(){
            cb(null, tmp);
          });
        }
        connection.release();
      } else {
        cb('user not found');
      }
    });
  });
}

function getProfilesPerPage(page, perPage, cb) {
  try {
    connectionPool.getConnection(function (err, connection) {

      connection.query('SELECT p.`ID`, p.`NickName`, p.`Email`, p.`Status`, p.`Role`, p.`Couple`, p.`Sex`,' +
        ' p.`LookingFor`, p.`Headline`, p.`DescriptionMe`, p.`Country`, p.`City`, p.`DateOfBirth`, p.`Featured`,' +
        ' p.`DateReg`, p.`DateLastEdit`, p.`DateLastLogin`, p.`DateLastNav`, p.`aff_num`, p.`Tags`, p.`zip`,' +
        ' p.`EmailNotify`, p.`LangID`, p.`UpdateMatch`, p.`Views`, p.`Rate`, p.`RateCount`, p.`CommentsCount`,' +
        ' p.`PrivacyDefaultGroup`, p.`allow_view_to`, p.`UserStatus`, p.`UserStatusMessage`,' +
        ' p.`UserStatusMessageWhen`, p.`Avatar`, p.`Height`, p.`Weight`, p.`Income`, p.`Occupation`,' +
        ' p.`Religion`, p.`Education`, p.`RelationshipStatus`, p.`Hobbies`, p.`Interests`, p.`Ethnicity`,' +
        ' p.`FavoriteSites`, p.`FavoriteMusic`, p.`FavoriteFilms`, p.`FavoriteBooks`, p.`FirstName`,' +
        ' p.`LastName`, p.`FacebookProfile`, bx_photos_main.hash, bx_photos_main.ext FROM Profiles as' +
        ' p LEFT JOIN bx_avatar_images ON bx_avatar_images.author_id = p.id LEFT JOIN bx_photos_main ON' +
        ' bx_avatar_images.id = bx_photos_main.id LIMIT ' + (page - 1) * perPage +
        ', ' + perPage, function (err, rows) {
        process.nextTick(function() {
          cb(null, rows);
        });
        connection.release();
      });
    });
  } catch (e) {
    res.writeHead(e);
  }
}

module.exports = function (_connectionPool) {
  connectionPool = _connectionPool;

  return {
    getProfileById: getProfileById,
    getProfilesPerPage: getProfilesPerPage
  }
};