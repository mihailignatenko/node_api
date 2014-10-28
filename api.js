
/**
 * @swagger
 * resourcePath: /apiJs
 * description: All about API
 */

/**
 * @swagger
 * path: /profile/{id}
 * operations:
 *   -  httpMethod: GET
 *      summary: Login with username and password
 *      notes: Returns a user based on username
 *      responseClass: User
 *      nickname: profile
 *      consumes: 
 *        - text/html
 *      parameters:      
 *        - name: id
 *          description: user's id
 *          paramType: query
 *          required: true
 *          dataType: string
 */
exports.profile = function (req, res) {
  var user = 
{
  "json": {
    "ID": 1,
    "NickName": 'user'+ new Date().getTime(),
    "Email": "user@user.com",
    "Status": "Active",
    "Role": 3,
    "Couple": 0,
    "Sex": "",
    "LookingFor": "",
    "Headline": "",
    "DescriptionMe": "",
    "Country": "",
    "City": "",
    "DateOfBirth": "2014-09-18",
    "Featured": 0,
    "DateReg": "2014-08-27T08:57:41.000Z",
    "DateLastEdit": "0000-00-00 00:00:00",
    "DateLastLogin": "2014-10-27T15:49:03.000Z",
    "DateLastNav": "2014-10-27T15:49:06.000Z",
    "aff_num": 0,
    "Tags": "",
    "zip": "",
    "EmailNotify": 1,
    "LangID": 0,
    "UpdateMatch": 1,
    "Views": 1,
    "Rate": 0,
    "RateCount": 0,
    "CommentsCount": 0,
    "PrivacyDefaultGroup": 3,
    "allow_view_to": 3,
    "UserStatus": "online",
    "UserStatusMessage": "",
    "UserStatusMessageWhen": 0,
    "Avatar": 0,
    "Height": "",
    "Weight": "",
    "Income": "",
    "Occupation": "",
    "Religion": "",
    "Education": "",
    "RelationshipStatus": "Engaged",
    "Hobbies": "",
    "Interests": "",
    "Ethnicity": "",
    "FavoriteSites": "",
    "FavoriteMusic": "",
    "FavoriteFilms": "",
    "FavoriteBooks": "",
    "FirstName": "testname",
    "LastName": ""
  }
};
  res.json(user);
}

/**
 * @swagger
 * models:
 *   User:
 *     id: User
 *     properties:
 *       ID:
 *         type: String
 *         required: true
 *       NickName: 
 *         type: String
 *         required: true
 *       Email: 
 *         type: String
 *         required: true
 *       Status:
 *         type: String
 *         required: true
 *       Role: 
 *         type: String
 *         required: true
 *       Couple:
 *         type: String
 *         required: true
 *       Sex: 
 *         type: String
 *         required: true
 *       LookingFor: 
 *         type: String
 *         required: true
 *       Headline: 
 *         type: String
 *         required: true
 *       DescriptionMe:
 *         type: String
 *         required: true
 *       Country:
 *         type: String
 *         required: true
 *       City:
 *         type: String
 *         required: true
 *       DateOfBirth:
 *         type: String
 *         required: true
 *       Featured:
 *         type: String
 *         required: true
 *       DateReg:
 *         type: String
 *         required: true
 *       DateLastLogin:
 *         type: String
 *         required: true
 *       DateLastNav:
 *         type: String
 *         required: true                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        *                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       *                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
 */