var mongoose = require('mongoose');
var User = mongoose.model('User');

  /**
   * @api {get} /api/profile Profile
   * @apiVersion 0.0.1
   * @apiName Profile
   * @apiGroup User
   * @apiDescription Get user profile. 
   * @apiPermission user
   * 
   * @apiUse AuthenticationHeader
   * 
   * @apiSuccess {String} _id Uniq user identifier.
   * @apiSuccess {String} firstname User firstname.
   * @apiSuccess {String} lastname  User lastname.
   * @apiSuccess {String} fullname  User firstname + ' ' + lastname.
   * @apiSuccess {String} email User email.
   * @apiSuccess {String} id The same as _id.
   * 
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *        "_id": "58f18902784a0b21bf06ca97"
   *        "lastname": "Smith",
   *        "firstname": "John",
   *        "fullname: "John Smith",
   *        "email": "jsmith@example.com",
   *        "username": "jsmith",
   *        "id": "58f18902784a0b21bf06ca97"
   *     }
   *
   * @apiUse UnauthorizedError
   */
module.exports.profileRead = function(req, res) {

  if (!req.user) {
    res.status(401).json({ "error" : "Unauthorized" });
  } else {
    User
      .findById(req.user._id)
      .select('lastname firstname email username')
      .exec(function(err, user) {
        if (err) {
          res.status(500).json({ "error" : "Unknown server error" });
          return
        }
        res.status(200).json(user);
      });
  }

};
