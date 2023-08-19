const express = require('express');
const router = express.Router();

const expenseController = require('../controllers/expense');

//Loading Page
router.get('/', expenseController.getAddExpenses);

//Add Expenses
router.post('/add-expenses', expenseController.postAddExpenses);

//Delete Expense
router.delete('/delete-expense/:id', expenseController.deleteExpense);

//Edit Expense
router.put('/edit-expense/:id', expenseController.editExpense);

module.exports = router;