const express = require('express');
const router = express.Router();
const userAuthentication = require('../middlewares/authenticate');

const expenseController = require('../controllers/expense');

//Loading Page
router.get('/', userAuthentication.authenticate ,expenseController.getAddExpenses);

//Add Expenses
router.post('/add-expenses', userAuthentication.authenticate, expenseController.postAddExpenses);

//Delete Expense
router.delete('/delete-expense/:id', expenseController.deleteExpense);

//Edit Expense
router.put('/edit-expense/:id', expenseController.editExpense);

module.exports = router;