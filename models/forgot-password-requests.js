const Sequelize = require('sequelize');
const sequelize = require('../utils/database');
const { v4: uuidv4 } = require('uuid');
uuidv4();

//Create Table named forgotPasswordRequests in database
const FPR = sequelize.define('forgotPasswordRequests', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      isActive: Sequelize.BOOLEAN
});

module.exports = FPR;