const Expense = require('../models/expense');

//Get expenses when page is loaded
exports.getAddExpenses = async (req, res, next) => {
    try{
        const expenses = await Expense.findAll();
        console.log('expenses send');
        res.json(expenses);
    }
    catch(err){
        console.log(err);
    }
}

//Add expenses to the database
exports.postAddExpenses = (req, res, next) => {
    const amount = req.body.amount;
    const description = req.body.description;
    const category = req.body.category;

    try{
        const result= Expense.create({
            amount: amount,
            description: description,
            category: category
        })
        console.log('expense added');
        res.json(result);
    }
    catch(err){
        console.log(err);
    }
}

//Update items from remaining to done
exports.editExpense = async (req, res, next) => {
    try{
        const expenseId = req.params.id;
        const expense = await Expense.findByPk(expenseId);
        expense.amount = req.body.amount;
        expense.description = req.body.description;
        expense.category = req.body.category;
        expense.save();
        console.log('expense edited');
        res.json(expense);
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