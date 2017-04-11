var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

var recordSchema = new Schema({ 
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
  pulse : { 
    type: Number 
  },
  systolic  : { 
    type: Number 
  },
  diastolic : { 
    type: Number
   },
  map : { 
    type: Number
   }
});

// on every save, add the date
recordSchema.pre('save', function(next) {
  // change the updated_at field to current date
  this.updated_at = Date.now;
  next();
});

mongoose.model('Record', recordSchema);