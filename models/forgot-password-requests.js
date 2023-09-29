const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const fprSchema = new Schema({
  fprId : {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

module.exports = mongoose.model('FPR', fprSchema);
