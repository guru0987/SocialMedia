const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email'
},
    function (email, password, done) {
        //find the user and estabish the indentity
        User.findOne({ email: email }, function (err, user) {
            if (err) {
                console.log('error in finding user ----> passport');
                return done(err);
            }
            if (!user || user.password != password) {
                console.log('Invalid username password');
                return done(null, false);
            }
            return done(null, user);
        });
    }
));


// serializing to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
    done(null, user.id);
});


//deerializing the user from the key in the cookies
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        if (err) {
            console.log('error in finding user ----> passport');
            return done(err);
        }
        return done(null, user);
    });
});

//check the user is authenticated
passport.checkAuthentication = function (req, res, next) {
    //is user is signed in pass on the request to next function i.e. controller's action
    if (req.isAuthenticated()) {
        return next();
    }

    // if the user is not signed in
    return res.redirect('/users/sign-in');
}


passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        //req.user contains the current signed in user from the session cookie and we are jst sending this
        //to the locals for the views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;