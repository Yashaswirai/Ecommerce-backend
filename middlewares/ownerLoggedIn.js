const jwt = require('jsonwebtoken');
const ownerModel = require('../models/owner-model');

module.exports = async (req, res, next) => {
    if(!req.cookies.token) {
        req.flash("error","You are not allowed to access");
        return res.redirect('/');
    }
    try {
        let decoded = jwt.verify(req.cookies.token, process.env.ADMIN_TOKEN);
        let owner = await ownerModel.findOne({email: decoded.email}).select("-password");
        req.owner = owner;        
        next();
    } catch (error) {
        req.flash("error","Something went wrong");
        res.redirect('/');
    }
};