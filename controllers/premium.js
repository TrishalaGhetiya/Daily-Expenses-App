const User = require('../models/user');
const Expense = require('../models/expense');
const sequelize = require('../util/database');

exports.getLeaderBoard = async (req, res, next) => {
    try{
        const users = await User.findAll();
        const expenses = await Expense.findAll();

        const userExpenses = {};

        expenses.forEach((expense) => {
            if(userExpenses[expense.userId]){
                userExpenses[expense.userId] += expense.amount;
            }
            else{
                userExpenses[expense.userId] = expense.amount;
            }
        })

        var leaderBoardDetails = [];
        users.forEach((user) => {
            leaderBoardDetails.push({name: user.firstName, total_amount: userExpenses[user.id] || 0})
        })
        leaderBoardDetails.sort((a, b) => b.total_amount - a.total_amount)
        res.status(200).json(leaderBoardDetails);
    }
    catch(err){
        console.log(err);
    }
}