const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

//Loading Page
router.get('/');

//Add user
router.post('/signup', userController.postSignUpUser);

// //Update item from remaining to done
// router.put('/done-todo/:id', todoController.editTodoItem);

// //Delete item
// router.delete('/delete-item/:id', todoController.deleteTodoItem);

module.exports = router;