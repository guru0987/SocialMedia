const User = require('../models/user');

module.exports.profile = function (req, res) {
    return res.render('user_profile', {
        title: 'User Profile'
    });
}

//Render the sign up page
module.exports.singnUp = function (req, res) {
    if (req.isAuthenticated()) {
        res.redirect('/users/profile');
    }

    return res.render('user_sign_up', {
        title: 'Codeial | Sign Up'
    });
}

//Render the sign in page
module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()) {
        res.redirect('/users/profile');
    }

    return res.render('user_sign_in', {
        title: 'Codeial | Sign In'
    });
}

//get the signup data
module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) { console.log('Error in finding up user in Signing Up'); return; }

        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) { console.log('Error in creating up user in Signing Up'); return; }
                return res.redirect('/users/sign-in');
            })
        } else {
            return res.redirect('back');
        }
    });
}

// sign in and create a session for the user
module.exports.createSession = function (req, res) {
    res.redirect('/');
}

module.exports.destroySession = function (req, res) {
    req.logout();

    return res.redirect('/');
}

