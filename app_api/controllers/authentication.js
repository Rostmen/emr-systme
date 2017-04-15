var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');


/**
 * @apiDefine public Public access
 * This is public access group
 */

/**
 * @apiDefine user User access only
 * This is private access group
 */

/**
 * @apiDefine admin Administrator access only
 * This is Administrator access group
 */

/**
 * @apiDefine AuthenticationHeader example
 * * @apiHeader {String} Authorization The Auth token retrived during login.
   * @apiHeaderExample  {json} Header-Example:
   *    {
   *      "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1OGYxNDRhYzQ2MTJlZjEwZjYxZmEwYTIiLCJlbWFpbCI6IndAZS5yIiwiZXhwIjoxNDkyODI2ODI5LCJpYXQiOjE0OTIyMjIwMjl9.I25aIQiFBv1wAGYAgApxzweBlfdaO_GHKpdgSCqDWek"
   *    }
   * 
 */

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

/**
 * @apiDefine SignUpError
 *
 * @apiError PasswordInvalid The password should be longer.
 *
 * @apiErrorExample PasswordInvalid:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Password should be longer"
 *     }
 *
 * @apiError UsernameExists The username alredy exists.
 *
 * @apiErrorExample UsernameExists:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Username alredy exists"
 *     }
 */

/**
 * @apiDefine UnauthorizedError
 * 
 * @apiError Unauthorized The request is not authorized.
 * 
 * @apiErrorExample {json} Unauthorized:
 *     HTTP/1.1 401 Not Found
 *     {
 *        "error": "Unauthorized"
 *     }
 */
var getErrorMessage = function(err) {
  var message = '';
  if (err.code) {
    switch (err.code) {
      case 11000: 
      case 11001:
        message = 'Username alredy exists';
        break;
      default:
        message = 'Something went wrong';
    }
  } else {
    for (var name in err.errors) {
      if (err.errors[name].message) message = err.errors[name].message;
    }
  }
  return message;
};

  /**
   * @api {post} /api/register Sign Up
   * @apiVersion 0.0.1
   * @apiName SignUp
   * @apiGroup Authorization
   * @apiDescription Register User. 
   * @apiPermission public
   * 
   * @apiParam {String}   email     User email.
   * @apiParam {String}   password    User password.
   * @apiParam {String}   username     The username.
   * @apiParam {String}   [fullname]    User first and last name.
   * 
   * @apiHeaderExample {json} Request-Example:
   *     {
   *      "fullname":"John Smith",
   *      "email":"jsmith@example.com",
   *      "username":"jsmith",
   *      "password":"qwerty123"
   *     }
   * 
   * @apiSuccess {String}   token            Auth token. 
   * 
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1OGYxNDRhYzQ2MTJlZjEwZjYxZmEwYTIiLCJlbWFpbCI6IndAZS5yIiwiZXhwIjoxNDkyODI2ODI5LCJpYXQiOjE0OTIyMjIwMjl9.I25aIQiFBv1wAGYAgApxzweBlfdaO_GHKpdgSCqDWek"
   *     }
   *
   * @apiUse SignUpError
   */
module.exports.register = function(req, res, next) {

  if (!req.user) {
    var user = new User(req.body);
    user.provider = 'local';

    user.save(function(err) {
      if (err) {
        sendJSONresponse(res, 401, { "error": getErrorMessage(err) });
        return;
      }
      
      sendJSONresponse(res, 200, { "token" : user.generateJwt() });
    });
  }
};

module.exports.login = function(req, res) {
  
  console.log("Loggin user: " + req.body);
  /**
   * @api {post} /api/login Sign In
   * @apiVersion 0.0.1
   * @apiName SignIn
   * @apiGroup Authorization
   * @apiDescription Authenticate User using credentials. 
   * @apiPermission public
   * 
   * @apiParam {String}   email     User email.
   * @apiParam {String}   password    User password.
   * 
   * @apiHeaderExample {json} Request-Example:
   *     {
   *        "email": "jsmith@example.com"
   *        "password": "qwerty123"
   *     }
   * @apiSuccess {String}   token            Auth token. 
   * 
   * 
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1OGYxNDRhYzQ2MTJlZjEwZjYxZmEwYTIiLCJlbWFpbCI6IndAZS5yIiwiZXhwIjoxNDkyODI2ODI5LCJpYXQiOjE0OTIyMjIwMjl9.I25aIQiFBv1wAGYAgApxzweBlfdaO_GHKpdgSCqDWek"
   *     }
   *
   * @apiErrorExample {json} Error-Response:
   *     HTTP/1.1 401 Not Found
   *     {
   *       "message": "Password is wrong"
   *     }
   */
  passport.authenticate('local', function(err, user, info) {
    var token;

    // If Passport throws/catches an error
    if (err) {
      sendJSONresponse(res, 401, { "error": getErrorMessage(err) });
      return;
    }

    // If a user is found
    if(user){
      sendJSONresponse(res, 200, { "token" : user.generateJwt() });
    } else {
      // If user is not found
      sendJSONresponse(res, 401, { "error": info });
    }
  })(req, res);

};