const express = require('express');
const router = express.Router();
const userAuthentication = require('../middlewares/authenticate');

const premiumController = require('../controllers/premium');

//Loading LeaderBoard
router.get('/showLeaderBoard', userAuthentication.authenticate ,premiumController.getLeaderBoard);

module.exports = router;