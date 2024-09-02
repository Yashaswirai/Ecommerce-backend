const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');


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
module.exports.verifyPayment = (req, res) => {
    const { order_id, payment_id, signature } = req.body;

    const body = order_id + "|" + payment_id;

    const expectedSignature = crypto.createHmac('sha256', 'sN86p86V5Q2v8DnZDWwD2xdd')
                            .update(body.toString())
                            .digest('hex');

    const isAuthentic = expectedSignature === signature;

    if (isAuthentic) {
        // Payment is successful, update order status in your database
        res.json({ status: "success" });
    } else {
        // Payment failed
        res.json({ status: "failure" });
    }
};

