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

// const Sequelize = require('sequelize');
// const sequelize = require('../utils/database');

// //Create Table named user in database
// const User = sequelize.define('user', {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//       },
//       firstName:{
//         type: Sequelize.STRING 
//       },
//       lastName:{
//         type: Sequelize.STRING 
//       },
//       email:{
//         type: Sequelize.STRING,
//         allowNull:false,
//         unique: true
//       },
//       password: {
//         type: Sequelize.TEXT
//       },
//       total_Expense: {
//         type: Sequelize.FLOAT
//       },
//       isPremium: {
//         type: Sequelize.BOOLEAN
//       }
// });

// module.exports = User;