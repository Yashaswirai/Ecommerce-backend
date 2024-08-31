const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owner-model');
const bcrypt = require('bcrypt');
const { generateAdminToken } = require('../utils/generateAdminToken');
const ownerLoggedIn = require('../middlewares/ownerLoggedIn');

// Owner Login Route
router.get('/', function (req, res) {
    res.render("owner-login",{navlinks: false});
});

// Login post route
router.post("/login", async function (req, res) {
    let{email, password} = req.body;

    let owner = await ownerModel.findOne({ email });
    if (!owner){
        req.flash("error","owner not found");
        return res.redirect("/");
    } 
    bcrypt.compare(password, owner.password, function (err, result) {
        if (result) {
            let token = generateAdminToken(owner);
            res.cookie("token", token);
            req.flash("success","Successfully logged in");
            res.redirect("/owner/adminpanel");
        }
        else{
            req.flash("error","email or password not found");
            res.redirect("/");
        }        
    });

});

// Owner create post route
router.post('/create', async function (req, res) {
    let owner = await ownerModel.find();
    if(owner.length > 0) {
        req.flash('error',"you already have a owner")
        return res.redirect("/");
    }
    let {fullname, email, password} = req.body;

    try {
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) return req.flash("error",err.message);
                let owner = await ownerModel.create({
                    fullname,
                    email,
                    password: hash,
                });
                let token = generateAdminToken(owner);
                res.cookie("token", token);
                req.flash('success',"Owner created successfully");
                res.redirect("/owner/admin")
            });
        });

    } catch (error) {
        console.log(error.message);
    }
});

// Admin panel route

router.get("/adminpanel",ownerLoggedIn, async function (req, res) {
    try {
        let owner = await ownerModel.findOne({ email: req.owner.email }).populate("products");
        let success = req.flash("success");
        let error = req.flash("error");
        res.render("admin", { owner, navlinks: false ,success,error});
    } catch (error) {
        console.error("Error populating products:", error);
        req.flash("error","Server Error");
        res.render("/");
    }
});

// create Product get Route
router.get('/admin',ownerLoggedIn,async function (req, res) {
    let success = req.flash("success")
    let error = req.flash("error")
    res.render('createproducts',{success,error,navlinks:false});
});

// Admin Logout Route
router.get("/logout",ownerLoggedIn,async function(req,res) {
    res.cookie("token", "");
    res.cookie("connect.sid","");
    res.redirect("/owner");
});
module.exports = router;