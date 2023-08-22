const Sequelize = require('sequelize');
const sequelize = require('../util/database');

//Create Table named expenses in database
const Expense = sequelize.define('expenses', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      amount:{
        type: Sequelize.FLOAT 
      },
      description:{
        type: Sequelize.STRING 
      },
      category:{
        type: Sequelize.STRING,
      }
});

module.exports = Expense;