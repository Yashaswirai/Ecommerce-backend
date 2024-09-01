const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn');
const productModel = require('../models/product-model');
const userModel = require('../models/user-model');
const { payment,verifyPayment } = require('../controllers/payment-controller');
// index page route
router.get('/', function (req, res) {
    let error = req.flash('error');
    res.render("index", { error });
});

// Route for shop
router.get('/shop', isLoggedIn, async function (req, res) {
    let product = await productModel.find();
    let success = req.flash('success');
    let error = req.flash('error');
    res.render("shop", { product, success ,error });
});

// Items Adding to cart
router.get('/cart/:productid', isLoggedIn, async function (req, res) {
    try {
        let user = await userModel.findOne({ email: req.user.email })
        user.cart.push(req.params.productid);
        await user.save();
        req.flash('success', "Added to cart");
        res.redirect("/shop");
    } catch (error) {
        req.flash('error', error.message);
        res.redirect("/shop");
    }

});

// calculating cart value and show cart
router.get("/cart",isLoggedIn,async (req,res)=>{
    let user = await userModel.findOne({ email: req.user.email}).populate("cart");
    let totalMRP = Number(0);
    let totalDiscount = Number(0);
    for (let i = 0; i < user.cart.length; i++) {
        totalMRP = totalMRP + (Number(user.cart[i].price));
        totalDiscount = totalDiscount + (Number(user.cart[i].discount));
    }
    let bill = (totalMRP+20) - totalDiscount;
    let success = req.flash("success");
    res.render("cart",{user,bill,totalMRP,totalDiscount,success});
});

// item removing from cart
router.get("/remove/:productid",isLoggedIn,async (req,res) => {
    let user = await userModel.findOne({ email: req.user.email});
    user.cart.splice(user.cart.indexOf(req.params.productid), 1);
    await user.save();
    req.flash("success","Item removed Successfully");
    res.redirect("/cart")
    
});

router.post("/createOrder/:userid",isLoggedIn, payment);
router.post("/verifyPayment",isLoggedIn, verifyPayment);
module.exports = router;