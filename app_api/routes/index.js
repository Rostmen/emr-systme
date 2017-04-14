var express = require('express');
var passport = require('passport');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'user'
});

var ctrlProfile = require('../controllers/profile');
var ctrlRecord = require('../controllers/record');
var ctrlAuth = require('../controllers/authentication');

// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// records
router.post('/profile/record', auth, ctrlRecord.create);
router.delete('/profile/record/:id', auth, ctrlRecord.delete);
router.put('/profile/record/:id', auth, ctrlRecord.update);
router.get('/profile/records', auth, ctrlRecord.list);
router.get('/profile/record/:id', auth, ctrlRecord.read);


// local authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;
