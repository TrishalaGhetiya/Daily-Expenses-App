const express = require('express');
const router = express.Router();
const userAuthentication = require('../middlewares/authenticate');

const passwordController = require('../controllers/password');

//sending forgot password mail
router.post('/forgotPassword', passwordController.forgotPassword);

//sending reset password form
router.get('/resetPassword/:forgotPasswordId', passwordController.resetPassword);

//updating password
router.get('/updatePassword/:resetPasswordId', passwordController.updatePassword);

module.exports = router;