const Sequelize = require('sequelize');
const sequelize = require('../util/database');

//Create Table named todoList in database
const Expense = sequelize.define('expenses', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      amount:{
        type: Sequelize.INTEGER 
      },
      description:{
        type: Sequelize.STRING 
      },
      category:{
        type: Sequelize.STRING,
      }
});

module.exports = Expense;