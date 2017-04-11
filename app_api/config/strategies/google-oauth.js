var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('mongoose').model('User');
var config = require('../config');

module.exports = function() {
    password.use(new GoogleStrategy({
        clientID: config.googleWebApplication.clientID,
        clientSecret: config.googleWebApplication.clientSecret,
        callbackURL: config.googleWebApplication.callbackURL,
        passReqToCallback: true
    }, 
    function (req, accessToken, refreshToken, profile, done) {
        var providerData = profile._json;
        providerData.accessToken = accessToken;
        providerData.refreshToken = refreshToken;

        var providerUserProfile = {
            firstname: profile.name.givenName,
            lastname: profile.name.familyName,
            fullname: profile.displayName,
            email: profile.emails[0].value,
            username: profile.username,
            provider: 'google',
            providerId: profile.id,
            providerData: providerData
        };

        User.saveOAuthUserProvider(req, providerUserProfile, done);
    }));
};