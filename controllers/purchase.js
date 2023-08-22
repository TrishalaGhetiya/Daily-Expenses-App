const Razorpay = require('razorpay');
const Order = require('../models/order');
require('dotenv').config();

exports.purchasePremium = async (req, res, next) => {
    try{
        var rzp = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        })
        const amount = 2500;
        const rzpOrder = await rzp.orders.create({amount, "currency": "INR"})
        const userOrder = await req.user.createOrder({orderid: rzpOrder.id, status: 'Pending'})
        console.log('done good');
        return res.status(201).json({rzpOrder, key_id : rzp.key_id});
    }
    catch(err){
        console.log(err);
        res.status(403).json({message: 'Something went wrong'});
    }
}

exports.updateTransactionStatus = async(req, res) => {
    try{
        const {payment_id, order_id} = req.body;
        const order = await Order.findOne({ where: {orderid: order_id}});
        const result = await order.update({paymentid: payment_id, status: 'successful'});
        const result1 = await req.user.update({isPremium: true});
        return res.status(202).json({success: true, message: 'transaction successful'})
    }
    catch(err){
        console.log(err);
    }
}