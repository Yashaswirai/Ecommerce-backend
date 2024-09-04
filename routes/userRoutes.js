const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser } = require('../controllers/auth-controller');
const isLoggedIn = require('../middlewares/isLoggedIn');
const userModel = require('../models/user-model');
const upload = require('../config/multer-config');
const bcrypt = require('bcrypt');
router.get('/', function (req, res) {
    res.send("running properly");
});

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/logout', logoutUser);

router.get('/profile', isLoggedIn, async function (req, res) {
    let user = await userModel.findOne({ email: req.user.email }).populate('orders');
    let success = req.flash("success");
    let error = req.flash("error");
    res.render('profile', { user, success, error });
});

router.post("/update-profile", upload.single("picture"), isLoggedIn, async function (req, res) {
    try {
        const { fullname, contact, oldpassword, password } = req.body;

        // Find the user by their email
        const user = await userModel.findOne({ email: req.user.email });

        // Create an object to hold the updated fields
        const updateFields = { fullname, contact };

        if (req.file) {
            updateFields.picture = req.file.buffer;
        }
        
        // If the user provided a new password, verify the old password first
        if (password && password.trim()) {
            const isMatch = await bcrypt.compare(oldpassword, user.password);
            if (!isMatch) {
                // If old password doesn't match, send a flash message and do not update the password
                req.flash('error', 'Old password is incorrect');
                return res.redirect('/user/profile');
            }

            // If the old password matches, hash the new password
            const saltRounds = 10; // or your preferred number of salt rounds
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            updateFields.password = hashedPassword;
        }

        // Update the user's profile with the new fields
        await userModel.findOneAndUpdate(
            { email: req.user.email },  // Assumes user is authenticated and their email is accessible
            updateFields,// Return the updated document, validate before saving
        );

        // Flash a success message and redirect to the profile page
        req.flash('success', 'Profile updated successfully');
        res.redirect('/user/profile');
    } catch (error) {
        console.error("Error updating profile:", error);

        // Handle specific errors if needed
        if (error.name === 'ValidationError') {
            req.flash('error', 'Invalid input data');
            return res.redirect('/user/profile');
        }

        // Generic server error
        req.flash('error', 'Server Error');
        res.redirect('/user/profile');
    }

});

module.exports = router;