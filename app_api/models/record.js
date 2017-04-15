var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

var recordSchema = new Schema({ 
  source_info: {
    uuid: String,
    device: {
        name: String,
        identifier: String 
    }
  },

  created_at  : { 
    type: Date,
    default: Date.now
   },
  updated_at  : { 
    type: Date
   },

  creator : { 
    type: Schema.ObjectId, 
    ref: 'User'
  },

  payload: {
    required: 'Payload is required',
    type: Schema.Types.Mixed
  }
}); 

// on every save, add the date
recordSchema.pre('save', function(next) {
  // change the updated_at field to current date
  this.updated_at = Date.now;
  next();
});

mongoose.model('Record', recordSchema);