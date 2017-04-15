var mongoose = require('mongoose');
var Record = mongoose.model('Record');

// Error handling
var getErrorMessage = function(err) {
  if (err.errors) {
    for (var name in err.errors) {
      if (err.errors[name].message) return err.errors[name].message;
    }
  } else {
    return 'Unknown server error';
  }
};

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};


  /**
   * @api {post} /api/profile Create
   * @apiVersion 0.0.1
   * @apiName Create
   * @apiGroup Record
   * @apiDescription Create a new Record. 
   * @apiPermission user
   * 
   * @apiParam {Object} payload Any data.
   * @apiParam {Object} [source_info] Source info. For example, if you need to sync some data, you could use 'uuid' from client side.
   * 
   * @apiParamExample {json} payload:
   * {
   *    "pulse": 60,
   *    "systolic": 120,
   *    "diastolic": 80,
   *    "map": 100,
   *    "spo2": 70
   * }
   * 
   * @apiUse AuthenticationHeader
   * 
   * @apiParamExample {json} source_info:
   * {
   *    "device": {
   *      "identifier": "com.apple.health.246000F5-A376-47F4-A117-195937A0F3C3",
   *      "name": "Apple Watch"
   *    },
   *    "uuid": "5DF7941C-01E6-4591-878B-56E98AE65284"
   * }
   * 
   * @apiHeaderExample {json} Request-Example:
   *     {
   *      "payload": {
   *        "pulse": 60,
   *        "systolic": 120,
   *        "diastolic": 80,
   *        "map": 100,
   *        "spo2": 70
   *      },
   *      "source_info": {
   *        "device": {
   *          "name":"Apple Watch",
   *          "identifier":"com.apple.health.246000F5-A376-47F4-A117-195937A0F3C3"
   *        },
   *        "uuid": "5DF7941C-01E6-4591-878B-56E98AE65284"
   *      }
   *    }
   * 
   * @apiSuccess {String} _id Uniq record identifier.
   * @apiSuccess {String} creator Creator User identifier.
   * @apiSuccess {Object} payload Object with any data.
   * @apiSuccess {Object} source_info  Object with source data.
   * 
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 201 Created
   *     {
   *         "__v": 0,
   *         "creator": "58f19190fb730d2b619171be",
   *         "payload": {
   *             "pulse": "12",
   *             "map": "12",
   *             "diastolic": "12",
   *             "systolic": "12"
   *         },
   *         "_id": "58f193f543f2d82d6df2e941",
   *         "created_at": "2017-04-15T03:31:01.062Z",
   *         "source_info": {
   *             "device": {
   *                 "name": "unknown",
   *                 "identifier": "safari/10.1"
   *             }
   *         }
   *     }
   * @apiUse UnauthorizedError
   */
module.exports.create = function(req, res) {

  if (!req.user) {
    sendJSONresponse(res, 401, { "error": "Unauthorized" });
  } else {

    var record = new Record(req.body);
    record.creator = req.user;

    record.save(function(err){
      if (err) {
        sendJSONresponse(res, 500, { "error": getErrorMessage(err) });
      } else {
        sendJSONresponse(res, 201, record);
      }
    });
  }

};

module.exports.list = function(req, res) {

  if (!req.user) {
    sendJSONresponse(res, 401, { "error": "Unauthorized" });
  } else {
    Record
      .find({creator: req.user})
      .exec(function(err, records) {
        if (err) {
          sendJSONresponse(res, 500, { "error": getErrorMessage(err) });
        } else {
          sendJSONresponse(res, 200, records);
        }
      });
  }

};

module.exports.read = function(req, res) {

  if (!req.user) {
    sendJSONresponse(res, 401, { "error": "Unauthorized" });
  } else {
    var record_id = req.params.id;
    if (!record_id) {
      res.status(400).json({ "message": "Record id is missing" });
    } else {
      Record
      .findOne({
        _id: mongoose.Types.ObjectId(record_id),
        creator: mongoose.Types.ObjectId(req.user._id)        
      })
      .exec(function(err, record) {
        if (err)
          res.status(500).send(err);

        res.status(200).json(record);
      });  
    }
  }

};

module.exports.delete = function(req, res) {

  if (!req.user) {
    sendJSONresponse(res, 401, { "error": "Unauthorized" });
  } else {
    var record_id = req.params.id;
    if (!record_id) {
      res.status(400).json({ "message": "Record id is missing" });
    } else {
      Record
        .remove({
          _id: mongoose.Types.ObjectId(record_id),
          creator: mongoose.Types.ObjectId(req.user._id)
        })
        .exec(function(err) {
          if (err)
            res.status(500).send(err);

          res.status(200).json({ "message": "Record has been removed" });
        });
    }
  }

};

module.exports.update = function(req, res) {

  if (!req.user) {
    sendJSONresponse(res, 401, { "error": "Unauthorized" });
  } else {
    var record_id = req.params.id
    if (!record_id) {
      res.status(400).json({ "message": "Record id is missing" })
    } else {
      Record
        .findOne({
          _id: mongoose.Types.ObjectId(record_id),
          creator: mongoose.Types.ObjectId(req.user._id)        
        })
        .exec(function(err, record) {
          if (err)
            res.status(500).send(err);

          record.pulse = req.body.pulse;
          record.systolic = req.body.systolic;
          record.diastolic = req.body.diastolic;
          record.map = req.body.map;

          record.save(function(err) {
              if (err)
                res.status(500).send(err);

              res.status(200).json(record);
          });
        });  
    }
  }

};