const Sequelize = require('sequelize');

const sequelize = new Sequelize('daily-expense', 'root', 'root', {
    dialect: 'mysql', 
    host: 'localhost'
});

module.exports = sequelize;