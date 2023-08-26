const express = require('express');
const router = express.Router();
const userAuthentication = require('../middlewares/authenticate');

const expenseController = require('../controllers/expense');

//Loading Page
router.get('/', userAuthentication.authenticate ,expenseController.getAddExpenses);

//Add Expenses
router.post('/add-expenses', userAuthentication.authenticate, expenseController.postAddExpenses);

//Delete Expense
router.delete('/delete-expense/:id', userAuthentication.authenticate, expenseController.deleteExpense);

//download file of expenses
router.get('/download', userAuthentication.authenticate, expenseController.downloadExpenses);

module.exports = router;