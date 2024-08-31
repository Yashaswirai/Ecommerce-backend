const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/generateToken');

module.exports.registerUser = async function (req, res) {
    let { email, password, fullname } = req.body;
    let user = await userModel.findOne({ email });
    if (user) {
        req.flash("error","user already registered");
        return res.redirect('/');
    }

    try {
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) return req.flash("error",err.message);
                let user = await userModel.create({
                    fullname,
                    email,
                    password: hash,
                });
                let token = generateToken(user);
                res.cookie("token", token);
                res.redirect("/shop")
            });
        });

    } catch (error) {
        console.log(error.message);
    }
}

module.exports.loginUser = async function (req, res) {
    let { email, password } = req.body;

    let user = await userModel.findOne({ email });
    if (!user){
        req.flash("error","User not found");
        return res.redirect("/");
    } 
    bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
            let token = generateToken(user);
            res.cookie("token", token);
            res.redirect("/shop");
        }
        else{
            req.flash("error","email or password not found");
            res.redirect("/");
        }        
    });
};

module.exports.logoutUser = async function (req, res) {
    res.cookie("token", "");
    res.redirect("/");
};