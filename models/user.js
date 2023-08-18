const Sequelize = require('sequelize');
const sequelize = require('../util/database');

//Create Table named todoList in database
const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      firstName:{
        type: Sequelize.STRING 
      },
      lastName:{
        type: Sequelize.STRING 
      },
      email:{
        type: Sequelize.STRING,
        allowNull:false,
        unique: true
      },
      password: {
        type: Sequelize.TEXT
      }
});

module.exports = User;