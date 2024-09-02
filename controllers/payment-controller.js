const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const userModel = require('../models/user-model')
const ownerModel = require('../models/owner-model');
const { request } = require('http');


// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

module.exports.payment =  async (req, res) => {
    const { amount } = req.body;

    // Create an order in Razorpay
    const options = {
        amount: amount * 100, // Convert to paise
        currency: "INR",
        receipt: `receipt_order_${Math.floor(Math.random() * 1000000)}`,
    };

    try {
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).send("Some error occurred while creating Razorpay order");
    }
};

// Verify payment signature after payment
module.exports.verifyPayment = async (req, res) => {
    const { order_id, payment_id, signature } = req.body;

    const body = order_id + "|" + payment_id;

    const expectedSignature = crypto.createHmac('sha256', 'sN86p86V5Q2v8DnZDWwD2xdd')
                            .update(body.toString())
                            .digest('hex');

    const isAuthentic = expectedSignature === signature;

    if (isAuthentic) {
        // Payment is successful, update order status in your database
        let user = await userModel.findOne({email: req.user.email});
        for (let i = 0; i < user.cart.length; i++) {
            user.orders.push(user.cart[i]);
        }
        user.cart=[];
        await user.save();
        user = await user.populate("orders");
        for(let i = 0; i < user.orders.length; i++){
            var owner = await ownerModel.findOne({_id:user.orders[i].owner});
            if(owner.orders.indexOf(user._id) === -1){
                owner.orders.push(user._id);
                await owner.save();
            }            
        }
        req.flash("success","Order Placed Successfully");
        res.redirect("/shop");
    } else {
        // Payment failed
        req.flash("error","Payment failed");
        res.redirect("/shop");
    }
};

