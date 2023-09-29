const Razorpay = require('razorpay');
const Order = require('../models/order');
const User = require('../models/user');
require('dotenv').config();

exports.purchasePremium = async (req, res, next) => {
    try{
        var rzp = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        })
        const amount = 2500;
        const rzpOrder = await rzp.orders.create({amount, "currency": "INR"})
        const userOrder = new Order(
            {
            orderid: rzpOrder.id,
            status: 'Pending',
            userId: req.user._id
            }
        )
        userOrder.save();
        console.log('Premium purchased');
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
        const order = await Order.findOneAndUpdate(
            {orderid: order_id},
            {paymentid: payment_id, status: 'successful'}
        );

        const result1 = await User.findOneAndUpdate(
            {_id: req.user._id},
            {isPremium: true}
        );

        return res.status(202).json({success: true, message: 'transaction successful'})
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: 'Something went wrong', success: false});
    }
}