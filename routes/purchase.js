const express = require('express');
const router = express.Router();

const userAuthentication = require('../middlewares/authenticate');

const purchaseController = require('../controllers/purchase');

//Purchase MemberShip
router.get('/getPremiumMembership', userAuthentication.authenticate, purchaseController.purchasePremium);

//update transaction status
router.post('/updatetransactionStatus', userAuthentication.authenticate, purchaseController.updateTransactionStatus);

module.exports = router;