const Expense = require('../models/expense');
const User = require('../models/user');

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
exports.postAddExpenses = (req, res, next) => {
    console.log(req.user.total_Expense);
    const amount = req.body.amount;
    const description = req.body.description;
    const category = req.body.category;
    const userId = req.user.id;
    const updatedAmount = req.user.total_Expense + +amount;
    try{
        Expense.create({
            amount: amount,
            description: description,
            category: category,
            userId: userId
        }).then(() => {
            req.user.update({
                total_Expense: updatedAmount
            }).then((result) => {
                console.log('expense added');
                res.json(result);
            }).catch(err => {
                throw new Error(err);
            })
        }).catch(err => {
            throw new Error(err);
        })
    }
    catch(err){
        console.log(err);
    }
}

//delete expense
exports.deleteExpense = async (req, res, next) => {
    try{
        const expenseId = req.params.id;
        const expense = await Expense.findByPk(expenseId);
        expense.destroy();
        console.log('expense deleted');
        res.json(expense);
    }
    catch(err){
        console.log(err);
    }
}