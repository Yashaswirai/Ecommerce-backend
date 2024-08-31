const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser } = require('../controllers/auth-controller');
const isLoggedIn = require('../middlewares/isLoggedIn');
const userModel = require('../models/user-model');
const upload = require('../config/multer-config');
router.get('/', function (req, res) {
    res.send("running properly");
});

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/logout', logoutUser);

router.get('/profile', isLoggedIn, async function (req, res) {
    let user = await userModel.findOne({ email: req.user.email });
    let success = req.flash("success");
    let error = req.flash("error");
    res.render('profile', { user, success, error });
});

router.post("/update-profile", upload.single("picture"), isLoggedIn, async function (req, res) {
    try {
        let { fullname, email, contact } = req.body;
        await userModel.findOneAndUpdate({ email: req.user.email }, { fullname, email, contact});
        let user = await userModel.findOne({ email: req.user.email });
        user.picture = req.file.buffer;
        await user.save();
        req.flash("success", "profile updated successfully");
        res.redirect("/user/profile");
    } catch (error) {
        req.flash(error.message);
        res.redirect("/user/profile");
    }

});

module.exports = router;