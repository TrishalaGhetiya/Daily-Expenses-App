const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const fprSchema = new Schema({
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
// const Sequelize = require('sequelize');
// const sequelize = require('../utils/database');
// const { v4: uuidv4 } = require('uuid');
// uuidv4();

// //Create Table named forgotPasswordRequests in database
// const FPR = sequelize.define('forgotPasswordRequests', {
//     id: {
//         type: Sequelize.STRING,
//         allowNull: false,
//         primaryKey: true
//       },
//       isActive: Sequelize.BOOLEAN
// });

// module.exports = FPR;