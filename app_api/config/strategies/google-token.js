var passport = require('passport');
var GoogleTokenStrategy = require('passport-google-id-token');
var User = require('mongoose').model('User');
var config = require('../config');

module.exports = function() {
    passport.use(new GoogleTokenStrategy({
        clientID: config.googleiOSApplication,
        getGoogleCerts: optionalCustomGetGoogleCerts
    },
    function(parsedToken, googleId, done) {
        var providerUserProfile = {
            firstname: parsedToken.payload.name.givenName,
            lastname: parsedToken.payload.name.familyName,
            fullname: parsedToken.payload.name,
            email: parsedToken.payload.email,
            username: parsedToken.payload.username,
            provider: 'google',
            providerId: googleId,
            providerData: parsedToken
        };

        User.saveTokenUserProvider(req, providerUserProfile, done);
    }
    ));
};
