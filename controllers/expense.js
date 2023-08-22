const Expense = require('../models/expense');
const User = require('../models/user');
const sequelize = require('../util/database');

//Get expenses when page is loaded
exports.getAddExpenses = async (req, res, next) => {
    try{
        const expenses = await Expense.findAll({ where: {userId: req.user.id } });
        console.log('expenses send');
        res.json(expenses);
    }
    catch(err){
        console.log(err);
    }
}

//Add expenses to the database
exports.postAddExpenses = async (req, res, next) => {
    const t = await sequelize.transaction();
    try{
        const amount = req.body.amount;
        const description = req.body.description;
        const category = req.body.category;
        const userId = req.user.id;
        const updatedAmount = req.user.total_Expense + +amount;

        const expense = await Expense.create({
            amount: amount,
            description: description,
            category: category,
            userId: userId
        }, { transaction: t })

        const result = await req.user.update({
            total_Expense: updatedAmount
        }, { transaction: t })
        
        await t.commit();
        console.log('expense added');
        res.json(result);
    }
    catch(err){
        await t.rollback();
        console.log(err);
    }
}

//delete expense
exports.deleteExpense = async (req, res, next) => {
    try{
        //const deleteAmount = req.body('amount');
        //console.log(deleteAmount);
        const t = sequelize.transaction();
        const expenseId = req.params.id;
        //const updatedAmount = req.user.total_Expense + +amount;

        const expense = await Expense.findByPk(expenseId);
        expense.destroy({ transaction: t });

        console.log('expense deleted');
        res.json(expense);
    }
    catch(err){
        console.log(err);
    }
}