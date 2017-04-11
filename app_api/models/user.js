var mongoose = require( 'mongoose' );
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var Schema = mongoose.Schema;

module.exports.saveOAuthUserProvider = function(req, profile, done) {
  User.findOne({
    provider: profile.provider,
    providerId: profile.profileId
  }, function(err, user) {
    if (err) {
      return done(err);
    } else {
      return done(err, user);
    }
  });
};

var UserSchema = new Schema({
  firstname: String,
  lastname: String,
  email: {
    type: String,
    unique: true,
    match: [/.+\@.+\..+/, "Email is incorrect"],
    required: 'Email is required',
  },
  username: {
    type: String,
    unique: true,
    required: 'Username is required',
    trim: true
  },
  password: {
    type: String,
    validate: [
      function(password) {
        return password && password.length > 6;
      }, 'Password should be longer'
    ]
  },
  created_at    : { 
    type: Date,
    default: Date.now
   },
  provider: {
    type: String,
    required: 'Provider is required'
  },
  providerId: String,
  providerData: {},
  hash: String,
  salt: String
});

UserSchema.virtual('fullname').get(function() {
  return this.firstname + ' ' + this.lastname;
}).set(function(fullname) {
  var splitName = fullname.split(' ');
  this.firstname = splitName[0] || '';
  this.lastname = splitName[1] || '';
});

UserSchema.pre('save', function(next) {
  if (this.password) {
    this.setPassword(this.password);
  }

  next();
});

UserSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

UserSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000),
  }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

UserSchema.set('toJSON', {
  getters: true,
  virtual: true
})

mongoose.model('User', UserSchema);
