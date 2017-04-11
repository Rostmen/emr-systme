var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

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
      if (err.errors[name].message) message = err.errors[name];
    }
  }
  return message;
};

module.exports.register = function(req, res, next) {

  if (!req.user) {
    var user = new User(req.body);
    user.provider = 'local';

    user.save(function(err) {
      var token;
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token
      });
    });
  }
};

module.exports.login = function(req, res) {
  
  console.log("Loggin user: " + req.body);

  passport.authenticate('local', function(err, user, info){
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if(user){
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);

};