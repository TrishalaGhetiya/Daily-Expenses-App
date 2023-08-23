const express = require('express');
const router = express.Router();
const userAuthentication = require('../middlewares/authenticate');

const passwordController = require('../controllers/password');

//sending forgot password mail
router.post('/forgotPassword', passwordController.forgotPassword);

module.exports = router;