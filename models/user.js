const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  total_Expense: {
    type: Number,
    required: true
  },
  isPremium: {
    type: Boolean,
    required: true
  }
})

module.exports = mongoose.model('User', userSchema);