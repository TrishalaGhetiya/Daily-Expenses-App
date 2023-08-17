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
      userName:{
        type: Sequelize.STRING 
      },
      email:{
        type: Sequelize.TEXT
      },
      password: {
        type: Sequelize.TEXT
      }
});

module.exports = User;