const express = require('express');
const router = express.Router();
const upload = require('../config/multer-config')
const productModel = require('../models/product-model');
const ownerModel = require('../models/owner-model');
const ownerLoggedIn = require('../middlewares/ownerLoggedIn');

// Create Product post Route
router.post('/create', upload.single("image"),ownerLoggedIn, async function (req, res) {
    try {
        let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;
        let product = await productModel.create({
            image: req.file.buffer,
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor,
        })
        let owner = await ownerModel.findOne({email:req.owner.email});
        owner.products.push(product._id);
        await owner.save();
                
        req.flash('success', "Product created successfully");
        res.redirect("/owner/admin");
    } catch (error) {
        req.flash("error",error.message);
        res.redirect("/owner/admin");
    }

});

// Delete a product
router.get('/delete/:productId',ownerLoggedIn, async function (req, res) {
    let owner = await ownerModel.findOne({email:req.owner.email});
    owner.products.splice(owner.products.indexOf(req.params.productId),1);
    await owner.save();
    await productModel.findOneAndDelete({_id:req.params.productId});
    req.flash('success', "Product deleted successfully");
    res.redirect("/owner/adminpanel");
});

module.exports = router;