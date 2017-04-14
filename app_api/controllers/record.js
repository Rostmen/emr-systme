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


// Create
module.exports.create = function(req, res) {

  if (!req.user) {
    res.status(401).json({ "message" : "UnauthorizedError: private data" });
  } else {

    var record = new Record(req.body);
    record.creator = req.user;

    record.save(function(err){
      if (err)
        res.status(500).send(err);

      res.status(201).json(record);
    });
  }

};

module.exports.list = function(req, res) {



  if (!req.user) {
    res.status(401).json({ "message" : "UnauthorizedError: private data" });
  } else {
    Record
      .find({creator: req.user})
      .exec(function(err, records) {
        if (err)
          res.status(500).send(err);

        res.status(200).json(records);
      });
  }

};

module.exports.read = function(req, res) {

  if (!req.user) {
    res.status(401).json({ "message" : "UnauthorizedError: private data" });
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
    res.status(401).json({ "message" : "UnauthorizedError: private data" });
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
    res.status(401).json({ "message" : "UnauthorizedError: private data" });
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