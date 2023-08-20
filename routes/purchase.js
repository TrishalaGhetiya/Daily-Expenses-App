const express = require('express');
const router = express.Router();

const userAuthentication = require('../middlewares/authenticate');

const purchaseController = require('../controllers/purchase');

router.get('/getPremiumMembership', userAuthentication.authenticate, purchaseController.purchasePremium);

router.post('/updatetransactionStatus', userAuthentication.authenticate, purchaseController.updateTransactionStatus);

module.exports = router;